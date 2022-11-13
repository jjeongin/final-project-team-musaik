import React, { Component } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Albums from '../../components/Albums/Albums';
import SearchBar from '../../components/SearchBar/SearchBar';
import placeHolder from '../../img/album.jpeg';
import './index.css'
import RadioMatch from '../../components/RadioMatch';
import {useEffect,useState} from 'react';
import axios from 'axios';

function Home() {

  const [recs, setRecs] = useState([]);
  const [lists, setLists] = useState([]);



  useEffect(() => {
    axios.get('/playlists/pin-playlists')
      .then(res => {
        console.log(res.data.playlists);
        setLists([...lists,...res.data.playlists]);
      })
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/api/rec')
        .then(res => {
          console.log(res.data)
          setRecs([...recs,...res.data])
        });
}, []);


// {unreadMessages.length > 0 &&        <h2>          You have {unreadMessages.length} unread messages.        </h2>      }



  return (
    <div className="Home">
      <SearchBar />
      <div className="home-content">
        <RadioMatch img1={placeHolder} img2={placeHolder} />
        <Albums text={"Playlists"} image1={lists[1]}  image2={lists[0]} image3={lists[2]}/>
        <Albums text={"Recommendations Based on Your Taste"} image1={recs[4]}  image2={recs[0]} image3={recs[2]}/>
      </div>
      <NavBar /> 
    </div>
  );
}

export default Home;