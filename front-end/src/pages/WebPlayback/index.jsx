import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

function WebPlayback() {

    const [user, setUser] = useState(null);
    const [player, setPlayer] = useState(null);


    useEffect(() => {
        if (!user) {
            axios.get('/user').then((res) => {
                setUser(res.data.user);
            });
        }
    }, []);


    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [current_track, setTrack] = useState(track);

    useEffect(() => {
        if (user) {

            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;

            document.body.appendChild(script);

            window.onSpotifyWebPlaybackSDKReady = () => {

                const player = new window.Spotify.Player({
                    name: 'Musaik Player',
                    getOAuthToken: cb => { cb(user.access_token); },
                    volume: 0.5
                });

                setPlayer(player);

                player.addListener('ready', ({ device_id }) => {
                    console.log('Ready with Device ID', device_id);
                });
                
                player.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id);
                });

                player.addListener('player_state_changed', ( state => {

                    if (!state) {
                        return;
                    }
                    setTrack(state.track_window.current_track);
                    
                    axios.post('/changeSong', {
                        song: state.track_window.current_track
                    }).then((res) => {
                        console.log(res);
                    });


                    setPaused(state.paused);
                    player.getCurrentState().then( state => { 
                        (!state)? setActive(false) : setActive(true) 
                    }); 

                }));

                player.connect();
            };
        }
    }, []);


    const track = {
        name: "",
        album: {
            images: [{ url: "" }]
        },
        artists: [{ name: "" }]
    }



   return (
      <>
        <div className="container">
            <div className="main-wrapper">
                <img src={current_track.album.images[0].url} className="now-playing__cover" alt="" />
                <div className="now-playing__side">
                    <div className="now-playing__name">{current_track.name}</div>
                    <div className="now-playing__artist">{current_track.artists[0].name}</div>
                </div>
                <button className="btn-spotify" onClick={() => { player.previousTrack() }} >&lt;&lt;</button>
                <button className="btn-spotify" onClick={() => { player.togglePlay() }} >{ is_paused ? "PLAY" : "PAUSE" }</button>
                <button className="btn-spotify" onClick={() => { player.nextTrack() }} >&gt;&gt;</button>
             </div>
        </div>
      </>
    );
}

export default WebPlayback
