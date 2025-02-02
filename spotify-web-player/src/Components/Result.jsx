import React from "react";
import { Grid, Image, Segment, Button } from "semantic-ui-react";
import Player from "./Player";
import NavBar from "./NavBar";
import { PlayerContext } from "./context/PlayerContext";

export default function Result() {
  let sizes = 5;
  const images = ["premier.png", "deuxieme.png", "troisieme.png"];
  const { playerList } = React.useContext(PlayerContext);
  playerList.sort(function (a, b) {
    return b.score - a.score;
  });
  const listPlayers = playerList.map((player, index) => (
    <Player
      key={index}
      name={player.username}
      profile_picture={player.profile_picture}
      score={player.score}
    />
  ));

  function classement() {
    let classement = [];
    let maxi = 3;
    if (listPlayers.length < 3) {
      maxi = listPlayers.length;
    }
    for (let i = 0; i < maxi; i++) {
      classement[i] = (
        <Grid.Column width={sizes--}>
          <Image
            src={require("../../public/images/" + images[i])}
            style={{ padding: "1em" }}
          />
          {listPlayers[i]}
        </Grid.Column>
      );
    }
    return classement;
  }

  function classementPerdant() {
    if (listPlayers.length > 3) {
      let classmt = (
        <Grid.Column width={4}>
          <div
            style={{
              overflowY: "scroll",
              height: "45vh",
            }}
          >
            {listPlayers.slice(3)}
          </div>
        </Grid.Column>
      );
      return classmt;
    } else {
      return null;
    }
  }

  return (
    <div>
      <Segment>
        <Grid
          columns={4}
          textAlign="center"
          style={{ height: "75vh" }}
          verticalAlign="bottom"
        >
          {classement()}
          {classementPerdant()}
        </Grid>
      </Segment>
    </div>
  );
}
