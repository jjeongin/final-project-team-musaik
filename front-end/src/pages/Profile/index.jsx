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

  useEffect( () => {
    fetchArtists();
  }, [])

  const [artists, setArtists] = useState([])

  const fetchArtists = async() =>{
    const data = await fetch('/');
    const artists = await data.json();
    setArtists(artists)
    console.log("lol")

  }

  return (
    <div className="Profile">
      <SearchBar />
        <UserAvatar text={"Ahmahcs"} image={avi} />
        <UserNumbers followers={300} following={200}/>

        <div className='Album-Card'>
          <Albums text={artists[0]} image={placeHolder}/>
          <Albums text={"Recently Played"} image={placeHolder}/>
        </div>
       <NavBar />

    </div>
  );
}

export default Profile;