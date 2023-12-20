import React, { useEffect, useState } from "react";
import axios from "axios";
import Quizz from "./Quizz";
import { Link } from "react-router-dom";
import { Button, Image, Grid, Segment } from "semantic-ui-react";

function MyPlaylists() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    async function getMyPlaylists() {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/me/playlists`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const playlistsData = response.data.items;
        setPlaylists(playlistsData);
        console.log("My playlists:", playlistsData);
      } catch (error) {
        console.error("Error retrieving my playlists:", error);
      }
    }
    getMyPlaylists();
  }, []);

  return (
    <div>
      <h1>My Playlists</h1>
      <Grid columns={2}>
        <Grid.Row>
          {playlists.map((playlist) =>
            playlist.key % 2 ? (
              <Grid.Column>
                <Segment>
                  <h3>{playlist.name}</h3>
                  <Image
                    src={playlist.images[0].url}
                    alt={playlist.name}
                    size="small"
                  />
                  <p>{playlist.tracks.total} tracks</p>
                  <p>{playlist.description}</p>
                </Segment>{" "}
              </Grid.Column>
            ) : null
          )}
        </Grid.Row>
        <Grid.Row>
          {playlists.map((playlist) =>
            !playlist.key % 2 ? (
              <Grid.Column>
                <Segment>
                  <h3>{playlist.name}</h3>
                  <Image
                    src={playlist.images[0].url}
                    alt={playlist.name}
                    size="small"
                  />
                  <p>{playlist.tracks.total} tracks</p>
                  <p>{playlist.description}</p>
                </Segment>
              </Grid.Column>
            ) : null
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default MyPlaylists;
