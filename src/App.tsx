import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Article from './pages/Article';
import Auth from './pages/admin/Auth';
import DashboardAdmin from './pages/admin/Dashboard';

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

          <Route path="/login" element={<Auth />} />
          <Route path="/admin" element={<DashboardAdmin />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  )
}
