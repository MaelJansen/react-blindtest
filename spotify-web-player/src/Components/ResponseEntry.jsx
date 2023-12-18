import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Form } from "semantic-ui-react";

export default function ResponseEntry() {
  return (
    <Form>
      <Form.Field>
        <label>Titre</label>
        <input placeholder="Titre" />
      </Form.Field>
      <Form.Field>
        <label>Artiste</label>
        <input placeholder="Artiste" />
      </Form.Field>
    </Form>
  );
}
