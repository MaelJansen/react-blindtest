import React, { useState, useEffect, useContext } from "react";
import "semantic-ui-css/semantic.min.css";
import { Dropdown, Feed } from "semantic-ui-react";
import axios, { all } from "axios";
import { TrackContext } from "./SpotifyContext";
import { SocketContext } from "./context/SocketContext";
import { PlayerContext } from "./context/PlayerContext";
import { v4 as uuidv4 } from "uuid";

export default function ResponseEntry() {
  const [titles, setTitles] = useState([]);
  const [artistes, setArtistes] = useState([]);
  const { allTracks } = useContext(TrackContext);
  const { currentTrack } = useContext(TrackContext);
  const { room, username, score, updateScore } = useContext(PlayerContext);
  const [response, setResponse] = useState(false);
  const [responseArtist, setResponseArtist] = useState(false);
  const socket = useContext(SocketContext);

  const submitMessage = (message) => {
    const __createdtime__ = Date.now();
    socket.emit("send_message", { message, username, room, __createdtime__ });
  };

  useEffect(() => {
    for (const track of Object.keys(allTracks)) {
      const currentTrack = allTracks[track];
      console.log(track, currentTrack);
      console.log(track);
      console.log("track : ", currentTrack.track.name);
      if (titles.length < track.length) {
        setTitles((prevTitles) => [
          ...prevTitles,
          {
            key: currentTrack.track.name,
            text: currentTrack.track.name,
            value: currentTrack.track.name,
          },
        ]);
      }
      if (artistes.length < track.length) {
        setArtistes((prevArtistes) => [
          ...prevArtistes,
          {
            key: uuidv4(), //currentTrack.track.artists[0].name,
            text: currentTrack.track.artists[0].name,
            value: currentTrack.track.artists[0].name,
          },
        ]);
      }
    }
    console.log("tracks: ", allTracks);
  }, [allTracks]);

  function isResponse(value) {
    var message = "à gagné 8 points";
    if (value === currentTrack.track.name) {
      setResponse(true);
      submitMessage(message);
      updateScore(score + 8);
    } else {
      setResponse(false);
    }
  }

  function isResponseArtist(value) {
    var message = "à gagné 2 points";
    if (value === currentTrack.track.artists[0].name) {
      setResponseArtist(true);
      submitMessage(message);
      console.log("bonne réponse");
      updateScore(score + 2);
    } else {
      setResponseArtist(false);
    }
  }

  return (
    <div>
      {console.log("title :", titles)}
      {console.log("current track : ", currentTrack)}
      <Dropdown
        placeholder="Choisissez un tire"
        fluid
        selection
        options={titles}
        style={{ marginBottom: "2em" }}
        onChange={(e, { value }) => {
          isResponse(value);
        }}
      />
      {console.log("test")}
      <Dropdown
        placeholder="Choisissez un artiste"
        fluid
        selection
        options={artistes}
        onChange={(e, { value }) => {
          isResponseArtist(value);
        }}
      />
    </div>
  );
}
