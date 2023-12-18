import React, { useState, useEffect } from "react";
import { Card, Placeholder, Progress } from "semantic-ui-react";

export default function Game() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setPercent(percent + 0.1);
    }, 29);
  }, [percent]);

  return (
    <div>
      <Card style={{ height: "100%", width: "auto" }}>
        <Card.Content>
          <Placeholder>
            <Placeholder.Image square />
          </Placeholder>
        </Card.Content>
      </Card>
      <Progress percent={percent} size="small" indicating />
    </div>
  );
}
