import './index.css'
import logo from '../../img/musaik-logo-new.svg'
import mainlogo from '../../img/logo.png'
import spotify from '../../img/spotify-icon.png'

function Login() {
  return (
    <div className="Login">
      <img className="musaik-logo" src={mainlogo} alt="Musaik Logo"/>
      <div className='login-spotify'>
        <img src={spotify} alt="Spotify Icon"/>
        <p>Continue with Spotify</p>
      </div>
    </div>
  );
}

export default Login;