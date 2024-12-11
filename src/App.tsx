import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Article from './pages/Article';
import Auth from './pages/admin/Auth';
import { AdminSection } from './pages/admin/Admin';
import ArticleDetail from './pages/admin/ArticleDetail';
import NotFound from './pages/NotFound';

function App() {

  return (
    <Router>
      <MainRoutes />
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
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="*" element={<NotFound />} />

          {/* ADMINISTRATOR */}
          <Route path="/login" element={<Auth />} />
          <Route path="/admin" element={<AdminSection />} />

        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  )
}
