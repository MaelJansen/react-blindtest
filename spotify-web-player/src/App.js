import React, { useState, useEffect } from 'react';
import Login from './Components/Login'
import './App.css';
import Logout from './Components/Logout';
import Home from './Components/MainPage';
import { PlayerContext } from './Components/context/PlayerContext';


function App() {
  const { token,setToken } = React.useContext(PlayerContext);

  useEffect(() => {

    async function getToken() {
      const response = await fetch('/auth/token');
      const json = await response.json();
      setToken(json.access_token);
      localStorage.setItem('token', json.access_token);
    }

    getToken();

  }, []);

  return (
    <>
        { (token === '') ? <Login/> :  <div><Home token= {token}/><Logout/></div> }
    </>
  );
}


export default App;