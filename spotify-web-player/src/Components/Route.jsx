import React from "react";
import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";
import App from "../App";
import Quizz from "./Quizz";
import Game from "./Game";
import MainPage from "./MainPage";
import Result from "./Result";
import Tchat from "./Tchat";
import GamePage from "./GamePage";

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
      element: <GamePage />,
    },

    {
      path: "/mainpage",
      element: <MainPage />,
    },

    {
      path: "/result",
      element: <Result />,
    },

    {
      path: "/tchat",
      element: <Tchat />,
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
