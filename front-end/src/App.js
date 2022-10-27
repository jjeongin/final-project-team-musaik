import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Radio from './pages/Radio'

const App = props => {
  return (
    <div>
      <Router>
        <main>
          <Routes>
            <Route path="/radio" element={<Radio />} />
          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App

