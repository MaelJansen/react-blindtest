import React, { useState, useEffect, useContext, createContext } from "react";
import { SocketContext } from "./SocketContext";

const PlayerContext = createContext();

const PlayerProvider = ({ children }) => {
  const socket = useContext(SocketContext);
  const [room, setRoom] = useState(null);
  const [username, setUsername] = useState("");
  const [profile_picture, setProfilePicture] = useState("");
  const [spotify_user_id, setSpotifyUserId] = useState("");
  const [playerList, setPlayerList] = useState([]);
  const [token, setToken] = useState("");
  const [score, setScore] = useState(0);

  const updatePlayerList = (newPlayerList) => {
    setPlayerList(newPlayerList);
  };

  const updateScore = (newScore) => {
    console.log("updateScore");
    setScore(newScore);
    socket.emit("update_score", {
      username,
      room,
      profile_picture,
      spotify_user_id,
      newScore,
    });
  };

  useEffect(() => {
    const getSpotifyUserInfo = async () => {
      try {
        const response = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("Spotify user info :", data);
        setUsername(data.display_name);
        setProfilePicture(data.images[0].url);
        setSpotifyUserId(data.id);
        setScore(0);
      } catch (error) {
        console.error(error);
      }
    };

    getSpotifyUserInfo();
  }, [token]);

  const createRoom = () => {
    setScore(0);
    var score = 0;
    if (username !== "") {
      socket.emit("create_room", {
        username,
        profile_picture,
        spotify_user_id,
        score,
      });
      socket.on("room_created", (data) => {
        console.log(`room_created ${data}`);
        setRoom(data);
      });
    }
  };

  const joinRoom = () => {
    const room = document.getElementById("roomCodeInput").value;
    setScore(0);
    var score = 0;
    console.log("score actuel :", score);
    if (room !== "" && username !== "") {
      socket.emit("join_room", {
        username,
        room,
        profile_picture,
        spotify_user_id,
        score,
      });
      socket.on("room_code", (data) => {
        console.log(`room_joined ${data}`);
        setRoom(data);
      });
    }
  };

    const leaveRoom = () => {
        const __createdtime__ = Date.now();
        socket.emit("leave_room", { username, room, __createdtime__ });
        setRoom(null);
    }

    const playlistCrafted = (hostPlaylist) => {
        const __createdtime__ = Date.now();
        socket.emit("playlist_crafted", { room, hostPlaylist, __createdtime__ });
    }


  return (
    <PlayerContext.Provider
      value={{
        room,
        username,
        profile_picture,
        spotify_user_id,
        playerList,
        token,
        score,
        createRoom,
        joinRoom,
        updatePlayerList,
        setToken,
        leaveRoom,
        playlistCrafted,
        updateScore,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerProvider, PlayerContext };
