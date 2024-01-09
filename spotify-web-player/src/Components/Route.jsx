import React from "react";
import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";
import App from "../App";
import Quizz from "./Quizz";
import MainPage from "./MainPage";
import Result from "./Result";
import Tchat from "./Tchat";
import GamePage from "./GamePage";
import MyPlaylists from "./MyPlaylists";
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
      path: "/game/:playlistId",
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

    {
      path: "/game",
      element: <GamePage />,
    },

    {
      path: "/myplaylists",
      element: <MyPlaylists />,
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
