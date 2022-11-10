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

  const [songs, setSongs] = useState([]);



  useEffect(() => {
    axios.get('http://localhost:8080/api/get_saved')
        .then(res => {
          console.log(res.data)
          setSongs([...songs,...res.data])
        });
}, []);






//   const [artists, setArtists] = useState([]);



//   useEffect(() => {
//     axios.get('http://localhost:8080/api/profile')
//         .then(res => {
//           console.log(res.data)
//           setArtists([...artists,...res.data])
//         });
// }, []);

const [user, setUser] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:8080/api/user_info')
        .then(res => {
          console.log(res.data['country'])
          setUser([user,[res.data['display_name']]])
        });
}, []);

const [followers, setFollowers] = useState([]);



  useEffect(() => {
    axios.get('http://localhost:8080/api/user_info')
        .then(res => {
          console.log(res.data['country'])
          setFollowers([followers,res.data['followers']['total']])
        });
}, []);


const [profile, setProfile] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8080/api/user_info')
        .then(res => {
          console.log(res.data['country'])
          setProfile([profile,res.data['images'][0]['url']])
        });
}, []);


useEffect(() => {

  console.log("Changed artists: ", profile)

}, [profile])


  return (
    <div className="Profile">
      <SearchBar />
        <UserAvatar text={user[1]} image={profile[1]} />
        <UserNumbers followers={followers[1]} following={followers[1]}/>

        <div className='Album-Card'>
          <FavArtists text={"Favorite Artists"} image={placeHolder} label = {''}/>
          <Albums text={"Recently Played"} image={placeHolder}/>
        </div>
       <NavBar />
    </div>
  );
}

export default Profile;