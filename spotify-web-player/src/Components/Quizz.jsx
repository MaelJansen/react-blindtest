import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import TrackPlayer from "./TrackPlayer";
import { TrackContext } from "./SpotifyContext";
import { PlayerContext } from "./context/PlayerContext";
import { Progress } from "semantic-ui-react";
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
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setPercent(percent + 0.1);
    }, 29);
  }, [percent]);

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
      setPercent(0);
    });
  }, [socket]);

  const handleNextTrack = () => {
    socket.emit("next_track", { room: room });
  };


  return (
    <div>
      <h1>Quizz</h1>
      { currentTrack && (
        <div key={currentTrack.track.id}>
          <h3>{currentTrack.track.name}</h3>
          <img
            src={currentTrack.track.album.images[0].url}
            alt={currentTrack.track.name}
          />
          <p>{currentTrack.track.artists[0].name}</p>
          <TrackPlayer
            trackId={currentTrack.track.id}
            token={token}
            onEnded={handleNextTrack}
          />
          <button onClick={handleNextTrack}>Next Track</button>
          
        <Progress percent={percent} size="small" indicating />
        </div>
      )}
    </div>
  );
}

export default Quizz;
