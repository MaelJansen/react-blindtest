import React from 'react';
import ReactDOM from 'react-dom';
import Route from './Components/Route';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import { SocketProvider } from './Components/context/SocketContext';
import { PlayerProvider } from './Components/context/PlayerContext';



ReactDOM.render(
  <React.StrictMode>
    <SocketProvider>
      <PlayerProvider>
        <Route/>
      </PlayerProvider>
    </SocketProvider>
  </React.StrictMode>,
  document.getElementById('root')
);