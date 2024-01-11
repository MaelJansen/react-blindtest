import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import TrackPlayer from "./TrackPlayer";
import { TrackContext } from "./SpotifyContext";
import { PlayerContext } from "./context/PlayerContext";
import ResponseEntry from "./ResponseEntry";
import {
  Progress,
  Image,
  Grid,
  GridColumn,
  Divider,
  Button,
  Icon,
  Segment,
  PlaceholderLine,
  PlaceholderImage,
  PlaceholderHeader,
  Placeholder,
} from "semantic-ui-react";
import { SocketContext } from "./context/SocketContext";

function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  // Filter out items without a preview_url
  array = array.filter((item) => item.track.preview_url !== null);

  return array;
}

function Quizz(props) {
  const socket = React.useContext(SocketContext);

  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const token = localStorage.getItem("token");
  const { allTracks, updateAllTracks } = useContext(TrackContext);
  const { currentTrack, updateCurrentTrack } = useContext(TrackContext);
  const { playlistCrafted } = useContext(PlayerContext);
  const { room } = useContext(PlayerContext);
  const [percentage, setPercentage] = useState(1);
  const [foundTitle, setFoundTitle] = useState(false);
  const [foundArtist, setFoundArtist] = useState(false);

  useEffect(() => {
    async function getPlaylistTracks() {
      try {
        const limit = 50; // Maximum limit per request
        let offset = 0;
        let total = 0;
        let tracksData = [];

        // Continue making requests until all tracks are retrieved
        do {
          const response = await axios.get(
            `https://api.spotify.com/v1/playlists/${props.playlistId}/tracks`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
                limit,
                offset,
              },
            }
          );

          const { items, total: totalItems } = response.data;
          tracksData = [...tracksData, ...items];
          total = totalItems;
          offset += limit;
        } while (offset < total);

        tracksData = shuffle(tracksData);
        const first20Tracks = tracksData.slice(0, 20);
        setTracks(tracksData);
        playlistCrafted(first20Tracks);
      } catch (error) {
        console.error("Error retrieving playlist tracks:", error);
      }
    }

    getPlaylistTracks();
  }, [props.playlistId]);

  useEffect(() => {
    socket.on("playlist_loaded", (data) => {
      console.log("playlist_loaded", data.playlist);
      updateAllTracks(data.playlist);
    });

    socket.on("play_track", (data) => {
      console.log("play_track", data);
      updateCurrentTrack(data.track);
    });
  }, [socket]);

  const handleNextTrack = () => {
    setFoundArtist(true);
    setFoundTitle(true);
    /*const timeout = setTimeout(() => {
      socket.emit("next_track", { room: room });
    }, 3000);*/
  };

  const demo = () => {
    socket.emit("next_track", { room: room });
  };

  return (
    <div>
      {currentTrack && (
        <div>
          <Grid
            key={currentTrack.track.id}
            columns={2}
            stackable
            centered
            verticalAlign="middle"
          >
            <GridColumn width={6}>
              {foundTitle ? (
                <h1>{currentTrack.track.name}</h1>
              ) : (
                <h1>
                  <Icon name="music" />
                  <Segment inverted size="big"></Segment>
                </h1>
              )}

              <Divider style={{ margin: 0, borderBottom: 0 }} />

              {foundArtist ? (
                <h2>{currentTrack.track.artists[0].name}</h2>
              ) : (
                <h2>
                  <Icon name="user outline" />
                  <Segment inverted size="small"></Segment>
                </h2>
              )}
              <TrackPlayer
                trackId={currentTrack.track.id}
                token={token}
                onEnded={handleNextTrack}
                setPercentage={setPercentage}
              />
              <Button
                icon="forward"
                onClick={/*handleNextTrack*/ demo}
              ></Button>
            </GridColumn>
            <GridColumn width={8}>
              {foundArtist && foundTitle ? (
                <Image
                  src={currentTrack.track.album.images[0].url}
                  size="large"
                />
              ) : (
                <Placeholder inverted>
                  <PlaceholderImage square />
                </Placeholder>
              )}
            </GridColumn>
          </Grid>
          {percentage < 1 ? (
            <Progress
              style={{ margin: "2em", width: "auto" }}
              percent={percentage}
              size="small"
            />
          ) : percentage < 50 ? (
            <Progress
              style={{ margin: "2em", width: "auto" }}
              percent={percentage}
              size="small"
              success
            />
          ) : percentage < 80 ? (
            <Progress
              style={{ margin: "2em", width: "auto" }}
              percent={percentage}
              size="small"
              warning
            />
          ) : (
            <Progress
              style={{ margin: "2em", width: "auto" }}
              percent={percentage}
              size="small"
              error
            />
          )}

          <ResponseEntry
            playlistId={props.selectedPlaylistId}
            setFoundTitle={setFoundTitle}
            setFoundArtist={setFoundArtist}
          ></ResponseEntry>
        </div>
      )}
    </div>
  );
}

export default Quizz;
