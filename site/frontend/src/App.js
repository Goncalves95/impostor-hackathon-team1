import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';

// Componentes
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from '../src/components/login-sign/Login';
import Register from '../src/components/login-sign/Register';
import Dashboard from '../src/pages/Dashboard';
import Builder from './pages/Builder';
import Preview from './pages/Preview';
import AboutPage from './pages/About';
import GithubCallback from './components/github/GithubCallback';
import PrivateRoute from '../src/components/common/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <Router>
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/github/callback" element={<GithubCallback />} />
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/builder" element={<Builder />} />
                <Route path="/builder/:id" element={<Builder />} />
                <Route path="/preview" element={<Preview />} />
                <Route path="/preview/:id" element={<Preview />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </Router>
      </PortfolioProvider>
    </AuthProvider>
  );
}

export default App;