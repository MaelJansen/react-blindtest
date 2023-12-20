import React, { useState, useEffect, useContext } from "react";
import "semantic-ui-css/semantic.min.css";
import { Dropdown } from "semantic-ui-react";
import axios, { all } from "axios";
import { TrackContext } from "./SpotifyContext";

export default function ResponseEntry(props) {
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const token = localStorage.getItem("token");
  const [titles, setTitles] = useState([]);
  const [artistes, setArtistes] = useState([]);
  const { alltracks, setAllTracks } = useContext(TrackContext);

  useEffect(() => {
    console.log("test");
    console.log(alltracks);
    console.log("test");
  }, [alltracks]);

  return (
    <div>
      <Dropdown
        placeholder="Choisissez un tire"
        fluid
        selection
        options={titles}
        style={{ marginBottom: "2em" }}
      />
      <Dropdown
        placeholder="Choisissez un artiste"
        fluid
        selection
        options={artistes}
      />
    </div>
  );
}
