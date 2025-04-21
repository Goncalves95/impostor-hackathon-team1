import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Navbar.css';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Verificar se o link está ativo
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Efeito para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img
            src="images/site/logo.png"
            alt="LevelUpHub Logo"
            className="logo-image"
          />
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? '✕' : '☰'}
        </div>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Home
          </Link>

          <Link to="/about"
            className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            About
          </Link>

          {currentUser ? (
            <>
              <Link to="/dashboard"
                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Dashboard
              </Link>

              <Link to="/builder"
                className={`nav-link ${isActive('/builder') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Create Portfolio
              </Link>

              <Link to="/preview"
                className={`nav-link ${isActive('/preview') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Preview
              </Link>

              <button className="nav-button" onClick={() => {
                handleLogout();
                closeMenu();
              }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login"
                className={`nav-link ${isActive('/login') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Login
              </Link>

              <button
                className="nav-button primary"
                onClick={() => {
                  navigate('/register');
                  closeMenu();
                }}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;