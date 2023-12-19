import React, { useState, useEffect } from 'react';
import Login from './Components/Login'
import './App.css';
import Logout from './Components/Logout';
import MyPlaylists from './Components/MyPlaylists';


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
        { (token === '') ? <Login/> :  <div><MyPlaylists token={token}/><Logout/></div> }
    </>
  );
}


export default App;