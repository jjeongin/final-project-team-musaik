import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {useEffect, useState} from 'react'
import CurrentStation from './pages/CurrentStation';
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Radio from './pages/RadioBubbles'
import RadioBubbles from './pages/Radio'
import Search from './pages/Search'
import './App.css'
import img from './img/album.jpeg'
// import Player from './pages/Player';
import axios from 'axios';
import WebPlayback from './pages/WebPlayback';

const App = props => {

  

  
  return (
    <Router>
      <Routes>
        {/* a route for the home page */}
        <Route path="/" element={<Login />} />

        <Route path="/home" element={<Home />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/radio-bubbles" element={<RadioBubbles />} />
        
        <Route path="/web-playback" element={<WebPlayback />} />

        {/* <Route path="/search" element={<Search />} /> */}
      </Routes>
    </Router>
  );
}

export default App

