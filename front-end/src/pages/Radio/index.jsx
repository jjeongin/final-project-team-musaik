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
    const [trackUri, setTrackUri] = useState("spotify:track:4iV5W9uYEdYUVa79Axb7Rh"); // default track
    const [currentSession, setCurrentSession] = useState(null); // currently joined session

    useEffect(() => {
        getUser().then((user) => {
            setUser(user);
            setAccessToken(user.access_token);
            console.log("user", user);
        });
    }, []);

    // set the track to play
    const setTrack = (trackId) => {
        setTrackUri("spotify:track:" + trackId);
        console.log("trackUri", trackUri);
    }

    // change currently playing session when each session is clicked
    const changeCurrentSession = (session) => {
        setCurrentSession(session);
        setTrack(session.playlist[0].trackId);
    }

    // get top six sessions from database
    // use simple dummy data for now
    const sampleUserId = 'dummy_id';
    const sampleTrackId = '5hVghJ4KaYES3BFUATCYn0';
    const session = {
        host: {
            userId: sampleUserId
        },
        playlist: [
            {
                trackId: sampleTrackId
            },
            {
                trackId: sampleTrackId
            },
        ],
        listeners: [
            {
                userId: sampleUserId
            },
            {
                userId: sampleUserId
            },
        ]
    }
    return (
        <>
        <div className="Radio">
            <button onClick={() => changeCurrentSession(session)}>
                <Bubble session={session} id='1'/>
            </button>
            <Bubble session={session} id='2' onClick={() => setTrack(session.playlist[0].trackId)}/>
            <Bubble session={session} id='3' onClick={() => setTrack(session.playlist[0].trackId)}/>
            <Bubble session={session} id='4' onClick={() => setTrack(session.playlist[0].trackId)}/>
            <Bubble session={session} id='5' onClick={() => setTrack(session.playlist[0].trackId)}/>
            <Bubble session={session} id='6' onClick={() => setTrack(session.playlist[0].trackId)}/>

            <div className="Player-Container">
                <SpotPlayer accessToken={accessToken} trackUri={trackUri} />
            </div>
            <NavBar/>
        </div>
        </>
    );
}

export default Radio