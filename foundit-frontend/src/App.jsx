import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import ReportItem from './pages/ReportItem';
import BrowseItems from './pages/BrowseItems';
import Landing from './pages/Landing';
import Register from './pages/Register';
import SignOut from './pages/SignOut';
import NotFound from './pages/NotFound';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  useEffect(() => {
    // Keep state in sync with localStorage for simple persistence
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signed-out" element={<SignOut />} />

        {/* Protected Routes Wrapper */}
        <Route path="/" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
          <Route index element={<Dashboard />} />
          <Route path="report-lost" element={<ReportItem type="lost" />} />
          <Route path="report-found" element={<ReportItem type="found" />} />
          <Route path="browse" element={<BrowseItems />} />
          <Route path="claims" element={<div>My Claims Placeholder</div>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
