import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Quizz from './Quizz';
import { Link } from 'react-router-dom';

function MyPlaylists({ token }) {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        async function getMyPlaylists() {
            try {
                const response = await axios.get(`https://api.spotify.com/v1/me/playlists`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const playlistsData = response.data.items;
                setPlaylists(playlistsData);
                console.log('My playlists:', playlistsData);
            } catch (error) {
                console.error('Error retrieving my playlists:', error);
            }
        }

        getMyPlaylists();
    }, []);

    return (
        <div>
            <h1>My Playlists</h1>
            {playlists.map((playlist) => (
                <div key={playlist.id}>
                    <h3>{playlist.name}</h3>
                    <img src={playlist.images[0].url} alt={playlist.name} />
                    <p>{playlist.tracks.total} tracks</p>
                    <p>{playlist.description}</p>
                    <Link to={`/quizz/${playlist.id}`}>Quizz</Link>
                </div>
            ))}
        </div>
    );
}

export default MyPlaylists;