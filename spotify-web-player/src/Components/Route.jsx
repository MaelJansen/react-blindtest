import React from "react";
import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";
import App from "../App";
import Quizz from "./Quizz";
import Game from "./Game";
import MainPage from "./MainPage";import Result from './Result';


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GamePage from "./GamePage";

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
      element: <GamePage />,
    },

    {
      path: "/mainpage",
      element: <MainPage />,
    },

        {
          path: "/result",
          element:<Result/>
        },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
