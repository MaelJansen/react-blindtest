import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Dropdown } from "semantic-ui-react";

export default function ResponseEntry() {
  const titres = [
    {
      key: "1",
      text: "Musique 1",
    },
    {
      key: "2",
      text: "Musique 2",
    },
    {
      key: "3",
      text: "Musique 3",
    },
    {
      key: "4",
      text: "Musique 4",
    },
  ];

  const artistes = [
    {
      key: "1",
      text: "Artiste 1",
    },
    {
      key: "2",
      text: "Artiste 2",
    },
    {
      key: "3",
      text: "Artiste 3",
    },
    {
      key: "4",
      text: "Artiste 4",
    },
  ];

  return (
    <div>
      <Dropdown
        placeholder="Choisissez un tire"
        fluid
        selection
        options={titres}
        style={{ marginBottom: "2em" }}
      />
      <Dropdown
        placeholder="Choisissez un artiste"
        fluid
        selection
        options={artistes}
      />
    </div>
  );
}
