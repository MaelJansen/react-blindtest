import React, { useState, useEffect, useContext, createContext } from "react";
import { useNavigate } from 'react-router-dom';
import {io} from "socket.io-client";


const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    
    useEffect(() => {
        const newSocket = io.connect("http://localhost:5000");
        setSocket(newSocket);
        console.log("newSocket", newSocket);

        console.log("connected", socket);
    
        return () => {
            newSocket.close();
        }
    }, []);
    
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
    }

export { SocketProvider, SocketContext };