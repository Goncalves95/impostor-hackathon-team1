import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-info">
          <p className="footer-copyright">
            © {currentYear} Level Up Hub. All rights reserved.
          </p>
          <p className="footer-team">
            Developed with ❤️ by the Hackathon team 1
          </p>
        </div>
        
        <div className="footer-links">
          <Link to="/about" className="footer-link">
            <span>👥</span> About Us
          </Link>
          <Link to="/dashboard" className="footer-link">
            <span>📊</span> Dashboard
          </Link>
          <Link to="/builder" className="footer-button">
            Create Portfolio
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;