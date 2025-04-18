import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Preview from './pages/Preview';
import Dashboard from './pages/Dashboard';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { PortfolioProvider } from './context/PortfolioContext';
import GithubCallback from './components/github/GithubCallback';
import './styles/global.css';

function App() {
  return (
    <PortfolioProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/github/callback" element={<GithubCallback />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </PortfolioProvider>
  );
}

export default App;