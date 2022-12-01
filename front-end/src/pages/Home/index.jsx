import React, { Component } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Albums from '../../components/Albums/Albums';
import SearchBar from '../../components/SearchBar/SearchBar';
import placeHolder from '../../img/album.jpeg';
import './index.css'
import RadioMatch from '../../components/RadioMatch';
import {useEffect,useState} from 'react';
import axios from 'axios';
import SpotPlayer from '../../components/SpotPlayer';


function Home() {
  // get recently played songs
  const [songs, setSongs] = useState([]);
  useEffect(() => {
      axios.get('http://localhost:8080/api/get_saved')
          .then(res => {
            setSongs([...songs,...res.data])
          });
  }, []);
  // get recommendations
  const [recs, setRecs] = useState([]);
  const [lists, setLists] = useState([]);
  // get playlists
  useEffect(() => {
    axios.get('/playlists/pin-playlists')
      .then(res => {
        setLists([...lists,...res.data.playlists]);
      })
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/api/rec')
        .then(res => {
          setRecs([...recs,...res.data])
        });
}, []);


const getUser = async () => {
  const user = await axios.get('/user');
  return user.data;
};

const [user, setUser] = useState(null);
const [accessToken, setAccessToken] = useState(null);
const [trackUri, setTrackUri] = useState("spotify:track:4iV5W9uYEdYUVa79Axb7Rh"); // default track
const [currentSession, setCurrentSession] = useState(null); // currently joined session
const [sessions, setSessions] = useState([]); // top sessions in bubbles

const [playlists, setPlaylists] = useState([]);
const [open, setOpen] = useState(false);

useEffect(() => {
  getUser().then((user) => {
      setUser(user);
      setAccessToken(user.access_token);
  });
}, []);

// set the track to play
const setTrack = (trackId) => {
  setTrackUri("spotify:track:" + trackId);
}

const setPlaylingList = (playlistId) => {
  setOpen(!open);
  setTrackUri("spotify:playlist:" + playlistId);
  axios.post('/sessions/create-session', {
      playlistId: playlistId,
  }).then((res) => {
      setCurrentSession(res.data);
  });
}

// change currently playing session when each session is clicked
const changeCurrentSession = (session) => {
  setCurrentSession(session);
  setTrack(session.playlist[0]);
}

//open dropdown
const openDropdown = () => {
  setOpen(!open);
  console.log(playlists);
}

// get top sessions
useEffect(() => {
  axios.get('/sessions/top-sessions')
      .then(res => {
          setSessions(res.data.sessions);
      });
}, []);

// get user's playlists
useEffect(() => {
  axios.get('/sessions/playlist-search')
      .then(res => {
          const resLists = res.data;
          setPlaylists(resLists);
      });
}, []);


// {unreadMessages.length > 0 &&        <h2>          You have {unreadMessages.length} unread messages.        </h2>      }

  return (
    <><div className="Home">
      <SearchBar />
      <div className="home-content">
        <RadioMatch img1={placeHolder} img2={placeHolder} />
        <Albums text={"Playlists"} image1={lists[1]} image2={lists[0]} image3={lists[2]} />
        <Albums text={"Recommendations Based on Your Taste"} image1={recs[4]} image2={recs[0]} image3={recs[2]} />
      </div>

      <div className="Player-Container">
            <SpotPlayer accessToken={accessToken} trackUri={trackUri} />
        </div>

    </div><NavBar /></> 
  );
}

export default Home;