import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Radio from './pages/Radio'
import Search from './pages/Search'
import './App.css'

const App = props => {
  return (
    <div>
      <Router>
        <main>
          <Routes>
            {/* a route for each page */}
            <Route path="/" element={<Home />} />

            <Route path="/log-in" element={<Login />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/radio" element={<Radio />} />

            <Route path="/search" element={<Search />} />
          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App

