import React from "react";
import { Item, Button, ItemGroup, Icon } from "semantic-ui-react";

export default function Playlist(props) {
  return (
    <Item.Group>
      <Item>
        <Item.Image size="small" src={props.urlImage} />
        <Item.Content verticalAlign="middle">
          <Item.Header>{props.name}</Item.Header>
          <Item.Meta>{props.nbSongs} titres</Item.Meta>
          <Item.Description>{props.description}</Item.Description>
          <Item.Extra>
            {props.player}
            {props.isAdded ? (
              <Button negative icon labelPosition="right">
                Retirer
                <Icon name="close"></Icon>
              </Button>
            ) : (
              <Button positive icon labelPosition="right">
                Ajouter
                <Icon name="plus"></Icon>
              </Button>
            )}
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
}
