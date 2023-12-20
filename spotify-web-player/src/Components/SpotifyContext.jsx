import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const TrackContext = createContext();

const TrackProvider = ({ children }) => {
  const [allTracks, setAllTracks] = useState([]);

  return (
    <TrackContext.Provider value={{ allTracks, setAllTracks }}>
      {children}
    </TrackContext.Provider>
  );
};

export { TrackProvider, TrackContext };
