import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

const App = props => {
  return (
    <div>
      <Router>
        <Header />
        <main>
          <Routes>
      
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

export default App

