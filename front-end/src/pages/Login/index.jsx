import './index.css'
import logo from '../../img/musaik-logo-new.svg'
import spotify from '../../img/spotify-icon.png'
import apple from '../../img/apple-music-icon.svg'

function Login() {
  return (
    <div className="Login">
      <img src={logo} alt="Musaik Logo"/>
      <div className='login-social'>
        <div className='login-spotify'>
          <img src={spotify} alt="Spotify Icon"/>
          <p>Continue with Spotify</p>
        </div>
        <div className='login-apple-music'>
          <img src={apple} alt="Apple Music Icon"/>
          <p>Continue with Apple Music</p>
        </div>
      </div>
    </div>
  );
}

export default Login;