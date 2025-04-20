import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { useAuth } from '../context/AuthContext'; // Importe o contexto de autenticação
import BioSection from '../components/portfolio/BioSection';
import ProjectsSection from '../components/portfolio/ProjectSection';
import SkillsSection from '../components/portfolio/SkillsSection';
import '../styles/Preview.css';

function Preview() {
  const { portfolioData } = usePortfolio();
  const { currentUser } = useAuth(); // Obtenha o usuário atual
  const navigate = useNavigate();
  const [shareTooltip, setShareTooltip] = useState(false);
  const [activeTab, setActiveTab] = useState('bio');
  const [previewMode, setPreviewMode] = useState('desktop');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const tabContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const handleEdit = () => {
    navigate('/builder');
  };

  const handleShare = () => {
    setShareTooltip(true);
    setTimeout(() => setShareTooltip(false), 3000);
  };

  const copyLink = () => {
    // In a real app, this would be a unique link to the portfolio
    const username = portfolioData.bio.name || currentUser?.username || 'yourportfolio';
    navigator.clipboard.writeText(`https://leveluphub.com/portfolio/${username.toLowerCase().replace(' ', '')}`);
    alert('Portfolio link copied to clipboard!');
  };

  const changePreviewMode = (mode) => {
    setPreviewMode(mode);
  };

  // Usando dados do usuário de demonstração ou do portfolioData se existir
  const mergedPortfolioData = {
    bio: {
      // Se o bio do portfolioData existe e tem dados, use-os, caso contrário use valores padrão
      name: portfolioData.bio?.name || currentUser?.first_name + ' ' + currentUser?.last_name || "Alex Morgan",
      title: portfolioData.bio?.title || currentUser?.profile?.bio || "Full Stack Developer",
      location: portfolioData.bio?.location || "San Francisco, CA",
      about: portfolioData.bio?.about || currentUser?.profile?.bio || "Passionate developer with 5+ years of experience building web applications. Specialized in React, Node.js, and cloud infrastructure.",
      email: portfolioData.bio?.email || currentUser?.email || "alex@example.com",
      linkedin: portfolioData.bio?.linkedin || "linkedin.com/in/alexmorgan",
      github: portfolioData.bio?.github || currentUser?.username && `github.com/${currentUser.username}` || "github.com/alexmorgan",
      website: portfolioData.bio?.website || "alexmorgan.dev",
      avatar: portfolioData.bio?.avatar || currentUser?.profile?.avatar || "https://images.unsplash.com/photo-1561037404-61cd46aa615b?q=80&w=300&auto=format"
    },
    projects: portfolioData.projects.length > 0 ? portfolioData.projects : [
      {
        id: 1,
        title: "E-commerce Platform",
        description: "A full-featured online store with payment processing, inventory management, and admin dashboard.",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        link: "https://github.com/example/ecommerce"
      },
      {
        id: 2,
        title: "Task Management App",
        description: "A collaborative task management tool with real-time updates and team functionality.",
        technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
        image: "https://images.unsplash.com/photo-1611224885990-ab7363d7f2ed?q=80&w=2039&auto=format&fit=crop",
        link: "https://github.com/example/taskmanager"
      },
      {
        id: 3,
        title: "Weather Dashboard",
        description: "An interactive weather application with forecast data and location search.",
        technologies: ["React", "OpenWeather API", "Chart.js"],
        image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=2070&auto=format&fit=crop",
        link: "https://github.com/example/weather"
      }
    ],
    skills: portfolioData.skills.length > 0 ? portfolioData.skills : [
      { name: "JavaScript", level: 90 },
      { name: "React", level: 85 },
      { name: "Node.js", level: 80 },
      { name: "HTML/CSS", level: 90 },
      { name: "MongoDB", level: 75 },
      { name: "AWS", level: 70 },
      { name: "Docker", level: 65 },
      { name: "Git", level: 85 }
    ]
  };

  return (
    <div className="preview-container">
      {/* Background elements */}
      <div className="preview-bg-elements">
        <div className="preview-bg-circle circle-1"></div>
        <div className="preview-bg-circle circle-2"></div>
        <div className="preview-bg-grid"></div>
      </div>
      
      <div className="preview-content">
        <div className="preview-header">
          <div className="header-title">
            <h1>Portfolio Preview</h1>
            <p className="preview-subtitle">See how your portfolio will appear to visitors</p>
          </div>
          
          <div className="header-actions">
            <motion.button 
              className="preview-button edit-button"
              onClick={handleEdit}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✏️ Edit
            </motion.button>
            
            <div className="share-container">
              <motion.button 
                className="preview-button share-button"
                onClick={handleShare}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🔗 Share
              </motion.button>
              
              {shareTooltip && (
                <motion.div 
                  className="share-tooltip"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <p>Share your portfolio with others!</p>
                  <button className="tooltip-button" onClick={copyLink}>Copy Link</button>
                  <div className="tooltip-arrow"></div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
        
        <div className="device-preview-controls">
          <div className="device-selector">
            <button
              className={`device-button ${previewMode === 'mobile' ? 'active' : ''}`}
              onClick={() => changePreviewMode('mobile')}
            >
              📱 Mobile
            </button>
            <button
              className={`device-button ${previewMode === 'tablet' ? 'active' : ''}`}
              onClick={() => changePreviewMode('tablet')}
            >
              📔 Tablet
            </button>
            <button
              className={`device-button ${previewMode === 'desktop' ? 'active' : ''}`}
              onClick={() => changePreviewMode('desktop')}
            >
              🖥️ Desktop
            </button>
          </div>
          
          <div className="confidence-message">
            <p>Your portfolio looks professional! Ready to share your achievements with the world.</p>
          </div>
        </div>
        
        <motion.div 
          className={`portfolio-device-frame ${previewMode}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="device-frame-header">
            <div className="browser-controls">
              <span className="browser-dot red"></span>
              <span className="browser-dot yellow"></span>
              <span className="browser-dot green"></span>
            </div>
            <div className="browser-address">
              <span>portfolio.leveluphub.com/{mergedPortfolioData.bio.name.toLowerCase().replace(' ', '')}</span>
            </div>
          </div>
          
          <div className="portfolio-content-wrapper">
            <div className="portfolio-tabs">
              <button 
                className={`portfolio-tab ${activeTab === 'bio' ? 'active' : ''}`}
                onClick={() => setActiveTab('bio')}
              >
                About Me
              </button>
              <button 
                className={`portfolio-tab ${activeTab === 'projects' ? 'active' : ''}`}
                onClick={() => setActiveTab('projects')}
              >
                Projects
              </button>
              <button 
                className={`portfolio-tab ${activeTab === 'skills' ? 'active' : ''}`}
                onClick={() => setActiveTab('skills')}
              >
                Skills
              </button>
              <button 
                className={`portfolio-tab ${activeTab === 'contact' ? 'active' : ''}`}
                onClick={() => setActiveTab('contact')}
              >
                Contact
              </button>
            </div>
            
            <motion.div 
              className="portfolio-tab-content"
              key={activeTab}
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {activeTab === 'bio' && (
                <div className="tab-bio">
                  <div className="bio-header">
                    <div className="bio-avatar">
                      <img 
                        src={mergedPortfolioData.bio.avatar} 
                        alt={mergedPortfolioData.bio.name} 
                        onError={(e) => {
                          // Se a imagem falhar, use uma imagem de fallback
                          e.target.src = "https://images.unsplash.com/photo-1561037404-61cd46aa615b?q=80&w=300&auto=format";
                        }}
                      />
                    </div>
                    <div className="bio-intro">
                      <h1>{mergedPortfolioData.bio.name}</h1>
                      <h2>{mergedPortfolioData.bio.title}</h2>
                      <p className="bio-location">📍 {mergedPortfolioData.bio.location}</p>
                    </div>
                  </div>
                  
                  <div className="bio-about">
                    <h3>About Me</h3>
                    <p>{mergedPortfolioData.bio.about}</p>
                    
                    <div className="bio-highlight">
                      <p>I specialize in creating user-friendly web applications that solve real-world problems. My background in both frontend and backend development allows me to build complete solutions with clean code and intuitive designs.</p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'projects' && (
                <div className="tab-projects">
                  <h3>My Projects</h3>
                  <div className="projects-grid">
                    {mergedPortfolioData.projects.map(project => (
                      <div className="project-card" key={project.id}>
                        <div className="project-image" style={{backgroundImage: `url(${project.image})`}}>
                          <div className="project-overlay">
                            <a href={project.link} className="project-link"  rel="noreferrer">View Project</a>
                          </div>
                        </div>
                        <div className="project-details">
                          <h4>{project.title}</h4>
                          <p>{project.description}</p>
                          <div className="project-tech">
                            {project.technologies.map((tech, index) => (
                              <span className="tech-tag" key={index}>{tech}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'skills' && (
                <div className="tab-skills">
                  <h3>Technical Skills</h3>
                  <div className="skills-container">
                    {mergedPortfolioData.skills.map((skill, index) => (
                      <div className="skill-item" key={index}>
                        <div className="skill-info">
                          <span className="skill-name">{skill.name}</span>
                          <span className="skill-level">{skill.level}%</span>
                        </div>
                        <div className="skill-bar">
                          <div 
                            className="skill-progress"
                            style={{width: `${skill.level}%`}}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="skills-message">
                    <h4>Always Learning</h4>
                    <p>Continuously improving my skills and exploring new technologies to stay current in the fast-evolving tech landscape.</p>
                  </div>
                </div>
              )}
              
              {activeTab === 'contact' && (
                <div className="tab-contact">
                  <h3>Get In Touch</h3>
                  <div className="contact-container">
                    <div className="contact-message">
                      <p>I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.</p>
                    </div>
                    
                    <div className="contact-methods">
                      <div className="contact-method">
                        <div className="contact-icon">✉️</div>
                        <div className="contact-info">
                          <h4>Email</h4>
                          <a href={`mailto:${mergedPortfolioData.bio.email}`}>{mergedPortfolioData.bio.email}</a>
                        </div>
                      </div>
                      
                      <div className="contact-method">
                        <div className="contact-icon">🔗</div>
                        <div className="contact-info">
                          <h4>LinkedIn</h4>
                          <a href={`https://${mergedPortfolioData.bio.linkedin}`}  rel="noreferrer">{mergedPortfolioData.bio.linkedin}</a>
                        </div>
                      </div>
                      
                      <div className="contact-method">
                        <div className="contact-icon">💻</div>
                        <div className="contact-info">
                          <h4>GitHub</h4>
                          <a href={`https://${mergedPortfolioData.bio.github}`}  rel="noreferrer">{mergedPortfolioData.bio.github}</a>
                        </div>
                      </div>
                      
                      <div className="contact-method">
                        <div className="contact-icon">🌐</div>
                        <div className="contact-info">
                          <h4>Website</h4>
                          <a href={`https://${mergedPortfolioData.bio.website}`}  rel="noreferrer">{mergedPortfolioData.bio.website}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
        
        <div className="preview-footer">
          <div className="impostor-message">
            <h3>Your Work Deserves Recognition</h3>
            <p>This portfolio effectively showcases your true capabilities and achievements. Remember, what others see is your real talent - not the impostor your mind sometimes creates.</p>
          </div>
          
          <div className="preview-actions">
            <button className="action-button" onClick={handleEdit}>Edit Portfolio</button>
            <button className="action-button primary" onClick={handleShare}>Share Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preview;