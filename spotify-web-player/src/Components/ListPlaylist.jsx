import React from "react";
import Playlist from "./Playlist";
import { Grid, Segment, Form, Input } from "semantic-ui-react";
import Player from "./Player";

export default function ListPlaylist() {
  const Playlists = [
    [
      "Playlist 1",
      "10",
      "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      "fskldfbsdlkfbsdljfh",
      true,
      <Player name="Player 2" color="teal"></Player>,
    ],
    [
      "Playlist 2",
      "52",
      "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      "hjdbskfjvdfjsdhfsvjfv",
      false,
      <Player name="Player 1" color="blue"></Player>,
    ],
    [
      "Playlist 1",
      "10",
      "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      "fskldfbsdlkfbsdljfh",
      true,
      <Player name="Player 2" color="teal"></Player>,
    ],
    [
      "Playlist 2",
      "52",
      "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      "hjdbskfjvdfjsdhfsvjfv",
      false,
      <Player name="Player 1" color="blue"></Player>,
    ],
  ];

  const listPlaylist = Playlists.map((playlist) => (
    <Playlist
      name={playlist[0]}
      nbSongs={playlist[1]}
      urlImage={playlist[2]}
      description={playlist[3]}
      isAdded={playlist[4]}
      player={playlist[5]}
    ></Playlist>
  ));

  return (
    <div>
      <Grid columns={2}>
        <Grid.Row>
          {listPlaylist.map((playlist) =>
            playlist.key % 2 ? (
              <Grid.Column>
                <Segment>{playlist}</Segment>{" "}
              </Grid.Column>
            ) : null
          )}
        </Grid.Row>
        <Grid.Row>
          {listPlaylist.map((playlist) =>
            !playlist.key % 2 ? (
              <Grid.Column>
                <Segment>{playlist}</Segment>
              </Grid.Column>
            ) : null
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
}
