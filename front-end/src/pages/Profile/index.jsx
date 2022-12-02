import Albums from '../../components/Albums/Albums';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import UserNumbers from '../../components/UserNumber/UserNumbers'
import './styles.css'
import NavBar from '../../components/NavBar/NavBar';
import avi from "../../img/avi.png";
import placeHolder from '../../img/album.jpeg'
import React, {useEffect,useState} from 'react';
import axios from 'axios';
import SpotPlayer from '../../components/SpotPlayer';


import FavArtists from '../../components/Albums/FavArtists';

function Profile() {

  // get Searched songs
  const [search, setSearch] = useState([]);
  useEffect(() => {
      axios.get('http://localhost:8080/api/getSearch')
          .then(res => {
            setSearch([...search,...res.data])
          });
  }, []);
  // get recently played songs
  const [songs, setSongs] = useState([]);
  useEffect(() => {
      axios.get('http://localhost:8080/api/get_saved')
          .then(res => {
            setSongs([...songs,...res.data])
          });
  }, []);
  // get user name
  const [user1, setUser1] = useState([]);
  useEffect(() => {
      axios.get('http://localhost:8080/api/user_info')
          .then(res => {
            setUser1([user1,[res.data['display_name']]])
          });
  }, []);
  // get user follower info
  const [followers, setFollowers] = useState([]);
  useEffect(() => {
      axios.get('http://localhost:8080/api/user_info')
          .then(res => {
            setFollowers([followers,res.data['followers']['total']])
          });
  }, []);
  // get user profile image
  const [profile, setProfile] = useState([]);
    useEffect(() => {
      axios.get('http://localhost:8080/api/user_info')
          .then(res => {
            setProfile([profile,res.data['images'][0]['url']])
          });
  }, []);

  useEffect(() => {
  }, [profile])


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



// change currently playing session when each session is clicked
const changeCurrentSession = (session) => {
    setCurrentSession(session);
    setTrack(session.playlist[0]);
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


  


  return (
    <div className="Profile">
        <UserAvatar text={user1[1]} image={profile[1]} />
        <UserNumbers followers={followers[1]} following={followers[1]}/>

        <div className='Album-Card'>
          <FavArtists text={"Favorite Artists"} image={placeHolder} label = {''}/>
          <Albums text={"Recently Played"} image1={songs[1]} image2={songs[2]} image3={songs[0]}/>
        </div>
        <div className="Player-Container">
            <SpotPlayer accessToken={accessToken} trackUri={trackUri} />
        </div>
       <NavBar />
    </div>
  );
}

export default Profile;