import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const TrackContext = createContext();

const TrackProvider = ({ children }) => {
  const [allTracks, setAllTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState();

  const updateAllTracks = (newTracks) => {
    setAllTracks(newTracks);
  };

  const updateCurrentTrack = (newTrack) => {
    setCurrentTrack(newTrack);
  };

  return (
    <TrackContext.Provider
      value={{ allTracks, updateAllTracks, currentTrack, updateCurrentTrack }}
    >
      {children}
    </TrackContext.Provider>
  );
};

export { TrackProvider, TrackContext };
