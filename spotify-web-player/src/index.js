import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import GamePage from './Components/GamePage';
import ParameterPage from './Components/ParameterPage';

ReactDOM.render(
  <React.StrictMode>
      {/*<App />*/}
      <ParameterPage />
  </React.StrictMode>,
  document.getElementById('root')
);