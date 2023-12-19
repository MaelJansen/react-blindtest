import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Icon, Label, LabelDetail } from "semantic-ui-react";

export default function Player(props) {
  return (
    <div
      style={{
        textOverflow: "ellipsis",
        maxWidth: "30vw",
      }}
    >
      <Label as="a" color={props.color} size="huge" image>
        <Icon name="user" />
        {props.score}
        <LabelDetail>{props.name}</LabelDetail>
      </Label>
    </div>
  );
}
