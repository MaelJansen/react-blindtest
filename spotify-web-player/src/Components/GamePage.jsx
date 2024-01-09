import React, { useState } from "react";
import { useEffect } from "react";
import Player from "./Player";
import "semantic-ui-css/semantic.min.css";
import { Grid, Segment, Button } from "semantic-ui-react";
import NavBar from "./NavBar";
import Tchat from "./Tchat";
import ResponseEntry from "./ResponseEntry";
import Quizz from "./Quizz";
import { useNavigate, useParams } from "react-router-dom";
import { SocketContext } from "./context/SocketContext";
import MyPlaylists from "./MyPlaylists";
import { TrackProvider } from "./SpotifyContext";
import { PlayerContext } from "./context/PlayerContext";

export default function GamePage() {
  const { username, room, profile_picture, playerList, updatePlayerList } = React.useContext(PlayerContext);

  const playlistId = useParams();
  const socket = React.useContext(SocketContext);
  const navigate = useNavigate();
  const [select, setSelect] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);


  useEffect(() => {
    socket.on("chatroom_users", (data) => {
      console.log(data);
      updatePlayerList(data);
    });
    socket.on("game_loaded", () => {
      // Redirect to the game page when the game starts
      setSelect(true);
    });


    return () => {
      socket.off("chatroom_users");
      socket.off("game_loaded");
    }
  }, [socket, navigate, room]);


  const loadsGame = () => {
    if (selectedPlaylistId) {
      console.log("selectedPlaylistId", selectedPlaylistId);
      // Emit 'loads_game' event to the server with the selected playlist ID
      socket.emit("loads_game", { room, playlistId: selectedPlaylistId });
    } else {
      // Handle the case when no playlist is selected
      console.log("Please select a playlist before starting the game");
    }
  };

  const listPlayerslocal = playerList.map((player, index) => (
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
                  <MyPlaylists onSelectPlaylist={(id) => setSelectedPlaylistId(id)} />
                </Segment>
                <Button onClick={loadsGame}>Valider</Button>
              </Grid.Column>
            ) : (
              <Grid.Column width={11}>
                <Segment>
                  <Quizz playlistId={selectedPlaylistId}></Quizz>
                </Segment>
                <Segment>
                  <ResponseEntry
                    playlistId={selectedPlaylistId}
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
