import React, { useState, useContext } from "react";
import { useEffect } from "react";
import Player from "./Player";
import "semantic-ui-css/semantic.min.css";
import { Grid, Segment, Button, Placeholder } from "semantic-ui-react";
import NavBar from "./NavBar";
import Tchat from "./Tchat";
import Quizz from "./Quizz";
import { ScrollRestoration, useNavigate, useParams } from "react-router-dom";
import { SocketContext } from "./context/SocketContext";
import MyPlaylists from "./MyPlaylists";
import { TrackProvider } from "./SpotifyContext";
import { PlayerContext } from "./context/PlayerContext";
import Result from "./Result";
import FlipMove from "react-flip-move";

export default function GamePage() {
  const { room, playerList, updatePlayerList } =
    React.useContext(PlayerContext);

  const playlistId = useParams();
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const [select, setSelect] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [sortedPlayerList, setSortedPlayerList] = useState([]);

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
    };
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

  useEffect(() => {
    const newSortedPlayerList = playerList
      .slice()
      .sort((a, b) => b.score - a.score);
    setSortedPlayerList(newSortedPlayerList);
  }, [playerList]);

  var listPlayerslocal = sortedPlayerList.map((player, index) => (
    <tr>
      <Player
        key={index}
        name={player.username}
        profile_picture={player.profile_picture}
        score={player.score}
      />
    </tr>
  ));

  const winner = playerList.find((player) => player.score >= 30);

  return (
    <div style={{ backgroundColor: "#181818" }}>
      <NavBar></NavBar>

      <TrackProvider>
        <Grid columns={2}>
          <Grid.Row divided>
            <Grid.Column width={11} style={{ paddingLeft: "2em" }}>
              <Segment
                style={{
                  overflowY: "scroll",
                  height: "90vh",
                  backgroundColor: "rgba(0, 234, 98, 0.2)",
                }}
              >
                {!select ? (
                  <div>
                    <MyPlaylists
                      onSelectPlaylist={(id) => setSelectedPlaylistId(id)}
                    />
                    <Button
                      onClick={loadsGame}
                      size="large"
                      style={{ backgroundColor: "rgb(0, 234, 98)" }}
                    >
                      Valider
                    </Button>
                  </div>
                ) : !winner ? (
                  <Quizz playlistId={selectedPlaylistId}></Quizz>
                ) : (
                  <Result></Result>
                )}
              </Segment>
            </Grid.Column>
            <Grid.Column width={5} style={{ paddingRight: "2em" }}>
              <Segment
                style={{
                  overflowY: "scroll",
                  height: "40vh",
                  backgroundColor: "rgba(0, 234, 98, 0.2)",
                }}
              >
                <FlipMove>{listPlayerslocal}</FlipMove>
              </Segment>
              <Segment style={{ backgroundColor: "rgba(221, 221, 221, 0.75)" }}>
                <Tchat></Tchat>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </TrackProvider>
    </div>
  );
}
