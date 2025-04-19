import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { usePortfolio } from '../context/PortfolioContext';
import axios from 'axios';
import '../styles/Dashboard.css';

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const { portfolioData } = usePortfolio();
  const [savedPortfolios, setSavedPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const mockPortfolios = [
          {
            id: 1,
            title: "Professional Web Developer Portfolio",
            thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
            created_at: "2024-04-15T10:30:00Z",
            views: 145,
            shares: 12
          },
          {
            id: 2,
            title: "UX/UI Design Showcase",
            thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
            created_at: "2024-04-10T14:20:00Z",
            views: 89,
            shares: 5
          },
          {
            id: 3,
            title: "Mobile App Development Portfolio",
            thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
            created_at: "2024-03-25T09:15:00Z",
            views: 210,
            shares: 18
          }
        ];
        
        setTimeout(() => {
          setSavedPortfolios(mockPortfolios);
          setLoading(false);
        }, 800);
        
      } catch (err) {
        console.error('Error fetching portfolios:', err);
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleCreatePortfolio = () => {
    navigate('/builder');
  };

  const handleViewPortfolio = (id) => {
    navigate(`/preview/${id}`);
  };

  const handleEditPortfolio = (id) => {
    navigate(`/builder/${id}`);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to toggle between grid and list view
  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-pulse"></div>
        <p>Loading your portfolios...</p>
      </div>
    );
  }

  // Calculate stats for dashboard display
  const totalViews = savedPortfolios.reduce((sum, portfolio) => sum + (portfolio.views || 0), 0);
  const totalShares = savedPortfolios.reduce((sum, portfolio) => sum + (portfolio.shares || 0), 0);

  return (
    <div className="dashboard-container">
      {/* Background elements */}
      <div className="dashboard-bg-elements">
        <div className="dashboard-bg-circle circle-1"></div>
        <div className="dashboard-bg-circle circle-2"></div>
        <div className="dashboard-bg-line"></div>
      </div>
      
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Your Portfolio Dashboard</h1>
          <p className="header-subtitle">
            Track your progress and showcase your achievements
          </p>
        </div>
        
        <div className="header-actions">
          <motion.button 
            className="primary-button"
            onClick={handleCreatePortfolio}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="button-icon">➕</span>
            Create New Portfolio
          </motion.button>
          
          <motion.button 
            className="secondary-button"
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>
        </div>
      </div>

      <motion.div 
        className="dashboard-welcome-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="welcome-content">
          <div className="welcome-text">
            <h2>Welcome back, {currentUser?.username || 'User'}!</h2>
            <p className="welcome-message">
              Today is a great day to update your portfolio and showcase your accomplishments.
              Remember, your work is valuable and deserves to be seen.
            </p>
            
            <div className="impostor-quote">
              <p>"Don't let impostor syndrome hold you back. Your skills are real, your achievements matter."</p>
            </div>
          </div>
          
          <div className="profile-preview">
            <div className="profile-image">
              {/* This would be the user's profile image, using a fallback for now */}
              <span className="profile-initial">{(currentUser?.username || 'U')[0].toUpperCase()}</span>
            </div>
            <div className="profile-stats">
              <div className="stat-card">
                <div className="stat-value">{savedPortfolios.length}</div>
                <div className="stat-label">Portfolios</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-value">{totalViews}</div>
                <div className="stat-label">Views</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-value">{totalShares}</div>
                <div className="stat-label">Shares</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="dashboard-portfolios-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="portfolios-header">
          <h2>Your Portfolios</h2>
          <div className="view-toggle">
            <button 
              className={`toggle-button ${viewMode === 'grid' ? 'active' : ''}`} 
              onClick={() => setViewMode('grid')}
            >
              🔲 Grid
            </button>
            <button 
              className={`toggle-button ${viewMode === 'list' ? 'active' : ''}`} 
              onClick={() => setViewMode('list')}
            >
              📋 List
            </button>
          </div>
        </div>

        {savedPortfolios.length === 0 ? (
          <motion.div 
            className="empty-state"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="empty-icon">📂</div>
            <h3>No portfolios yet</h3>
            <p>Create your first portfolio to showcase your skills and projects to the world.</p>
            <motion.button 
              className="primary-button"
              onClick={handleCreatePortfolio}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            className={`portfolios-container ${viewMode}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {savedPortfolios.map((portfolio) => (
              <motion.div 
                key={portfolio.id} 
                className="portfolio-card"
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <div className="portfolio-thumbnail" style={{ backgroundImage: `url(${portfolio.thumbnail})` }}>
                  <div className="portfolio-overlay">
                    <div className="portfolio-date">Created: {formatDate(portfolio.created_at)}</div>
                    <div className="portfolio-metrics">
                      <span className="metric"><span className="metric-icon">👁️</span> {portfolio.views || 0}</span>
                      <span className="metric"><span className="metric-icon">🔗</span> {portfolio.shares || 0}</span>
                    </div>
                  </div>
                </div>
                
                <div className="portfolio-content">
                  <h3 className="portfolio-title">{portfolio.title}</h3>
                  
                  <div className="portfolio-actions">
                    <button 
                      className="action-button view-button" 
                      onClick={() => handleViewPortfolio(portfolio.id)}
                    >
                      Preview
                    </button>
                    <button 
                      className="action-button edit-button" 
                      onClick={() => handleEditPortfolio(portfolio.id)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      <motion.div 
        className="dashboard-tips-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2>Tips to Overcome Impostor Syndrome</h2>
        <div className="tips-container">
          <div className="tip-card">
            <div className="tip-icon">💡</div>
            <h3>Document Your Achievements</h3>
            <p>Keep a record of your accomplishments, big and small. Review them when self-doubt creeps in.</p>
          </div>
          
          <div className="tip-card">
            <div className="tip-icon">🗣️</div>
            <h3>Share Your Knowledge</h3>
            <p>Teaching others reinforces your expertise and helps you recognize how much you know.</p>
          </div>
          
          <div className="tip-card">
            <div className="tip-icon">🌱</div>
            <h3>Embrace Growth</h3>
            <p>View challenges as opportunities to learn, not tests that might expose inadequacy.</p>
          </div>
        </div>
      </motion.div>

      <div className="dashboard-footer">
        <p>Keep building, keep growing, keep showcasing your real potential.</p>
      </div>
    </div>
  );
}

export default Dashboard;