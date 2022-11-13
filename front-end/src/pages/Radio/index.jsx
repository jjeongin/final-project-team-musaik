import NavBar from '../../components/NavBar/NavBar';
import cover_one from '../../img/bubblecover1.jpeg'
import cover_two from '../../img/bubblecover2.jpeg'
import cover_three from '../../img/bubblecover3.jpg'
import cover_four from '../../img/bubblecover4.png'
import cover_five from '../../img/bubblecover5.jpeg'
import cover_six from '../../img/bubblecover6.jpg'
import cover_seven from '../../img/bubblecover7.jpg'
import cover_eight from '../../img/bubblecover8.jpg'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Bubble from '../../components/Bubble';
import SpotPlayer from '../../components/SpotPlayer';
import './index.css';
import { songs } from '../../components/dummyData';

function Radio(props) {
    const getUser = async () => {
        const user = await axios.get('/user');
        return user.data;
    };

    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [trackUri, setTrackUri] = useState("");

    useEffect(() => {
        getUser().then((user) => {
            setUser(user);
            setAccessToken(user.access_token);
            console.log("user", user);
        });
    }, []);

    const setTrack = () => {
        setTrackUri("spotify:track:4iV5W9uYEdYUVa79Axb7Rh");
        console.log("trackUri", trackUri);
    }

    const sample_user_id = 'dummy_id';
    const sample_track_id = '5hVghJ4KaYES3BFUATCYn0';
    // get top six sessions from database
    const session_one = {
        host: {
            id: sample_user_id
        },
        playlist: [
            {
                track_id: sample_track_id
            },
            {
                track_id: sample_track_id
            },
        ],
        listeners: [
            {
                id: sample_user_id
            },
            {
                id: sample_user_id
            },
        ]
    }
    return (
        <>
        <button onClick={setTrack}>CLICK ME</button>
        <div className="Radio">
            <Bubble session={session_one} id='1' />
            <Bubble session={session_one} id='2' />
            <Bubble session={session_one} id='3' />
            <Bubble session={session_one} id='4' />
            <Bubble session={session_one} id='5' />
            <Bubble session={session_one} id='6' />
            <div className="Player-Container">
                <SpotPlayer accessToken={accessToken} trackUri={trackUri} />
            </div>
            <NavBar/>
        </div>
        </>
    );
}

export default Radio