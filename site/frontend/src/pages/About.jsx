import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import '../styles/AboutPage.css';


const AboutPage = () => {
  const teamMembers = [
    {
      name: "Team Member 1",
      role: "Full Stack Developer",
      bio: "Brief professional description with experience and core competencies. Focus on web development with React and Node.js.",
      image: "",
      linkedin: "https://linkedin.com/in/member1",
      github: "https://github.com/member1"
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
      name: "Team Member 3",
      role: "Backend Developer",
      bio: "Backend developer with experience in RESTful APIs, databases, and infrastructure. Specialized in Python and Django.",
      image: "/images/team/member3.jpg",
      linkedin: "https://linkedin.com/in/member3",
      github: "https://github.com/member3"
    }
  ];

  return (
    <div className="about-container">
      <section className="project-section">
        <h1>About the Project</h1>
        <div className="project-content">
          <div className="project-description">
            <h2>Our Mission</h2>
            <p>
              [Project Name] was created to simplify how professionals present their work online.
              Our platform allows anyone to create a professional portfolio quickly and intuitively,
              without requiring technical programming knowledge.
            </p>
            
            <h2>What We Offer</h2>
            <ul>
              <li>Customizable professional templates</li>
              <li>Intuitive drag-and-drop interface</li>
              <li>GitHub integration to showcase code projects</li>
              <li>Design customization options</li>
              <li>Responsiveness for all devices</li>
            </ul>
            
            <h2>Our Story</h2>
            <p>
              The project was born in 2024 as a collaboration between three developers who identified the need
              for a simple tool to create online portfolios. Our vision is to democratize the creation of
              professional portfolios for everyone.
            </p>
          </div>
          <div className="project-image">
            <img src="/images/project-screenshot.png" alt="Project screenshot" />
          </div>
        </div>
      </section>

      <section className="team-section">
        <h1>Our Team</h1>
        <p className="team-intro">
          We are a team passionate about web development and design, committed to creating
          tools that help people showcase their talents professionally on the web.
        </p>
        
        <div className="team-members">
          {teamMembers.map((member, index) => (
            <div className="member-card" key={index}>
              <div className="member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <p className="member-role">{member.role}</p>
              <p className="member-bio">{member.bio}</p>
              <div className="social-links">
                <a href={member.linkedin}  rel="noopener noreferrer" className="linkedin-link">
                  <FaLinkedin /> LinkedIn
                </a>
                <a href={member.github}  rel="noopener noreferrer" className="github-link">
                  <FaGithub /> GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-section">
        <h2>Get in Touch</h2>
        <p>
          Have a question or suggestion? We're always open to feedback!
          <br />
          Email: <a href="mailto:contact@yourproject.com">contact@yourproject.com</a>
        </p>
      </section>
    </div>
  );
};

export default AboutPage;