import React, { useState, useEffect } from "react";
import Player from "./Player";
import "semantic-ui-css/semantic.min.css";
import {
  Card,
  Placeholder,
  Button,
  Progress,
  ListItem,
  Grid,
} from "semantic-ui-react";

export default function Game() {
  const players = [
    ["le mangeur de patates", "pink", "10"],
    ["Joueur2", "blue", "10"],
    ["Joueur3", "green", "10"],
    ["Joueur4", "red", "10"],
    ["Joueur5", "teal", "10"],
  ];
  const listPlayers = players.map((player) => (
    <Player name={player[0]} color={player[1]} score={player[2]}></Player>
  ));

  const [percent, setPersent] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setPersent(percent + 1);
    }, 100);
  }, [percent]);

  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Card>
              <Card.Content>
                <Placeholder>
                  <Placeholder.Image rectangular />
                </Placeholder>
              </Card.Content>
            </Card>
            <div>
              <Progress percent={percent} size="small" indicating />
            </div>
          </Grid.Column>

          <Grid.Column width={6}>
            <div
              style={{
                overflowY: "scroll",
                height: "50vh",
              }}
            >
              {listPlayers}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
