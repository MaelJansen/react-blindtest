import React from 'react';
import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";
import App from '../App';
import Quizz from './Quizz';
import Game from './Game';



import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

  export default function (props) {
    const router = createBrowserRouter([
      
        {
          path: "/",
          element:<App />
        },

        {
          path: "/quizz/:playlistId",
          element:<Quizz/>
        },

        {
          path: "/game",
          element:<Game/>
        },
      ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}