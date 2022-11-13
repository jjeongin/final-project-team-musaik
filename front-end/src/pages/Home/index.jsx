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
  // get recently played songs
  const [songs, setSongs] = useState([]);
  useEffect(() => {
      axios.get('http://localhost:8080/api/get_saved')
          .then(res => {
            console.log(res.data)
            setSongs([...songs,...res.data])
          });
  }, []);
  // get recommendations
  const [recs, setRecs] = useState([]);
  useEffect(() => {
      axios.get('http://localhost:8080/api/rec')
          .then(res => {
            console.log(res.data)
            setRecs([...recs,...res.data])
          });
  }, []);
  return (
    <div className="Home">
      <SearchBar />
      <div className="home-content">
        <RadioMatch img1={placeHolder} img2={placeHolder} />
        <Albums text={"Recently Played Sessions"} image1={songs[1]} image2={songs[2]} image3={songs[0]}/>
        <Albums text={"Recommendations Based on Your Taste"} image1={recs[4]}  image2={recs[0]} image3={recs[2]}/>
      </div>
      <NavBar /> 
    </div>
  );
}

export default Home;