import React from 'react';
import ReactDOM from 'react-dom';
import Route from './Components/Route';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
//import SpotifyProvider from "./Components/SpotifyContext"


ReactDOM.render(
  <React.StrictMode>
    {/*<SpotifyProvider>*/}
    <Route />
    {/*</SpotifyProvider>*/}
  </React.StrictMode>,
  document.getElementById('root')
);