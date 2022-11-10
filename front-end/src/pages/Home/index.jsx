import NavBar from '../../components/NavBar/NavBar';
import Albums from '../../components/Albums/Albums';
import SearchBar from '../../components/SearchBar/SearchBar';
import placeHolder from '../../img/album.jpeg';
import './index.css'
import RadioMatch from '../../components/RadioMatch';
import React, {useEffect,useState} from 'react';
import axios from 'axios';

function Home() {

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
        <Albums text={"Recently Played"} image={placeHolder}/>
        <Albums text={"Recommendations Based on Your Taste"} image1={recs[0]} image2={recs[1]} image3={recs[2]}/>
      </div>
      <NavBar /> 
    </div>
  );
}

export default Home;