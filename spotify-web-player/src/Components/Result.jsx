import React from "react";
import { Grid, Image, Segment, Button } from "semantic-ui-react";
import Player from "./Player";

export default function () {
    let i = 0
    let sizes = 5
    const images = [ "trophy.png", "deuxieme.png","troisieme.png"]
    const players = [
        ["le mangeur de patates", "pink", "0"],
        ["Joueur2", "blue", "79"],
        ["Joueur3", "green", "80"],
        ["Joueur4", "red", "15"],
        ["Joueur5", "teal", "100"],
      ];
    players.sort(function(a, b) {
    return b[2] - a[2];
    });
    const listPlayers = players.map((player) => (
        <Player name={player[0]} color={player[1]} score={player[2]}></Player>
    ));
    
    const classement = images.map((image) => (
        <Grid.Column width={sizes--}>
            <Image src={require("./images/" + image)}/>
            {listPlayers[i]}
            {i++}
        </Grid.Column>
    ));

    const classementPerdant = (
        <Grid.Column width={4}>
        <div
            style={{
            overflowY: "scroll",
            height: "50vh",
            }}
        >
            {listPlayers.slice(3)}
        </div>
        </Grid.Column>
    );

    return (
        <Grid columns={4} textAlign="center" style={{ height: "90vh" }} verticalAlign="bottom" >
            {classement}
            {classementPerdant}
            <Segment.Group horizontal>
                <Button color="green" fluid size="huge" type="submit">Rejouer</Button>
                <Button color="red" fluid size="huge" type="submit">Retour à l'accueil</Button>
            </Segment.Group>
        </Grid>
        )
    }