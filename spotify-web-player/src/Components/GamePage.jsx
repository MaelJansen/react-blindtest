import React, { useState } from "react";
import { useEffect } from "react";
import Player from "./Player";
import "semantic-ui-css/semantic.min.css";
import { Grid, Segment, Button } from "semantic-ui-react";
import NavBar from "./NavBar";
import Tchat from "./Tchat";
import ResponseEntry from "./ResponseEntry";
import Game from "./Game";
import { useNavigate, useParams } from "react-router-dom";
import { SocketContext } from "./context/SocketContext";
import MyPlaylists from "./MyPlaylists";
import { TrackProvider } from "./SpotifyContext";

export default function GamePage() {
  const username = localStorage.getItem("username");
  const room = localStorage.getItem("room");
  const profile_picture = localStorage.getItem("profile_picture");

  const socket = React.useContext(SocketContext);
  const [players, setPlayers] = React.useState([]);
  const navigate = useNavigate();
  const [select, setSelect] = useState(false);

  useEffect(() => {
    socket.on("chatroom_users", (data) => {
      console.log(data);
      setPlayers(data);
    });
    socket.on("game_started", () => {
      // Redirect to the game page when the game starts
      setShouldShow(true);
    });


    return () => {
      socket.off("chatroom_users");
      socket.off("game_started");
    }
  }, [socket, navigate, room]);

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit("leave_room", { username, room, __createdtime__ });
    // Redirect to home page
    navigate("/", { replace: true });
  };

  const startGame = () => {
    // Emit 'start_game' event to the server
    socket.emit("start_game", { room });
  };

  const listPlayers = players.map((player, index) => (
    <Player
      key={index}
      name={player.username}
      profile_picture={player.profile_picture}
    />
  ));
  return (
    <div>
      <NavBar></NavBar>

      <TrackProvider>
        <Grid columns={2} divided>
          <Grid.Row>
            {!select ? (
              <Grid.Column width={11}>
                <Segment
                  style={{
                    overflowY: "scroll",
                    height: "80vh",
                  }}
                >
                  <MyPlaylists> </MyPlaylists>
                </Segment>
                <Button onClick={() => setSelect(true)}>Valider</Button>
              </Grid.Column>
            ) : (
              <Grid.Column width={11}>
                <Segment>
                  <Game playlistId={"55oo0fRxJKLdqpgcAGAPvO"}></Game>
                </Segment>
                <Segment>
                  <ResponseEntry
                    playlistId={"55oo0fRxJKLdqpgcAGAPvO"}
                  ></ResponseEntry>
                </Segment>
              </Grid.Column>
            )}

            <Grid.Column width={5}>
              <Segment
                style={{
                  overflowY: "scroll",
                  height: "40vh",
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
      </TrackProvider>
    </div>
  );
}
