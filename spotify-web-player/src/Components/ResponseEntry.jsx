import React, { useState, useEffect, useContext } from "react";
import "semantic-ui-css/semantic.min.css";
import { Dropdown, Feed, Progress, Segment } from "semantic-ui-react";
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

  useEffect(() => {
    const shuffledTitles = shuffleArray(
      Object.keys(allTracks).map((track) => allTracks[track].track.name)
    );
    const shuffledArtistes = shuffleArray(
      Object.keys(allTracks).map(
        (track) => allTracks[track].track.artists[0].name
      )
    );

    setTitles(
      shuffledTitles.map((title) => ({
        key: title,
        text: title,
        value: title,
      }))
    );

    setArtistes(
      shuffledArtistes.map((artist) => ({
        key: artist,
        text: artist,
        value: artist,
      }))
    );

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

  useEffect(() => {
    setResponse(false);
    setResponseArtist(false);
  }, [currentTrack]);

  function isResponse(value) {
    var message = "a gagné 8 points";
    if (value === currentTrack.track.name) {
      setResponse(true);
      submitMessage(message);
      updateScore(score + 8);
    }
  }

  function isResponseArtist(value) {
    var message = "a gagné 2 points";
    if (value === currentTrack.track.artists[0].name) {
      setResponseArtist(true);
      submitMessage(message);
      console.log("bonne réponse");
      updateScore(score + 2);
    }
  }

  return (
    <div>
      {console.log("title :", titles)}
      {console.log("current track : ", currentTrack)}
      {!response ? (
        <div>
          <Progress percent={50} attached="top" />
          <Dropdown
            placeholder="Choisissez un titre"
            fluid
            selection
            search
            options={titles}
            style={{ marginBottom: "1em" }}
            onChange={(e, { value }) => {
              isResponse(value);
            }}
          />
        </div>
      ) : null}
      {!responseArtist ? (
        <div>
          <Progress percent={50} attached="top" />
          <Dropdown
            placeholder="Choisissez un artiste"
            fluid
            selection
            search
            options={artistes}
            onChange={(e, { value }) => {
              isResponseArtist(value);
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
