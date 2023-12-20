import React from "react";
import NavBar from "./NavBar";
import Player from "./Player";
import { Grid, GridColumn, Segment, Input, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "./context/SocketContext";


export default function ParameterPage(props) {
  const username = localStorage.getItem("username");
  const room = localStorage.getItem("room");
  const profile_picture = localStorage.getItem("profile_picture");

  const socket = React.useContext(SocketContext);
  const [players, setPlayers] = React.useState([]);
  const navigate = useNavigate();

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
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={5}>
            <h1>Code : {props.code}</h1>
            <Segment
              style={{
                overflowY: "scroll",
                height: "50vh",
                width: "30vw",
              }}
            >
              {listPlayers}
            </Segment>
            {props.isOwner ? (
              <div>
                <Button floated="left" color="green" size="huge">
                  Démarrer
                </Button>
                <Button floated="right" color="red" size="huge">
                  Supprimer la partie
                </Button>
              </div>
            ) : (
              <div>
                <Button floated="left" size="huge" color="green">
                  Je suis prêt(e)
                </Button>
                <Button onClick={leaveRoom} floated="right" size="huge" color="red">
                  Quitter la partie
                </Button>{" "}
              </div>
            )}
          </Grid.Column>
          <Grid.Column width={11}>
            <h1>Playlists</h1>
            <Input
              icon="search"
              fluid
              placeholder="Search..."
              style={{
                marginBottom: "  1em",
              }}
            />
            <div
              style={{
                overflowY: "scroll",
                overflowX: "hidden",
              }}
            >
            </div>
            {/*{listPlaylist}*/}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
