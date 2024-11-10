import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Article from './pages/Article';

function App() {

  return (
    <Router>
      <MainRoutes/>
    </Router>
  )
}

export default App


const MainRoutes = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/article" element={<Article />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  )
}
