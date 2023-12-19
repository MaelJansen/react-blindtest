import React, { useState, useEffect, useContext} from "react";
import { useNavigate } from 'react-router-dom';
import { Grid, Header, Form, Segment, Button } from "semantic-ui-react";
import { SocketContext } from "./context/SocketContext";

    
export default function MainPage() {
    const socket = useContext(SocketContext);
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    
    
    const navigate = useNavigate();
    const joinRoom = () => {
        if (room !== '' && username !== '') {
          socket.emit('join_room', { username, room });
          localStorage.setItem('username', username);
          localStorage.setItem('room', room);
          navigate('/game', { replace: true } );
        }
      };
    
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
                onChange={(e) => setUsername(e.target.value)}
                />
                <Form.Input
                name="Code de la partie"
                placeholder="Code de la partie"
                onChange={(e) => setRoom(e.target.value)}
                />
                <Form.Group widths="equal">
                    <Form.Button onClick={joinRoom} color="green" fluid size="large" type="submit">
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