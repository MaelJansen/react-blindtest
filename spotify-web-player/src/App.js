import React, { useState, useEffect } from 'react';
import Login from './Login'
import './App.css';
import TrackPlayer from './TrackPlayer';
import Logout from './Logout';

function App() {

  const [token, setToken] = useState('');
  const trackId = '25lTenJPmSfwCRZi2hjCcB';


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
        { (token === '') ? <Login/> :  <div><TrackPlayer trackId={trackId} token={token}/> <Logout/></div> }
    </>
  );
}


export default App;