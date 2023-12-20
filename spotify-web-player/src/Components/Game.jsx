import React, { useState, useEffect } from "react";
import { Card, Placeholder, Progress } from "semantic-ui-react";
import Quizz from "./Quizz";
import { TrackProvider } from "./SpotifyContext";

export default function Game(props) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setPercent(percent + 0.1);
    }, 29);
  }, [percent]);

  return (
    <div>
      <TrackProvider>
        <Quizz playlistId={props.playlistId}></Quizz>
        <Progress percent={percent} size="small" indicating />
      </TrackProvider>
    </div>
  );
}
