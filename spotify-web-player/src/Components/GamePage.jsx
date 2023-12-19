import React from "react";
import { useEffect } from "react";
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
  const username = localStorage.getItem("username");
  const room = localStorage.getItem("room");
  const profile_picture = localStorage.getItem("profile_picture");
  
  const socket = React.useContext(SocketContext);
  const [players, setPlayers] = React.useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('chatroom_users', (data) => {
      console.log(data);
      setPlayers(data);
    });
    return () => socket.off('chatroom_users');
  }, [socket]);

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit('leave_room', { username, room, __createdtime__ });
    // Redirect to home page
    navigate('/', { replace: true });
  };

  const listPlayers = players.map((player, index) => (
    <Player key={index} name={player.username}  profile_picture={player.profile_picture} />
  ));
  return (
    <div>
      <NavBar></NavBar>
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column width={11}>
            <Segment>
              <Game></Game>
            </Segment>
            <Segment>
              <ResponseEntry></ResponseEntry>
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
              <Tchat></Tchat>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
