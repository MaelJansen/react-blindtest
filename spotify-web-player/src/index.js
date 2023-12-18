import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Route from './Route';
import './index.css';
import { BrowserRouter } from 'react-router-dom'


ReactDOM.render(
  <React.StrictMode>
      <Route />
  </React.StrictMode>,
  document.getElementById('root')
);