import React, { useState, useEffect } from 'react';
import Login from './Components/Login'
import './App.css';
import Logout from './Components/Logout';
import Home from './Components/MainPage';
import { PlayerContext } from './Components/context/PlayerContext';


function App() {
  useEffect(() => {

    async function getToken() {
        const response = await fetch('/auth/token');
        const json = await response.json();
        localStorage.setItem('token', json.access_token);
      
    }

    getToken();

  }, []);

  return (
    <>
        { (localStorage.getItem("token") === '') ? <Login/> :  <div><Home/><Logout/></div> }
    </>
  );
}


export default App;