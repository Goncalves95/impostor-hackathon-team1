import React from 'react';
import { motion } from 'framer-motion';
import '../styles/AboutPage.css';

const AboutPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const teamMembers = [
    {
      name: "Alita Pantea",
      role: "Full Stack Developer",
      bio: "Every role I’ve held has shaped the way I approach challenges, and I continue to embrace new opportunities to grow both personally and professionally.",
      image: "/images/team/alita.jpg",
      linkedin: "https://www.linkedin.com/in/alita-pantea/",
      github: "https://github.com/hashtag-squirrel"
    },
    {
      name: "Fernando Gonçalves",
      role: "Software Developer",
      bio: "Software developer specialized in machine learning and frontend development, with a passion for building innovative applications and games.",
      image: "/images/team/avatar.jpeg", 
      linkedin: "https://www.linkedin.com/in/fernandojcgoncalves/",
      github: "https://github.com/Goncalves95"
    },
    {
      name: "Patricia Lacerda",
      role: "Junior Software Developer",
      bio: "I’m passionate about bringing creative, efficient solutions to life through code. Skilled in HTML, CSS, JavaScript, Python, and React.",
      image: "/images/team/pati.jpeg",
      linkedin: "https://www.linkedin.com/in/patriciarlacerda/",
      github: "https://github.com/patilacerda"
    }
  ];

  return (
    <div className="about-container">
      {/* Background Elements */}
      <div className="about-bg-elements">
        <div className="about-bg-circle circle-1"></div>
        <div className="about-bg-circle circle-2"></div>
        <div className="about-bg-dot-grid"></div>
      </div>
      
      {/* Header Section */}
      <motion.div 
        className="about-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1>About <span className="highlight">Level Up Hub</span></h1>
        <div className="header-underline"></div>
        <p className="about-tagline">Helping developers overcome impostor syndrome and showcase their true potential</p>
      </motion.div>

      {/* Project Section */}
      <motion.section 
        className="project-section"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="project-content">
          <div className="project-description">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Our Mission
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Level Up Hub was created to help developers who struggle with impostor syndrome to present their work confidently online. Our platform allows anyone to create a professional portfolio quickly and intuitively, highlighting their real achievements and skills.
            </motion.p>
            
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="features-container"
            >
              <h2>What We Offer</h2>
              <div className="features-grid">
                <motion.div className="feature-item" variants={fadeIn}>
                  <div className="feature-icon">✨</div>
                  <div className="feature-text">Customizable professional templates</div>
                </motion.div>
                
                <motion.div className="feature-item" variants={fadeIn}>
                  <div className="feature-icon">🔄</div>
                  <div className="feature-text">Intuitive drag-and-drop interface</div>
                </motion.div>
                
                <motion.div className="feature-item" variants={fadeIn}>
                  <div className="feature-icon">💻</div>
                  <div className="feature-text">GitHub integration to showcase code</div>
                </motion.div>
                
                <motion.div className="feature-item" variants={fadeIn}>
                  <div className="feature-icon">🎨</div>
                  <div className="feature-text">Design customization options</div>
                </motion.div>
                
                <motion.div className="feature-item" variants={fadeIn}>
                  <div className="feature-icon">📱</div>
                  <div className="feature-text">Responsiveness for all devices</div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <h2>Our Story</h2>
              <div className="story-container">
                <p>
                  Level Up Hub was born during the Impostor Syndrome Hackathon of 2024, where three developers identified the common struggle many professionals face: doubting their own abilities despite evidence of their competence.
                </p>
                <p>
                  We realized that many talented developers were hesitant to showcase their work due to feelings of inadequacy. Our vision is to help everyone recognize and present their true value through professionally designed portfolios.
                </p>
                <div className="quote-box">
                  <p>"We build the tools that help you show the world what you're truly capable of."</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="project-image-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="image-frame">
              <img src="/images/site/siteInAction.png" alt="Project screenshot" className="project-image" />
              <div className="image-shadow"></div>
            </div>
            <div className="image-caption">Our portfolio builder in action</div>
          </motion.div>
        </div>
      </motion.section>

      {/* Team Section */}
      <section className="team-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="team-header"
        >
          <h2>Meet The Team</h2>
          <div className="team-header-underline"></div>
          <p className="team-intro">
            We are a team passionate about web development and design, committed to creating
            tools that help people showcase their talents professionally on the web.
          </p>
        </motion.div>
        
        <motion.div 
          className="team-members"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {teamMembers.map((member, index) => (
            <motion.div 
              className="member-card" 
              key={index}
              variants={fadeIn}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="member-image-container">
                <div className="member-image-wrapper">
                  <img 
                    src={member.image || "https://via.placeholder.com/300?text=Team+Member"} 
                    alt={member.name} 
                    className="member-image"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300?text=Team+Member";
                    }}
                  />
                </div>
                <div className="member-overlay">
                  <div className="member-hover-content"></div>
                </div>
              </div>
              
              <div className="member-info">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-bio">{member.bio}</p>
                
                <div className="social-links">
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-link">
                    <span className="social-icon">👨‍💼</span> LinkedIn
                  </a>
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className="github-link">
                    <span className="social-icon">📁</span> GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Contact Section with Animation */}
      <motion.section 
        className="contact-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="contact-inner">
          <h2>Get in Touch</h2>
          <p className="contact-text">
            Have a question or suggestion? We're always open to feedback!
          </p>
          
          <div className="contact-methods">
            <div className="contact-method">
              <div className="contact-icon">✉️</div>
              <div className="contact-info">
                <h3>Email Us</h3>
                <a href="mailto:contact@leveluphub.com">contact@leveluphub.com</a>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="contact-icon">💬</div>
              <div className="contact-info">
                <h3>Follow Us</h3>
                <p>Stay updated with our latest features and news</p>
                <div className="social-row">
                  <a href="https://x.com/" className="social-dot" title="X">🐦</a>
                  <a href="https://www.instagram.com/" className="social-dot" title="Instagram">📸</a>
                  <a href="https://www.linkedin.com/" className="social-dot" title="LinkedIn">💼</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="contact-decoration">
          <div className="contact-shape shape-1"></div>
          <div className="contact-shape shape-2"></div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;