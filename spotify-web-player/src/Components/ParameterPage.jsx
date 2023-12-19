import React from "react";
import NavBar from "./NavBar";
import Player from "./Player";
import { Grid, Segment } from "semantic-ui-react";
import ListPlaylist from "./ListPlaylist";

export default function ParameterPage() {
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
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column width={5}>
            <Segment
              style={{
                overflowY: "scroll",
                height: "50vh",
                width: "30vw",
              }}
            >
              {listPlayers}
            </Segment>
          </Grid.Column>
          <Grid.Column width={10} style={{ overflowY: "scroll" }}>
            <ListPlaylist> </ListPlaylist>
            {/*{listPlaylist}*/}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
