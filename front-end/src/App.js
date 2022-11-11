import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import RadioBubbles from './pages/Radio'
import Search from './pages/Search'
import './App.css'

const App = props => {

  

  
  return (
    <Router>
      <Routes>
        {/* a route for the home page */}
        <Route path="/" element={<Login />} />

        <Route path="/home" element={<Home />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/radio-bubbles" element={<RadioBubbles />} />

        {/* <Route path="/search" element={<Search />} /> */}
      </Routes>
    </Router>
  );
}

export default App

