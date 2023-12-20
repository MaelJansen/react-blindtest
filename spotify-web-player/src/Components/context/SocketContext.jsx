import React, { useState, useEffect, useContext, createContext } from "react";
import { useNavigate } from 'react-router-dom';
import {io} from "socket.io-client";


const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = React.useState(true);

    
    useEffect(() => {
        const newSocket = io.connect("http://localhost:5000");

        newSocket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
        });

        newSocket.on('connect', () => {
            setLoading(false);
        });

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
        }, []);
    
    return (
        <SocketContext.Provider value={socket}>
            {!loading && children}
        </SocketContext.Provider>
    );
    }

export { SocketProvider, SocketContext };