import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import TrackPlayer from "./TrackPlayer";
import { TrackContext } from "./SpotifyContext";

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

  return array;
}

function Quizz(props) {
  const { playlistId } = useParams();
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const token = localStorage.getItem("token");
  const { allTracks, updateAllTracks } = useContext(TrackContext);
  const { currentTrack, updateCurrentTrack } = useContext(TrackContext);

  useEffect(() => {
    async function getPlaylistTracks() {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const tracksData = response.data.items;
        shuffle(tracksData);
        setTracks(tracksData);
        console.log("allTracks : ", allTracks);
        updateAllTracks(tracksData);
        console.log("Playlist tracks :", tracksData);
      } catch (error) {
        console.error("Error retrieving playlist tracks:", error);
      }
    }

    getPlaylistTracks();
  }, [playlistId]);

  const handleNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => prevIndex + 1);
  };

  const currentTrackLocal = tracks[currentTrackIndex];

  return (
    <div>
      {updateCurrentTrack(tracks[currentTrackIndex])}
      <h1>Quizz</h1>
      {currentTrackLocal && (
        <div key={currentTrackLocal.track.id}>
          <h3>{currentTrackLocal.track.name}</h3>
          <img
            src={currentTrackLocal.track.album.images[0].url}
            alt={currentTrackLocal.track.name}
          />
          <p>{currentTrackLocal.track.artists[0].name}</p>
          <TrackPlayer
            trackId={currentTrackLocal.track.id}
            token={token}
            onEnded={handleNextTrack}
          />
          <button onClick={handleNextTrack}>Next Track</button>
        </div>
      )}
    </div>
  );
}

export default Quizz;
