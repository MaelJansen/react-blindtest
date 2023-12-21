import React, { useState, useEffect, useContext, createContext } from "react";

const PlayerContext = createContext();

const PlayerProvider = ({ children }) => {
    const socket = useContext(SocketContext);
    const [room, setRoom] = useState(null);
    
    return (
        <PlayerContext.Provider value={room}>
            {children}
        </PlayerContext.Provider>
    );

}


export { PlayerProvider, PlayerContext };