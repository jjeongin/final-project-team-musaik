import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CurrentStation from './pages/CurrentStation/CurrentStation';
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Radio from './pages/RadioBubbles'
import RadioBubbles from './pages/Radio'
import Search from './pages/Search'
import './App.css'
import img from './img/album.jpeg'

const App = props => {
  return (
    <Router>
      <Routes>
        {/* a route for the home page */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/radio" element={<Radio />} />

        <Route path="/radio-bubbles" element={<RadioBubbles />} />

        <Route path="/currentStation" element={<CurrentStation />} />

        {/* <Route path="/search" element={<Search />} /> */}
      </Routes>
    </Router>
  );
}

export default App

