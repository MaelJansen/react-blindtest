import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Menu, Header, Icon } from "semantic-ui-react";

export default function NavBar() {

  return (
    <Menu>
      <Menu.Item>
        <Header as="h1">Cyclops</Header>
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item>
          <Icon name="logout"/> Quitter
        </Menu.Item>
      </Menu.Menu>
    </Menu>);
}
