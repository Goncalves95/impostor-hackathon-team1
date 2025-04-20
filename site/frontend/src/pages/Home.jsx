// Home.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Home.css';

function Home() {
  // Effects to run on component mount
  useEffect(() => {
    // Add the animation class to the body when component mounts
    document.body.classList.add('home-page-active');
    
    // Remove it when component unmounts
    return () => {
      document.body.classList.remove('home-page-active');
    };
  }, []);

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="home-container">
      <div className="floating-elements">
        <div className="floating-element mask-element"></div>
        <div className="floating-element shadow-element"></div>
        <div className="floating-element light-element"></div>
      </div>

      <motion.section 
        className="hero-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <h1 className="title">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="highlight-text"
            >
              Embrace Your True Potential
            </motion.span>
            <br />
            Your Portfolio Builder
          </h1>
          
          <p className="subtitle">
            Overcome your <span className="strike-through">doubts</span> and showcase your real abilities with confidence
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/builder" className="cta-button">
              <span className="button-text">Start Building</span>
              <span className="button-shine"></span>
            </Link>
          </motion.div>
          
          <div className="hero-quote">
            <p>"The only true impostor is the voice that tells you you're not good enough."</p>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="impostor-illustration">
            <div className="mask"></div>
            <div className="real-face"></div>
          </div>
        </div>
      </motion.section>

      <motion.section 
        className="features-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="section-title">How It Helps You Shine</h2>
        
        <div className="features-grid">
          <motion.div className="feature-card" variants={itemVariants}>
            <div className="feature-icon">🎭</div>
            <h3 className="feature-title">Beat Impostor Syndrome</h3>
            <p className="feature-description">
              Build confidence by showcasing skills you already have but might undervalue.
            </p>
          </motion.div>

          <motion.div className="feature-card" variants={itemVariants}>
            <div className="feature-icon">🚀</div>
            <h3 className="feature-title">Simple and Fast</h3>
            <p className="feature-description">
              Create a professional portfolio in minutes without second-guessing your abilities.
            </p>
          </motion.div>

          <motion.div className="feature-card" variants={itemVariants}>
            <div className="feature-icon">📋</div>
            <h3 className="feature-title">Projects & Skills</h3>
            <p className="feature-description">
              Highlight your accomplishments in a way that reflects your true capabilities.
            </p>
          </motion.div>

          <motion.div className="feature-card" variants={itemVariants}>
            <div className="feature-icon">🔗</div>
            <h3 className="feature-title">Share With Confidence</h3>
            <p className="feature-description">
              Get a link that represents the real you, not the impostor your mind creates.
            </p>
          </motion.div>
        </div>
      </motion.section>
      
      <section className="testimonial-section">
        <div className="testimonial-container">
          <h2 className="section-title">From Self-Doubt to Showcase</h2>
          
          <div className="testimonial-cards">
            <div className="testimonial-card">
              <p className="testimonial-text">
                "I always felt like my work wasn't good enough to show. This platform helped me see my projects through others' eyes."
              </p>
              <div className="testimonial-author">- Alex, Web Developer</div>
            </div>
            
            <div className="testimonial-card">
              <p className="testimonial-text">
                "Creating my portfolio here made me realize I've accomplished more than I give myself credit for."
              </p>
              <div className="testimonial-author">- Jordan, UX Designer</div>
            </div>
          </div>
        </div>
      </section>
      
      <motion.section 
        className="final-cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>Ready to Show the World Your True Potential?</h2>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/builder" className="cta-button secondary">
            <span className="button-text">Get Started Now</span>
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
}

export default Home;