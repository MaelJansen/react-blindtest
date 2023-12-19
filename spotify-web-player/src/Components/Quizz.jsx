import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import TrackPlayer from './TrackPlayer';
import { useParams } from 'react-router-dom';

function Quizz() {

    const { playlistId } = useParams();

    const [tracks, setTracks] = useState([]);
    const [trackId, setTrackId] = useState("");

    const token = localStorage.getItem('token');

    useEffect(() => {
        async function getPlaylistTracks() {
            try {
                const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const tracksData = response.data.items;
                setTracks(tracksData);
                console.log('Playlist tracks:', tracksData);
            } catch (error) {
                console.error('Error retrieving playlist tracks:', error);
            }
        }

        getPlaylistTracks();
    }, [playlistId]);

    return (
        <div>
            <h1>Quizz</h1>
            {tracks.map((track) => (
                <div key={track.track.id}>
                    <h3>{track.track.name}</h3>
                    <img src={track.track.album.images[0].url} alt={track.track.name} />
                    <p>{track.track.artists[0].name}</p>
                    <TrackPlayer trackId={track.track.id} token={token} />
                </div>
            ))}
        </div>
    );
}

export default Quizz;