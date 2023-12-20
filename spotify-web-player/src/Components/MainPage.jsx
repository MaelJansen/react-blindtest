import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Header, Form, Segment, Icon } from "semantic-ui-react";
import { SocketContext } from "./context/SocketContext";
import NavBar from "./NavBar";

export default function MainPage({ token }) {
  const socket = useContext(SocketContext);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [profile_picture, setProfilePicture] = useState("");
  const [spotify_user_id, setSpotifyUserId] = useState("");

  const navigate = useNavigate();
  const joinRoom = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", {
        username,
        room,
        profile_picture,
        spotify_user_id,
      });
      localStorage.setItem("username", username);
      localStorage.setItem("room", room);
      localStorage.setItem("profile_picture", profile_picture);
      navigate("/parameter", { replace: true });
    }
  };

  useEffect(() => {
    const getSpotifyUserInfo = async () => {
      try {
        const response = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUsername(data.display_name);
        setProfilePicture(data.images[0].url);
        setSpotifyUserId(data.id);
      } catch (error) {
        console.error(error);
      }
    };

    getSpotifyUserInfo();
  }, [token]);

    useEffect(() => {
        socket.on('existing_user', ({ username, room }) => {
            console.log(`User ${username} already connected in room ${room}`);
            // Redirect to the homepage
            navigate('/');
          });
            return () => socket.off('existing_user');
    }
    , [socket, navigate]);
    
    return (
        <div>
        <NavBar/>
            <Grid color="black" textAlign="center" style={{ height: "90vh",}} verticalAlign="middle">
                <Grid.Column style={{maxWidth: "30em" }}>
                    <Header as="h1" textAlign="center">
                        Joindre une partie
                    </Header>
                    <Segment stacked>
                        <Form size="large">
                            <Form.Input
                            name="Code de la partie"
                            placeholder="Code de la partie"
                            autoComplete="off"
                            onChange={(e) => setRoom(e.target.value)}
                            />
                            <Form.Group widths="equal">
                                <Form.Button fluid
                                color="green" 
                                size="large" 
                                type="submit"
                                onClick={joinRoom}
                                >
                                <Icon name='group'/> Rejoindre
                                </Form.Button>
                                <Form.Button inverted fluid
                                color="green" 
                                size="large" 
                                type="submit">
                                <Icon name='plus'/> Creer
                                </Form.Button>
                            </Form.Group>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        </div>
    );
}
