import "semantic-ui-css/semantic.min.css";
import React, { useState } from "react";
import { Menu, Header, Button, Popup, Image } from "semantic-ui-react";
import { useContext } from "react";
import { PlayerContext } from "./context/PlayerContext";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const { room, leaveRoom } = useContext(PlayerContext);
  const navigate = useNavigate();

  const [popupOpen, setPopupOpen] = useState(false);

  const handleButtonClick = () => {
    setPopupOpen(true);
    setTimeout(() => {
      setPopupOpen(false);
    }, 1000);
  };

  const leaveRoomNavigate = () => {
    leaveRoom();
    navigate("/", { replace: true });
  };

  return (
    <Menu inverted style={{ borderRadius: 0 }}>
      <Menu.Item>
        <Header as="h1" style={{ color: "white" }}>
          Cyclops
        </Header>
      </Menu.Item>
      {room && (
        <Menu.Menu position="right">
          <Menu.Item
            onClick={() => {
              navigator.clipboard.writeText(room);
            }}
          >
            Code de la partie:
            <Popup
              position="bottom left"
              content="Code copié !"
              on="click"
              open={popupOpen}
              trigger={
                <Button
                  style={{ marginLeft: "1em" }}
                  icon="copy"
                  content={room}
                  onClick={handleButtonClick}
                />
              }
            />
          </Menu.Item>
          <Menu.Item>
            <Button
              color="red"
              icon="sign-out"
              onClick={leaveRoomNavigate}
            ></Button>
          </Menu.Item>
        </Menu.Menu>
      )}
    </Menu>
  );
}
