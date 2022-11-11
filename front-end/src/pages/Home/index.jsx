import NavBar from '../../components/NavBar/NavBar';
import Albums from '../../components/Albums/Albums';
import SearchBar from '../../components/SearchBar/SearchBar';
import placeHolder from '../../img/album.jpeg';
import './index.css'
import RadioMatch from '../../components/RadioMatch';

function Home() {

  return (
    <div className="Home">
      <SearchBar />
      <div className="home-content">
        <RadioMatch img1={placeHolder} img2={placeHolder} />
        <Albums text={"Recently Played"} image={placeHolder}/>
        <Albums text={"Favorites"} image={placeHolder}/>
      </div>
      <NavBar /> 
    </div>
  );
}

export default Home;