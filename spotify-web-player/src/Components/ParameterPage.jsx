import React from "react";
import NavBar from "./NavBar";
import Player from "./Player";
import { Grid, GridColumn, Segment, Input, Button } from "semantic-ui-react";
import ListPlaylist from "./ListPlaylist";

export default function ParameterPage(props) {
  const players = [
    ["le mangeur de patates", "pink", "10"],
    ["Joueur2", "blue", "10"],
    ["Joueur3", "green", "10"],
    ["Joueur4", "red", "10"],
    ["Joueur5", "teal", "10"],
    ["le mangeur de patates", "pink", "10"],
    ["Joueur2", "blue", "10"],
    ["Joueur3", "green", "10"],
    ["Joueur4", "red", "10"],
    ["Joueur5", "teal", "10"],
  ];

  const listPlayers = players.map((player) => (
    <div style={{ padding: "0.5em" }}>
      <Player name={player[0]} color={player[1]} score={player[2]}></Player>
    </div>
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
                <Button floated="right" size="huge" color="red">
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
              <ListPlaylist> </ListPlaylist>
            </div>
            {/*{listPlaylist}*/}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
