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
  Transition,
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
  const [currentTrackIndex, setCurrentTrackIndex] = useState(1);
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
        setTracks(first20Tracks);
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

  const revealAnswer = () => {
    setFoundArtist(true);
    setFoundTitle(true);
  };

  const handleNextTrack = () => {
    revealAnswer();
    const timeout = setTimeout(() => {
      demo();
    }, 3000);
    /*const timeout = setTimeout(() => {
      socket.emit("next_track", { room: room });
    }, 3000);*/
  };

  const demo = () => {
    if (currentTrackIndex+1 > allTracks.length) {
      console.log("All tracks have been played");
      selectWinner();

    } else {
      socket.emit("next_track", { room: room });
      console.log("Next track");
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  };

  const selectWinner = () => {
    // Emit an event to the server to handle winner selection
    socket.emit("select_winner", { room });
  };

  return (
    <div>
      {currentTrack && (
        <div>
          <ResponseEntry
            playlistId={props.selectedPlaylistId}
            setFoundTitle={setFoundTitle}
            setFoundArtist={setFoundArtist}
          ></ResponseEntry>

          {percentage <= 1 || percentage == 100 ? (
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

          <Grid
            inverted
            key={currentTrack.track.id}
            columns={2}
            stackable
            centered
            verticalAlign="middle"
          >
            <GridColumn width={6}>
              <Transition
                visible={foundTitle}
                animation="fade up"
                duration={{ hide: 0, show: 500 }}
              >
                <h1>{currentTrack.track.name}</h1>
              </Transition>
              {!foundTitle && (
                <h1>
                  <Segment inverted size="big">
                    <Icon name="music" size="large" />
                  </Segment>
                </h1>
              )}

              <Divider style={{ margin: 0, borderBottom: 0 }} />

              {/* Semantic UI Transition for Artist */}
              <Transition
                visible={foundArtist}
                animation="fade down"
                duration={{ hide: 0, show: 1000 }}
              >
                <h2>{currentTrack.track.artists[0].name}</h2>
              </Transition>
              {/* Placeholder if artist not found */}
              {!foundArtist && (
                <h2>
                  <Segment inverted size="small">
                    <Icon
                      style={{ marginLeft: "0.20em" }}
                      name="user"
                      size="big"
                    />
                  </Segment>
                </h2>
              )}
               <h5>
              Morceau {currentTrackIndex} sur {allTracks.length}
              </h5>
              <TrackPlayer
                trackId={currentTrack.track.id}
                token={token}
                onEnded={revealAnswer}
                setPercentage={setPercentage}
              />
              <Button icon="forward" onClick={handleNextTrack}></Button>
            </GridColumn>
            <GridColumn width={6}>
              {foundArtist && foundTitle ? (
                <Image
                  src={currentTrack.track.album.images[0].url}
                  size="large"
                />
              ) : (
                <Placeholder inverted>
                  <PlaceholderImage square size="large" />
                </Placeholder>
              )}
            </GridColumn>
          </Grid>
        </div>
      )}
    </div>
  );
}

export default Quizz;
