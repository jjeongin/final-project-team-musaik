import './index.css'
import logo from '../../img/musaik-logo-new.svg'
import spotify from '../../img/spotify-icon.png'

function Login() {
  return (
    <div className="Login">
      <img className="musaik-logo" src={logo} alt="Musaik Logo"/>
      <div className='login-spotify'>
        <img src={spotify} alt="Spotify Icon"/>
        <p>Continue with Spotify</p>
      </div>
    </div>
  );
}

export default Login;