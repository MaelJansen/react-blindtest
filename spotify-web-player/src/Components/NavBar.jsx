import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Menu, Header, Icon, Button } from "semantic-ui-react";
import { useContext } from "react";
import { PlayerContext } from "./context/PlayerContext";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const { room, leaveRoom} = useContext(PlayerContext);
  const navigate = useNavigate();

  const leaveRoomNavigate = () => {
    leaveRoom();
    navigate("/", { replace: true });
  };

  return (
    <Menu>
      <Menu.Item>
        <Header as="h1">Cyclops</Header>
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item>
          {room}
        </Menu.Item>
        <Menu.Item>
          <Button color="red" onClick={leaveRoomNavigate}>
            <Icon name="logout"/> Quitter
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>);
}
