import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TrackPlayer from './TrackPlayer';

function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

function Quizz() {
    const { playlistId } = useParams();
    const [tracks, setTracks] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
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
                shuffle(tracksData);
                setTracks(tracksData);
                console.log('Playlist tracks:', tracksData);
            } catch (error) {
                console.error('Error retrieving playlist tracks:', error);
            }
        }

        getPlaylistTracks();
    }, [playlistId]);

    const handleNextTrack = () => {
        setCurrentTrackIndex((prevIndex) => prevIndex + 1);
    };

    const currentTrack = tracks[currentTrackIndex];

    return (
        <div>
            <h1>Quizz</h1>
            {currentTrack && (
                <div key={currentTrack.track.id}>
                    <h3>{currentTrack.track.name}</h3>
                    <img src={currentTrack.track.album.images[0].url} alt={currentTrack.track.name} />
                    <p>{currentTrack.track.artists[0].name}</p>
                    <TrackPlayer trackId={currentTrack.track.id} token={token} />
                    <button onClick={handleNextTrack}>Next Track</button>
                </div>
            )}
        </div>
    );
}

export default Quizz;