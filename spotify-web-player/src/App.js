import React, { useState, useEffect } from 'react';
import Login from './Login'
import './App.css';
import TrackPlayer from './TrackPlayer';

function App() {

  const [token, setToken] = useState('');
  const trackId = '1qHX3JQefKOvy64bIWEAhS';


  useEffect(() => {

    async function getToken() {
      const response = await fetch('/auth/token');
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();

  }, []);

  return (
    <>
        { (token === '') ? <Login/> : <TrackPlayer trackId={trackId} token={token}/> }
    </>
  );
}


export default App;