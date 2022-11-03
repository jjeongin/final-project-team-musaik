import './index.css'
import logo from '../../img/musaik-logo-new.svg'
import spotify from '../../img/spotify-icon.png'

function Login() {
  
  const SpotifyLogin = () => {
        window.open('/auth', '_self');
    }

  return (
    <div className="Login">
      <img className="musaik-logo" src={logo} alt="Musaik Logo"/>
      <div className='login-spotify' onClick={SpotifyLogin}>
        <img src={spotify} alt="Spotify Icon"/>
        <p>Continue with Spotify</p>
      </div>
    </div>
  );
}

export default Login;