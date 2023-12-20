import React, { useState, useEffect, useContext } from "react";
import "semantic-ui-css/semantic.min.css";
import { Dropdown } from "semantic-ui-react";
import axios, { all } from "axios";
import { TrackContext } from "./SpotifyContext";

export default function ResponseEntry() {
  const [titles, setTitles] = useState([]);
  const [artistes, setArtistes] = useState([]);
  const { allTracks } = useContext(TrackContext);

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
            key: currentTrack.track.artists[0].name,
            text: currentTrack.track.artists[0].name,
            value: currentTrack.track.artists[0].name,
          },
        ]);
      }
    }
    console.log("tracks: ", allTracks);
  }, [allTracks]);

  return (
    <div>
      {console.log("title :", titles)}
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
