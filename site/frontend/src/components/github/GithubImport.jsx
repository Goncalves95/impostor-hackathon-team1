import React, { useState } from 'react';
import styled from 'styled-components';
import { usePortfolio } from '../../context/PortfolioContext';

const ImportContainer = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #f6f8fa;
  border-radius: 10px;
  border: 1px solid #e1e4e8;
`;

const ImportTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #24292e;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #24292e;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #586069;
`;

const ImportSection = styled.div`
  margin-top: 1.5rem;
`;

const SectionTitle = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #24292e;
`;

const RepoList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 1rem;
  border: 1px solid #e1e4e8;
  border-radius: 5px;
`;

const RepoItem = styled.div`
  display: flex;
  padding: 0.8rem;
  border-bottom: 1px solid #e1e4e8;
  align-items: center;
  
  &:last-child {
    border-bottom: none;
  }
`;

const RepoCheckbox = styled.input`
  margin-right: 1rem;
`;

const RepoInfo = styled.div`
  flex-grow: 1;
`;

const RepoName = styled.div`
  font-weight: bold;
  color: #0366d6;
`;

const RepoDescription = styled.div`
  font-size: 0.9rem;
  color: #586069;
  margin-top: 0.3rem;
`;

const LanguagesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1rem;
`;

const LanguageItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
`;

const LanguageColor = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.color || '#ccc'};
`;

const LanguageName = styled.span`
  color: #24292e;
`;

const LanguagePercentage = styled.span`
  color: #586069;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
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

const ImportButton = styled(Button)`
  background-color: #28a745;
  color: white;

  &:hover {
    background-color: #22863a;
  }
`;

const DisconnectButton = styled(Button)`
  background-color: #e0e0e0;
  color: #333;

  &:hover {
    background-color: #d0d0d0;
  }
`;

const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  Python: '#3572A5',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Ruby: '#701516',
  Go: '#00ADD8',
  PHP: '#4F5D95',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Swift: '#ffac45',
  Kotlin: '#F18E33',
  Rust: '#dea584',
};

function GithubImport() {
  const { portfolioData, disconnectGithub, importGithubReposAsProjects, importGithubLanguagesAsSkills } = usePortfolio();
  const [selectedRepos, setSelectedRepos] = useState([]);
  
  if (!portfolioData.github.connected) {
    return null;
  }

  const { repos, languages, stats } = portfolioData.github;

  const handleRepoToggle = (repo) => {
    setSelectedRepos(prevSelected => {
      const isSelected = prevSelected.some(r => r.id === repo.id);
      if (isSelected) {
        return prevSelected.filter(r => r.id !== repo.id);
      } else {
        return [...prevSelected, repo];
      }
    });
  };

  const handleImportRepos = () => {
    if (selectedRepos.length > 0) {
      importGithubReposAsProjects(selectedRepos);
      setSelectedRepos([]);
    }
  };

  const handleImportLanguages = () => {
    importGithubLanguagesAsSkills();
  };

  return (
    <ImportContainer>
      <ImportTitle>GitHub Data</ImportTitle>
      
      {stats && (
        <StatsContainer>
          <StatItem>
            <StatValue>{stats.totalRepos}</StatValue>
            <StatLabel>Repositories</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{stats.followers}</StatValue>
            <StatLabel>Followers</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{stats.following}</StatValue>
            <StatLabel>Following</StatLabel>
          </StatItem>
        </StatsContainer>
      )}
      
      <ImportSection>
        <SectionTitle>Programming Languages</SectionTitle>
        <LanguagesList>
          {languages.map((lang, index) => (
            <LanguageItem key={index}>
              <LanguageColor color={languageColors[lang.name] || '#ccc'} />
              <LanguageName>{lang.name}</LanguageName>
              <LanguagePercentage>{lang.percentage}%</LanguagePercentage>
            </LanguageItem>
          ))}
        </LanguagesList>
        <ImportButton onClick={handleImportLanguages}>
          Import as Skills
        </ImportButton>
      </ImportSection>
      
      <ImportSection>
        <SectionTitle>Repositories</SectionTitle>
        <RepoList>
          {repos.map((repo) => (
            <RepoItem key={repo.id}>
              <RepoCheckbox 
                type="checkbox"
                checked={selectedRepos.some(r => r.id === repo.id)}
                onChange={() => handleRepoToggle(repo)}
              />
              <RepoInfo>
                <RepoName>{repo.name}</RepoName>
                <RepoDescription>{repo.description || 'No description available'}</RepoDescription>
              </RepoInfo>
            </RepoItem>
          ))}
        </RepoList>
        
        <ButtonsContainer>
          <ImportButton 
            onClick={handleImportRepos}
            disabled={selectedRepos.length === 0}
          >
            Import Selected as Projects
          </ImportButton>
          <DisconnectButton onClick={disconnectGithub}>
            Disconnect GitHub
          </DisconnectButton>
        </ButtonsContainer>
      </ImportSection>
    </ImportContainer>
  );
}

export default GithubImport;