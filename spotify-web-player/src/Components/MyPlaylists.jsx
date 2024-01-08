import React, { useEffect, useState } from "react";
import axios, { all } from "axios";
import Quizz from "./Quizz";
import { Link } from "react-router-dom";
import { Button, Image, Grid, Segment, Container } from "semantic-ui-react";

function MyPlaylists({ onSelectPlaylist }) {
  const [playlists, setPlaylists] = useState([]);
  const [allTracks, setAllTracks] = useState([]);

  const changeColor = (playlistId) => {
    // Call the onSelectPlaylist callback with the playlist ID
    onSelectPlaylist(playlistId);
    console.log("playlistId", playlistId);

    const playlist = document.getElementById(playlistId);
    playlist.className = "ui button green fluid";

    const playlists = document.getElementsByClassName("ui button green fluid");
    for (let i = 0; i < playlists.length; i++) {
      if (playlists[i].id !== playlistId) {
        playlists[i].className = "ui black basic fluid button";
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
        console.log("My playlists:", playlistsData);
      } catch (error) {
        console.error("Error retrieving my playlists:", error);
      }
    }
    getMyPlaylists();
  }, []);

  async function getAllTracks() {
    try {
      playlists.map((playlist) => {
        const response = axios.get(
          `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const tracksData = response.data.items;
        console.log("All tracks:", tracksData);
        setAllTracks(tracksData);
      });
    } catch (error) {
      console.error("Error retrieving all tracks:", error);
    }
  }

  function allTracksNames(playlist) {
    const allTracks = Promise.all(getAllTracks(playlist));
    allTracks.then((tracks) => {
      tracks.map((track) => {
        track.map((track) => {
          console.log("track", track.track.name);
          return <p>{track.track.name}</p>;
        });
      });
    });
  }

  return (
    <div>
      <h1>My Playlists</h1>
      <Grid columns={2}>
        <Grid.Row>
          {playlists.map((playlist) =>
            playlist.key % 2 ? (
              <Grid.Column>
                <Segment>
                  <Button
                    fluid
                    color="black"
                    basic
                    onClick={() => changeColor(playlist.id)}
                    id={playlist.id}
                  >
                    <h3>{playlist.name}</h3>
                    <Grid columns={2}>
                      <Grid.Column>
                        <Image
                          src={playlist.images[0].url}
                          alt={playlist.name}
                          size="small"
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Container
                          style={{
                            overflowY: "scroll",
                            height: "15vh",
                          }}
                        >
                          {console.log("truc")}
                        </Container>
                      </Grid.Column>
                    </Grid>
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
                    color="black"
                    basic
                    onClick={() => changeColor(playlist.id)}
                    id={playlist.id}
                  >
                    <h3>{playlist.name}</h3>
                    <Grid columns={2}>
                      <Grid.Column>
                        <Image
                          src={playlist.images[0].url}
                          alt={playlist.name}
                          size="small"
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Container
                          style={{
                            overflowY: "scroll",
                            height: "15vh",
                          }}
                        >
                          {console.log("truc")}
                        </Container>
                      </Grid.Column>
                    </Grid>
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
