import React, { useContext } from "react";
import { Grid, Header, Form, Segment, Icon } from "semantic-ui-react";
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
    }
    
    return (
      <div>
      <NavBar/>
          <Grid color="black" textAlign="center" style={{ height: "90vh",}} verticalAlign="middle">
              <Grid.Column style={{maxWidth: "30em" }}>
                  <Header as="h1" textAlign="center">
                      Rejoindre une partie
                  </Header>
                  <Segment stacked>
                      <Form size="large">
                          <Form.Input
                          name="Code de la partie"
                          placeholder="Code de la partie"
                          autoComplete="off"
                          id="roomCodeInput" />
                          <Form.Group widths="equal" style={{marginBottom: 0}}>
                              <Form.Button fluid
                              color="green" 
                              size="large" 
                              type="submit"
                              onClick={joinRoomNavigate}
                              >
                              <Icon name='group'/> Rejoindre
                              </Form.Button>
                              <Form.Button inverted fluid
                              color="green" 
                              size="large" 
                              type="submit"
                              onClick={createRoomNavigate}
                              >                        
                              <Icon name='plus'/> Créer
                              </Form.Button>
                          </Form.Group>
                      </Form>
                  </Segment>
              </Grid.Column>
          </Grid>
      </div>
    );

}
