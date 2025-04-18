import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';

// Componentes
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from '../../site/frontend/src/components/login-sign/Login';
import Register from '../../site/frontend/src/components/login-sign/Register';
import Dashboard from '../../site/frontend/src/pages/Dashboard';
import Builder from './pages/Builder';
import Preview from './pages/Preview';
import GithubCallback from './components/github/GithubCallback';
import PrivateRoute from '../../site/frontend/src/components/common/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/github/callback" element={<GithubCallback />} />
            
            {/* Rotas protegidas */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/builder" element={<Builder />} />
              <Route path="/builder/:id" element={<Builder />} />
              <Route path="/preview" element={<Preview />} />
              <Route path="/preview/:id" element={<Preview />} />
            </Route>
          </Routes>
        </Router>
      </PortfolioProvider>
    </AuthProvider>
  );
}

export default App;