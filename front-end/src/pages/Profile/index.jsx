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



function Profile() {

  const [songs, setSongs] = useState([]);



  useEffect(() => {
    axios.get('http://localhost:8080/api/get_saved')
        .then(res => {
          console.log(res.data)
          setSongs([...songs,...res.data])
        });
}, []);

useEffect(() => {

  console.log("Recent Songs: ", songs)

}, [songs])




  const [artists, setArtists] = useState([]);



  useEffect(() => {
    axios.get('http://localhost:8080/api/profile')
        .then(res => {
          console.log(res.data)
          setArtists([...artists,...res.data])
        });
}, []);

useEffect(() => {

  console.log("Changed artists: ", artists)

}, [artists])



  return (
    <div className="Profile">
      <SearchBar />
        <UserAvatar text={"hh"} image={avi} />
        <UserNumbers followers={300} following={200}/>

        <div className='Album-Card'>
          <Albums text={"Favorites"} image1={artists[0]} image2={artists[1]} image3={artists[2]}/>
          <Albums text={"Recently Played"} image1={songs[0]} image2={songs[1]} image3={songs[2]}/>
        </div>
       <NavBar />
    </div>
  );
}

export default Profile;