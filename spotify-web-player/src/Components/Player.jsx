import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Icon, Label, LabelDetail } from "semantic-ui-react";

export default function Player(props) {
  console.log("props", props);
  return (
    <div
      style={{
        textOverflow: "ellipsis",
        maxWidth: "30vw",
      }}
    >
      <Label as="a" color={props.color} size="big" image>
        <img src={props.profile_picture} />
        {props.name}
        <LabelDetail>{props.score}</LabelDetail>
      </Label>
    </div>
  );
}
