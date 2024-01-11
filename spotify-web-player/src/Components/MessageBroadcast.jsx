import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Feed } from "semantic-ui-react";

export default function MessageBroadcast({
  message,
  username,
  __createdtime__,
}) {
  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }
  return (
    <Feed.Event>
      <Feed.Content>
        {message}
        <Feed.Summary>
          <Feed.Date>{formatDateFromTimestamp(__createdtime__)}</Feed.Date>
        </Feed.Summary>
      </Feed.Content>
    </Feed.Event>
  );
}
