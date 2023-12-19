import React from "react";
import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";
import App from '../App';
import Quizz from './Quizz';
import GamePage from './GamePage';
import MainPage from './MainPage';
import Tchat from './Tchat';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export default function (props) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },

    {
      path: "/quizz/:playlistId",
      element: <Quizz />,
    },

        {
          path: "/game",
          element:<GamePage/>
        },

        {
          path: "/mainpage",
          element:<MainPage/>
    },

        {
          path: "/result",
          element:<Result/>
            },

        {
          path: "/tchat",
          element:<Tchat/>
        }
      ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
