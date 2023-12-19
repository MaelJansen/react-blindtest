import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Placeholder, Form, Input } from "semantic-ui-react";

export default function Tchat() {
  return (
    <div>
      <Placeholder style={{ overflowY: "scroll", height: "30vh" }}>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
      <Form.Field style={{ paddingTop: "1em" }}>
        <Input fluid placeholder="Dites quelque chose" icon="paper plane" />
      </Form.Field>
    </div>
  );
}
