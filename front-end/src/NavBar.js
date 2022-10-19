import './NavBar.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import home from './img/home.svg'
import radio from './img/radio.svg'
import user from './img/user.svg'

function NavBar() {
    return (
			<Router>
				<nav className="NavBar">
					<ul className="nav-links">
						<li className="nav-item">
							<Link to="/" className="home-icon">
								<img src={home} alt="Home Icon"/>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/radio" className="radio-icon">
								<img src={radio} alt="Radio Icon"/>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/user" className="user-icon">
								<img src={user} alt="User Icon"/>
							</Link>
						</li>
					</ul>
				</nav>
			</Router>
    );
  }
  
  export default NavBar;