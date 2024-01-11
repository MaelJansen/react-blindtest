import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Icon, Label, LabelDetail } from "semantic-ui-react";

export default function Player(props) {
  console.log("props", props);
  return (
    <Label
      inverted
      as="a"
      size="big"
      image
      style={{
        textOverflow: "ellipsis",
        maxWidth: "30vw",
        marginBottom: "1em",
        backgroundColor: "rgba(221, 221, 221, 0.75)",
      }}
    >
      <img src={props.profile_picture} />
      {props.name}
      <LabelDetail>{props.score}</LabelDetail>
    </Label>
  );
}
