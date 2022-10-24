import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Radio from './pages/Radio/Radio'
import Search from './pages/Search'

function App() {
  return (
    <Router>
      <Routes>
        {/* a route for the home page */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/radio" element={<Radio />} />

        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
