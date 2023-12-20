import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const TrackContext = createContext();

const TrackProvider = ({ children }) => {
  const [allTracks, setAllTracks] = useState([]);

  const updateAllTracks = (newTracks) => {
    setAllTracks(newTracks);
  };

  return (
    <TrackContext.Provider value={{ allTracks, updateAllTracks }}>
      {children}
    </TrackContext.Provider>
  );
};

export { TrackProvider, TrackContext };
