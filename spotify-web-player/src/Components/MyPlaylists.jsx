import React, { useEffect, useState } from "react";
import axios, { all } from "axios";
import Quizz from "./Quizz";
import { Link } from "react-router-dom";
import { Button, Image, Grid, Segment, Container } from "semantic-ui-react";

function MyPlaylists({ onSelectPlaylist }) {
  const [playlists, setPlaylists] = useState([]);

  const changeColor = (playlistId) => {
    // Call the onSelectPlaylist callback with the playlist ID
    onSelectPlaylist(playlistId);

    const playlist = document.getElementById(playlistId);
    playlist.className = "ui button green fluid";

    const playlists = document.getElementsByClassName("ui button green fluid");
    for (let i = 0; i < playlists.length; i++) {
      if (playlists[i].id !== playlistId) {
        playlists[i].className = "ui grey fluid button";
      }
    }
  };

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
        console.log("My playlists :", playlistsData);
      } catch (error) {
        console.error("Error retrieving my playlists:", error);
      }
    }
    getMyPlaylists();
  }, []);

  return (
    <div>
      <h1>My Playlists</h1>
      <Grid columns={4}>
        <Grid.Row>
          {playlists.map((playlist) =>
            playlist.key % 2 ? (
              <Grid.Column>
                <Segment>
                  <Button
                    fluid
                    color="grey"
                    onClick={() => changeColor(playlist.id)}
                    id={playlist.id}
                  >
                    <h3>{playlist.name.slice(0, 20)}</h3>
                    <Image
                      src={playlist.images[0].url}
                      alt={playlist.name}
                      size="small"
                      centered
                    />
                    <p>{playlist.tracks.total} tracks</p>
                    <p>{playlist.description}</p>
                  </Button>
                </Segment>
              </Grid.Column>
            ) : null
          )}
        </Grid.Row>
        <Grid.Row>
          {playlists.map((playlist) =>
            !playlist.key % 2 ? (
              <Grid.Column>
                <Segment>
                  <Button
                    fluid
                    color="grey"
                    onClick={() => changeColor(playlist.id)}
                    id={playlist.id}
                  >
                    <h3>{playlist.name.slice(0, 20)}</h3>
                    <Image
                      src={playlist.images[0].url}
                      alt={playlist.name}
                      size="small"
                      centered
                    />
                    <p>{playlist.tracks.total} tracks</p>
                    <p>{playlist.description}</p>
                  </Button>
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
