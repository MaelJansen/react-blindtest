import React, {useState, useEffect} from 'react' 
import axios from 'axios';
import { Card, Input, Image, Popup } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

function SearcherTrack(props) {
    const [searchKey, setSearchKey] = useState("")
    const [tracks, setTracks] = useState([])
    const [tracksFeatures, setTracksFeatures] = useState([])
    const [hoveredTrackFeatures, setHoveredTrackFeatures] = useState(null);

    const access_token = props.token

    const searchTrack = async () => {
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                'Content-Type' : "application/json",
                'Authorization': `Bearer ${access_token}`
            },
            params: {
                q: searchKey,
                type: "track",
                market: 'US',
                limit: 10
            }
        })
        
        console.log("Data",data)
        var temptrackIDS = data.tracks.items.map(track => track.id + ',')
        console.log("temptrackIDS",temptrackIDS)
        var trackIDs =  temptrackIDS.join('')
        console.log("trackIDs",trackIDs)

        var songs = await axios.get("https://api.spotify.com/v1/tracks" , {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            params: {
                ids: trackIDs,
                market: 'US'

            }
        })
        console.log("songs.data.tracks",songs.data.tracks)

        var songsFeatures = await axios.get("https://api.spotify.com/v1/audio-features" , {
            headers: {
                Authorization : `Bearer ${access_token}`
            },
            params: {
                ids: trackIDs
            }
        })

        console.log("songsFeatures.data.audio_features",songsFeatures.data.audio_features);
        setTracksFeatures(songsFeatures.data.audio_features);

        
        //Adding a features array to each track
        var tempTracks = songs.data.tracks
        for (var i = 0; i < tempTracks.length; i++) {
            tempTracks[i] = {...tempTracks[i], features: []}
        }
        for (var i = 0; i < tempTracks.length; i++) {
            tempTracks[i].features = songsFeatures.data.audio_features[i]
        }
        console.log("tempTracks",tempTracks)
        setTracks(tempTracks)
    }

    const renderFeaturesPopup = (features) => (
            <div>
                <p>Acousticness: {features.acousticness}</p>
                <p>Danceability: {features.danceability}</p>
                <p>Energy: {features.energy}</p>
                <p>Instrumentalness: {features.instrumentalness}</p>
                <p>Liveness: {features.liveness}</p>
                <p>Loudness: {features.loudness}</p>
                <p>Speechiness: {features.speechiness}</p>
                <p>Tempo: {features.tempo}</p>
                <p>Valence: {features.valence}</p>
            </div>  
    )

    const PopupExampleTrigger = (track) => (
        <Popup
            trigger={
            <Card
            onMouseEnter={() => setHoveredTrackFeatures(track.features)}
            onMouseLeave={() => setHoveredTrackFeatures(null)}
            >
            <Image style={{width:450}} src={track.album.images[0].url} alt="album cover"/>
            <Card.Content>  
                <Card.Header>{track.name}</Card.Header>
                <Card.Meta>{track.artists[0].name}</Card.Meta>
                <Card.Description style={{}}>
                {track.album.name}
                </Card.Description>
                
            </Card.Content>
        </Card>
        }
        >
            <Popup.Header>Features</Popup.Header>
            <Popup.Content>
            {renderFeaturesPopup(track.features)}
            </Popup.Content>
        </Popup>
      )


    

    return (
    <>
    <div className="SearchForm" style={{marginLeft:30}}>
        <Input icon ="search"
            className ="Name" 
            type="text" 
            placeholder="Search By Track Name ..."
            onChange={(e) => {setSearchKey(e.target.value)}}
            onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    searchTrack()
                }
            }}
        />
        </div>
        
        <Card.Group itemsPerRow={5} style={{ marginTop: 50, marginLeft:30, marginRight:30 }}>
        {console.log(tracks)}
        {tracks.slice(0,10).map(track => (
            <PopupExampleTrigger key={track.id} track={track} />
        ))
        }
        </Card.Group>
    </> 
)
}

export default SearcherTrack