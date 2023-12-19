import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Feed } from "semantic-ui-react";

export default function Message({message, username, __createdtime__}) {

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <Feed.Event>
      <Feed.Label>
        <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
            <Feed.User>{username}</Feed.User>{message}
            <Feed.Date>{formatDateFromTimestamp(__createdtime__)}</Feed.Date>
        </Feed.Summary>
      </Feed.Content>
    </Feed.Event>
  );
}