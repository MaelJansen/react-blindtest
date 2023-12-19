import React from 'react';
import ReactDOM from 'react-dom';
import Route from './Components/Route';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import { SocketProvider } from './Components/context/SocketContext';



ReactDOM.render(
  <React.StrictMode>
      <SocketProvider>
        <Route />
      </SocketProvider>
  </React.StrictMode>,
  document.getElementById('root')
);