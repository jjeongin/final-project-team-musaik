import Albums from '../../components/Albums/Albums';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import UserNumbers from '../../components/UserNumber/UserNumbers'
import './styles.css'
import SearchBar from '../../components/SearchBar/SearchBar';
import NavBar from '../../components/NavBar/NavBar';
import avi from "../../img/avi.png";
import placeHolder from '../../img/album.jpeg'


function Profile() {
  return (
    <div className="Profile">
      <SearchBar />
        <UserAvatar text={"Ahmahcs"} image={avi} />
        <UserNumbers followers={300} following={200}/>

        <div className='Album-Card'>
          <Albums text={"Favorites"} image={placeHolder}/>
          <Albums text={"Recently Played"} image={placeHolder}/>
        </div>
       <NavBar />

    </div>
  );
}

export default Profile;