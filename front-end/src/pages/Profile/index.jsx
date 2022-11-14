import Albums from '../../components/Albums/Albums';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import UserNumbers from '../../components/UserNumber/UserNumbers'
import './styles.css'
import SearchBar from '../../components/SearchBar/SearchBar';
import NavBar from '../../components/NavBar/NavBar';
import avi from "../../img/avi.png";
import placeHolder from '../../img/album.jpeg'
import React, {useEffect,useState} from 'react';
import axios from 'axios';

import FavArtists from '../../components/Albums/FavArtists';

function Profile() {
  // get recently played songs
  const [songs, setSongs] = useState([]);
  useEffect(() => {
      axios.get('http://localhost:8080/api/get_saved')
          .then(res => {
            setSongs([...songs,...res.data])
          });
  }, []);
  // get user name
  const [user, setUser] = useState([]);
  useEffect(() => {
      axios.get('http://localhost:8080/api/user_info')
          .then(res => {
            setUser([user,[res.data['display_name']]])
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


  return (
    <div className="Profile">
      <SearchBar />
        <UserAvatar text={user[1]} image={profile[1]} />
        <UserNumbers followers={followers[1]} following={followers[1]}/>

        <div className='Album-Card'>
          <FavArtists text={"Favorite Artists"} image={placeHolder} label = {''}/>
          <Albums text={"Recently Played"} image1={songs[1]} image2={songs[2]} image3={songs[0]}/>
        </div>
       <NavBar />
    </div>
  );
}

export default Profile;