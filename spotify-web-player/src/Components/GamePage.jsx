import React from "react";
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
import { TrackProvider } from "./SpotifyContext";
import { PlayerContext } from "./context/PlayerContext";

export default function GamePage() {
  const { username, room, profile_picture, listPlayers, setlistPlayers } = React.useContext(PlayerContext);

  const playlistId = useParams();
  const socket = React.useContext(SocketContext);
  const [players, setPlayers] = React.useState([]);

  useEffect(() => {
    socket.on("chatroom_users", (data) => {
      console.log(data);
      setPlayers(data);
    });
    return () => socket.off("chatroom_users");
  }, [socket]);

  const listPlayerslocal = players.map((player, index) => (
    setlistPlayers([...listPlayers, player]),
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
            <Grid.Column width={11}>
              <Segment>
                <Game playlistId={playlistId}></Game>
              </Segment>
              <Segment>
                <ResponseEntry playlistId={playlistId}></ResponseEntry>
              </Segment>
            </Grid.Column>

            <Grid.Column width={5}>
              <Segment
                style={{
                  overflowY: "scroll",
                  height: "50vh",
                }}
              >
                {listPlayerslocal}
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
