import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { usePortfolio } from '../context/PortfolioContext';
import BioSection from '../components/portfolio/BioSection';
import ProjectsSection from '../components/portfolio/ProjectSection';
import SkillsSection from '../components/portfolio/SkillsSection';

const PreviewContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const EditButton = styled(Button)`
  background-color: #f0f0f0;
  color: #333;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const ShareButton = styled(Button)`
  background-color: #4a6cf7;
  color: white;

  &:hover {
    background-color: #3451b2;
  }
`;

const PortfolioContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

function Preview() {
  const { portfolioData } = usePortfolio();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/builder');
  };

  const handleShare = () => {
    // Here you would implement the logic to share the portfolio
    // For example, generate a unique link or allow downloading as PDF
    alert('Sharing functionality will be implemented soon!');
  };

  return (
    <PreviewContainer>
      <Header>
        <Title>Portfolio Preview</Title>
        <ButtonsContainer>
          <EditButton onClick={handleEdit}>Edit</EditButton>
          <ShareButton onClick={handleShare}>Share</ShareButton>
        </ButtonsContainer>
      </Header>

      <PortfolioContainer>
        <BioSection bio={portfolioData.bio} />
        <ProjectsSection projects={portfolioData.projects} />
        <SkillsSection skills={portfolioData.skills} />
      </PortfolioContainer>
    </PreviewContainer>
  );
}

export default Preview;