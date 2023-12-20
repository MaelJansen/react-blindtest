import React from "react";
import { Item, Button, ItemGroup, Icon } from "semantic-ui-react";

export default function Playlist(props) {
  return (
    <div>
      {props.isAdded ? (
        <Button color="green">
          <Item.Group>
            <Item>
              <Item.Image size="small" src={props.urlImage} />
              <Item.Content verticalAlign="middle">
                <Item.Header>{props.name}</Item.Header>
                <Item.Meta>{props.nbSongs} titres</Item.Meta>
                <Item.Extra>{props.player}</Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </Button>
      ) : (
        <Button>
          <Item.Group>
            <Item>
              <Item.Image size="small" src={props.urlImage} />
              <Item.Content verticalAlign="middle">
                <Item.Header>{props.name}</Item.Header>
                <Item.Meta>{props.nbSongs} titres</Item.Meta>
                <Item.Extra>{props.player}</Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </Button>
      )}
    </div>
  );
}