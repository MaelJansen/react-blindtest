import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Game from './Components/Game';

ReactDOM.render(
  <React.StrictMode>
      {/*<App />*/}
      <Game />
  </React.StrictMode>,
  document.getElementById('root')
);