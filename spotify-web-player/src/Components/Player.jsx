import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Icon, Label, LabelDetail } from "semantic-ui-react";

export default function Player(props) {
  return (
    <div
      style={{
        padding: "1vh",
        textOverflow: "ellipsis",
        maxWidth: "30vw",
      }}
    >
      <Label as="a" color={props.color} size="massive" image>
        <Icon name="user" />
        {props.name}
        <LabelDetail>{props.score}</LabelDetail>
      </Label>
    </div>
  );
}
