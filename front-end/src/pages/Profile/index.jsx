import Albums from '../../Albums';
import UserAvatar from '../../UserAvatar';
import UserNumbers from '../../UserNumbers'
import './styles.css'
import SearchBar from '../../SearchBar';
import NavBar from '../../NavBar';

function Profile() {
  return (
    <div className="Profile">
        <UserAvatar text={"Ahmahcs"} />
        <UserNumbers followers={300} following={200}/>

        <div className='Album-Card'>
          <Albums text={"Favorites"}/>
          <Albums text={"Recently Played"}/>
        </div>
        <SearchBar />
       <NavBar />

    </div>
  );
}

export default Profile;