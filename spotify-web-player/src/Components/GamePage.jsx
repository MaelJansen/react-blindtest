import React, { useEffect, useContext, useState } from "react";
import Player from "./Player";
import "semantic-ui-css/semantic.min.css";
import { Grid, Segment, Button } from "semantic-ui-react";
import NavBar from "./NavBar";
import Tchat from "./Tchat";
import ResponseEntry from "./ResponseEntry";
import Game from "./Game";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "./context/SocketContext";

export default function GamePage() {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const [players, setPlayers] = useState([]);

  // Load user details from localStorage
  const username = localStorage.getItem("username");
  const room = localStorage.getItem("room");
  const profile_picture = localStorage.getItem("profile_picture");

  useEffect(() => {
    console.log("Attempting to connect socket...");
  
    // Connect to the socket only if user details are available
    if (username && room && socket) {
      console.log("User details and socket available. Connecting...");
  
      // Your existing socket event listeners...
      socket.on('chatroom_users', (data) => {
        console.log("Received chatroom_users event:", data);
        setPlayers(data);
      });
  
      return () => {
        // Clean up socket event listeners if needed
        socket.off('chatroom_users');
        console.log("Cleaning up socket event listeners...");
      };
    } else {
      // Redirect to home page if user details or socket are not available
      console.log("User details or socket not available. Redirecting to home page...");
      navigate('/', { replace: true });
    }
  }, [navigate, username, room, socket]);

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit('leave_room', { username, room, __createdtime__ });
    // Clear user details from localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("room");
    localStorage.removeItem("profile_picture");
    // Redirect to home page
    navigate('/', { replace: true });
  };

  const listPlayers = players.map((player, index) => (
    <Player key={index} name={player.username}  profile_picture={player.profile_picture} />
  ));

  return (
    <div>
      <NavBar />
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column width={11}>
            <Segment>
              <Game />
            </Segment>
            <Segment>
              <ResponseEntry />
            </Segment>
          </Grid.Column>

          <Grid.Column width={5}>
            <Segment
              style={{
                overflowY: "scroll",
                height: "50vh",
              }}
            >
              {listPlayers}
              <Button onClick={leaveRoom}>Quitter</Button>
            </Segment>
            <Segment>
              <Tchat />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
