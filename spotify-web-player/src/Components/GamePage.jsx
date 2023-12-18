import React from "react";
import Player from "./Player";
import "semantic-ui-css/semantic.min.css";
import { Grid, Segment } from "semantic-ui-react";
import NavBar from "./NavBar";
import Tchat from "./Tchat";
import ResponseEntry from "./ResponseEntry";
import Game from "./Game";

export default function GamePage() {
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
