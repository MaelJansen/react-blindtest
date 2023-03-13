import React, { useState, useEffect } from 'react';
import SearcherTrack from './components/SearcherTrack';
import { Button} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

function App() {
const CLIENT_ID=process.env.REACT_APP_SPOTIFY_CLIENT_ID
const REDIRECT_URI =process.env.REACT_APP_SPOTIFY_REDIRECT_URI 
const AUTH_ENDPOINT =process.env.REACT_APP_SPOTIFY_AUTH_ENDPOINT 
const RESPONSE_TYPE = process.env.REACT_APP_SPOTIFY_RESPONSE_TYPE

const [token, setToken] = useState("");

  useEffect(() => { 
  const hash = window.location.hash;
  let token = window.localStorage.getItem("token");

  if (hash && hash) {
    token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
    window.location.hash = "";
    window.localStorage.setItem("token", token);
  }

  setToken(token)
}, [])

const logout = () => {
  setToken("");
  window.localStorage.removeItem("token");
}

return (
  <div className="App">
  <header className="App-header">
  <div className="SearchContainer">
    <h2 style={{marginLeft : 30, marginTop:10}}>Spotify Search</h2>
    {!token ? 
      <div > 
      <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
      Login to Spotify
      </a>
      </div> 
      :
      <div> 
      <SearcherTrack token={token}/>
      
      <Button style={{marginLeft : 30, marginTop:10, marginBottom:10}}
       className='logOut' color='red' onClick={logout}>Logout</Button>

      </div >
      
      }
      </div>
      
    </header>
  </div>
);
}

export default App;