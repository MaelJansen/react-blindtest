import React, { useState, useEffect } from "react";
import { Grid, Header, Form, Segment, Button } from "semantic-ui-react";

export default function () {
    return (
        <Grid textAlign="center" style={{ height: "90vh" }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h1" textAlign="center">
            Spotify Guess
            </Header>
            <Form size="large">
            <Segment stacked>
                <Form.Input
                fluid
                name="Nom"
                placeholder="Nom"
                required
                />
                <Form.Input
                name="Code de la partie"
                placeholder="Code de la partie"
                />
                <Form.Group widths="equal">
                    <Form.Button color="green" fluid size="large" type="submit">
                    Rejoindre
                    </Form.Button>
                    <Form.Button color="green" fluid size="large" type="submit">
                    Creer
                    </Form.Button>
                </Form.Group>
            </Segment>
            </Form>
        </Grid.Column>
        </Grid>
    );
}