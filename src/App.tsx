import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Article from './pages/Article';
import Auth from './pages/admin/Auth';
import { AdminSection } from './pages/admin/Admin';

function App() {

  return (
    <Router>
      <MainRoutes />
    </Router>
  )
}

export default App


const MainRoutes = () => {
  const [name, setName] = useState<string>('');
  // const [showCountdown, setShowCountdown] = useState<boolean>(false);

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath === '/admin') {
      fetchName();
    }
  }, []);

  const fetchName = () => {
    const token = document.cookie
      .split(';')
      .map(cookie => cookie.split('='))
      .find(cookie => cookie[0].trim() === 'jwt')?.[1];

    axios.get('http://localhost:3000/api/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setName(response.data);
      })
      // .catch(() => {
      //   setShowCountdown(true);
      // });
  };

  return (
    <div>
      <Navbar setCurrentName={() => name} />
      <div className="container mx-auto mt-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/article" element={<Article />} />
          {/* <Route path="/article/:id" element={<ArticleDetail />} /> */}

          {/* ADMINISTRATOR */}
          <Route path="/login" element={<Auth />} />
          <Route path="/admin" element={<AdminSection />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  )
}
