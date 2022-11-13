import axios from 'axios'
import { useEffect, useState } from 'react';
import './index.css'

function Bubble({session, id}){
    /*
    session is a json containing info about each radio session
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
    */
    const current_track_id = session.playlist[0].track_id; // currently playing track of the session
    const host = session.host;
    const [current_track, setTrack] = useState(null); // get track info using spotify api
    useEffect(() => {
        axios.get('/api/track', { params: { track_id: current_track_id } }).then(res => {
            setTrack(res.data)
        });
    }, [current_track_id]);
    console.log(current_track)
    return (
        <div>
            {
                current_track != null 
                ? 
                <div>
                    {/* <p className='host'>{host}'s Session</p> */}
                    <p className='track_title'>{current_track['name']}</p>
                    <p className='track_artist'>{current_track['artists'][0]['name']}</p>
                    <img src={current_track['album']['images'][0]['url']} alt='Album Image' className={`bubble bubble-${id}`}/>
                </div>
                : <div/>
            }
        </div>
    );
}

export default Bubble