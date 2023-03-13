import React from 'react' 
import { Card, Input, Image, Popup } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

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

export default Card