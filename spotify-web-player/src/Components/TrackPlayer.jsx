import React, { useEffect, useState } from "react";
import axios from "axios";

function TrackPlayer({ trackId, token, onEnded, setPercentage }) {
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    async function getTrackPreviewUrl() {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/tracks/${trackId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const track = response.data;
        const url = track.preview_url;
        setPreviewUrl(url);
        console.log("Track preview URL:", url);
      } catch (error) {
        console.error("Error retrieving track preview URL:", error);
      }
    }

    getTrackPreviewUrl();
  }, [trackId, token]);

  useEffect(() => {
    const audioElement = document.getElementById("audioElement");

    if (audioElement) {
      audioElement.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [previewUrl]);

  const handleTimeUpdate = () => {
    const audioElement = document.getElementById("audioElement");
    const percentage = (audioElement.currentTime / audioElement.duration) * 100;
    setPercentage(percentage);
  };

  const handleEnded = () => {
    // Callback to notify the parent component (Quizz) that the track has ended
    onEnded();
  };

  return (
    <div>
      <audio
        id="audioElement"
        autoPlay
        controls
        src={previewUrl}
        onEnded={handleEnded}
      />
    </div>
  );
}

export default TrackPlayer;
