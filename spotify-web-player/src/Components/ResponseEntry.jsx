import React, { useState, useEffect, useContext } from "react";
import "semantic-ui-css/semantic.min.css";
import { Dropdown, Feed } from "semantic-ui-react";
import axios, { all } from "axios";
import { TrackContext } from "./SpotifyContext";
import { SocketContext } from "./context/SocketContext";
import { v4 as uuidv4 } from "uuid";

export default function ResponseEntry() {
  const [titles, setTitles] = useState([]);
  const [artistes, setArtistes] = useState([]);
  const { allTracks } = useContext(TrackContext);
  const { currentTrack } = useContext(TrackContext);
  const username = localStorage.getItem("username");
  const room = localStorage.getItem("room");
  const [response, setResponse] = useState(false);
  const [responseArtist, setResponseArtist] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedArtist, setSelectedArtist] = useState("");
  const socket = useContext(SocketContext);

  const submitMessage = (message) => {
    const __createdtime__ = Date.now();
    socket.emit("send_message", { message, username, room, __createdtime__ });
  };

  useEffect(() => {
    const shuffledTitles = shuffleArray(Object.keys(allTracks).map(track => allTracks[track].track.name));
    const shuffledArtistes = shuffleArray(Object.keys(allTracks).map(track => allTracks[track].track.artists[0].name));

    setTitles(shuffledTitles.map(title => ({
      key: title,
      text: title,
      value: title,
    })));

    setArtistes(shuffledArtistes.map(artist => ({
      key: artist,
      text: artist,
      value: artist,
    })));

    console.log("tracks: ", allTracks);
  }, [allTracks]);

  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
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
          setSelectedTitle(value);
          isResponse();
        }}
        value={selectedTitle}
      />
      <Dropdown
        placeholder="Choisissez un artiste"
        fluid
        selection
        options={artistes}
        onChange={(e, { value }) => {
          setSelectedArtist(value);
          isResponseArtist();
        }}
        value={selectedArtist}
      />
    </div>
  );
}
