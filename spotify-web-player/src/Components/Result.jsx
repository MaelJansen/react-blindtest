import React from "react";
import { Grid, Image, Segment, Button } from "semantic-ui-react";
import Player from "./Player";

export default function () {
    let i = 0
    let sizes = 5
    const images = [ "premier.png", "deuxieme.png","troisieme.png"]
    const players = [
        ["le mangeur de patates", "pink", "10"],
        ["Joueur2", "blue", "10"],
        ["le mangeur de patates", "pink", "10"],
        ["Joueur2", "blue", "10"],
      ];
    players.sort(function(a, b) {
    return b[2] - a[2];
    });
    const listPlayers = players.map((player) => (
        <Player name={player[0]} color={player[1]} score={player[2]}></Player>
    ));
    
    function classement () { 
        let classement = []
        let maxi = 3
        if (listPlayers.length < 3) {
            maxi = listPlayers.length
        }
        for (let i = 0; i < maxi; i++) {
            classement[i] =
            <Grid.Column width={sizes--}>
                <Image src={require("../../public/images/" + images[i])} style={{padding: "1em"}}/>
                {listPlayers[i]}
            </Grid.Column>
        }
        return classement
    }

    function classementPerdant () {
        if (listPlayers.length > 3) {
            let classmt =
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
            return classmt
        } else {
            return null
        }
    };

    return (
        <Segment>
            <Grid columns={4} textAlign="center" style={{ height: "85vh"}} verticalAlign="bottom" >
                {classement()}
                {classementPerdant()}
            </Grid>
            <Segment.Group horizontal>
                    <Button color="green" fluid size="massive" type="submit">Rejouer</Button>
                    <Button color="red" fluid size="massive" type="submit">Retour à l'accueil</Button>
                </Segment.Group>
        </Segment>
        )
    }