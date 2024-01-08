import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Icon, Label, LabelDetail } from "semantic-ui-react";

export default function Player(props) {
  console.log("props", props);
  return (
      <Label inverted as="a" color={props.color} size="big" image
      style={{
        textOverflow: "ellipsis",
        maxWidth: "30vw",
        marginBottom: "1em"
      }}>
        <img src={props.profile_picture} />
        <LabelDetail>{props.name}</LabelDetail>
        {props.score}
      </Label>
  );
}
