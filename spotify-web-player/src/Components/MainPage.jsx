import React, { useContext } from "react";
import {
  Grid,
  Header,
  Form,
  Segment,
  Icon,
  Divider,
  Button,
} from "semantic-ui-react";
import { PlayerContext } from "./context/PlayerContext";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();
  const { joinRoom, createRoom } = useContext(PlayerContext);

  const joinRoomNavigate = async () => {
    try {
      await joinRoom();
      navigate("/game", { replace: true });
    } catch (error) {
      console.log("Room does not exist");
    }
  };

  const createRoomNavigate = () => {
    createRoom();
    navigate("/game", { replace: true });
  };

  return (
    <div style={{ backgroundColor: "#181818" }}>
      <NavBar />
      <Grid
        color="black"
        textAlign="center"
        style={{ height: "90vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: "40em" }}>
          <Segment stacked style={{ backgroundColor: "rgba(0, 234, 98, 0.2)" }}>
            <Form size="large">
              <Grid columns={2} stackable textAlign="center">
                <Divider inverted vertical>
                  Ou
                </Divider>

                <Grid.Row verticalAlign="middle">
                  <Grid.Column style={{ padding: "2em" }}>
                    <Header as="h1" textAlign="center" inverted>
                      Rejoindre une partie
                    </Header>
                    <Form.Input
                      name="Code de la partie"
                      placeholder="Code de la partie"
                      autoComplete="off"
                      id="roomCodeInput"
                    />
                    <Form.Button
                      fluid
                      style={{ backgroundColor: "rgb(0, 234, 98)" }}
                      size="large"
                      type="submit"
                      onClick={joinRoomNavigate}
                    >
                      <Icon name="group" /> Rejoindre
                    </Form.Button>
                  </Grid.Column>

                  <Grid.Column style={{ padding: "2em" }}>
                    <Header as="h1" textAlign="center" inverted>
                      Créer une partie
                    </Header>
                    <Form.Button
                      fluid
                      style={{ backgroundColor: "rgb(0, 234, 98)" }}
                      size="large"
                      type="submit"
                      onClick={createRoomNavigate}
                    >
                      <Icon name="plus" /> Créer
                    </Form.Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
}
