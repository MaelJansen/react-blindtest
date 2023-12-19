import React, { useState, useEffect } from 'react';
import WebPlayback from './Components/WebPlayback'
import Login from './Components/Login'
import './App.css';
import TrackPlayer from './TrackPlayer';
import Logout from './Logout';
import MyPlaylists from './MyPlaylists';


function App() {

  const [token, setToken] = useState('');
  const trackId = '25lTenJPmSfwCRZi2hjCcB';


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
        { (token === '') ? <Login/> :  <div><MyPlaylists token={token}/> <TrackPlayer trackId={trackId} token={token}/> <Logout/></div> }
    </>
  );
}


export default App;