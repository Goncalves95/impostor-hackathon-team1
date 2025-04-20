import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import '../../styles/GithubImport.css';

function GithubImport() {
  const { portfolioData, setPortfolioData } = usePortfolio();
  const [importedRepos, setImportedRepos] = useState([]);
  const [importedLanguages, setImportedLanguages] = useState([]);
  
  const availableRepos = portfolioData.github?.repos || [];
  const availableLanguages = portfolioData.github?.languages || [];
  
  const handleImportRepo = (repo) => {
    const alreadyExists = portfolioData.projects.some(project => 
      project.githubId === repo.id
    );
    
    if (alreadyExists) {
      return;
    }
    
    const newProject = {
      id: Date.now(),
      githubId: repo.id,
      title: repo.name,
      description: repo.description || `GitHub repository: ${repo.name}`,
      technologies: [repo.language].filter(Boolean),
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?q=80&w=2076&auto=format&fit=crop",
      link: repo.html_url
    };
    
    setPortfolioData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
    
    setImportedRepos(prev => [...prev, repo.id]);
  };
  
  const handleImportLanguage = (language) => {
    const alreadyExists = portfolioData.skills.some(skill => 
      skill.name.toLowerCase() === language.name.toLowerCase()
    );
    
    if (alreadyExists) {
      return;
    }
    
    const newSkill = {
      id: Date.now(),
      name: language.name,
      level: language.percentage,
    };
    
    setPortfolioData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
    
    setImportedLanguages(prev => [...prev, language.name]);
  };
  
  const isRepoImported = (id) => {
    return importedRepos.includes(id) || 
           portfolioData.projects.some(project => project.githubId === id);
  };
  
  const isLanguageImported = (name) => {
    return importedLanguages.includes(name) || 
           portfolioData.skills.some(skill => 
             skill.name.toLowerCase() === name.toLowerCase()
           );
  };

  return (
    <div className="github-import-container">
      <h3 className="github-import-title">Import from GitHub</h3>
      
      {availableRepos.length > 0 && (
        <div className="github-section">
          <h4 className="github-section-title">Repositories</h4>
          <p className="github-section-description">
            Import your GitHub repositories as projects for your portfolio.
          </p>
          
          <div className="github-repos-list">
            {availableRepos.map(repo => (
              <div className="github-repo-item" key={repo.id}>
                <div className="github-repo-info">
                  <div className="github-repo-name">{repo.name}</div>
                  <div className="github-repo-description">
                    {repo.description || 'No description available'}
                  </div>
                  <div className="github-repo-meta">
                    {repo.language && (
                      <span className="github-repo-language">
                        <span 
                          className="language-color"
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        ></span>
                        {repo.language}
                      </span>
                    )}
                    <span className="github-repo-stars">
                      ⭐ {repo.stargazers_count}
                    </span>
                  </div>
                </div>
                <button 
                  className={`github-import-button ${isRepoImported(repo.id) ? 'imported' : ''}`}
                  onClick={() => handleImportRepo(repo)}
                  disabled={isRepoImported(repo.id)}
                >
                  {isRepoImported(repo.id) ? 'Imported' : 'Import'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {availableLanguages.length > 0 && (
        <div className="github-section">
          <h4 className="github-section-title">Programming Languages</h4>
          <p className="github-section-description">
            Import your most used programming languages as skills.
          </p>
          
          <div className="github-languages-list">
            {availableLanguages.map(language => (
              <div className="github-language-item" key={language.name}>
                <div className="github-language-info">
                  <div className="github-language-name">
                    <span 
                      className="language-color large"
                      style={{ backgroundColor: getLanguageColor(language.name) }}
                    ></span>
                    {language.name}
                  </div>
                  <div className="github-language-percentage">
                    {language.percentage}%
                  </div>
                </div>
                <button 
                  className={`github-import-button ${isLanguageImported(language.name) ? 'imported' : ''}`}
                  onClick={() => handleImportLanguage(language)}
                  disabled={isLanguageImported(language.name)}
                >
                  {isLanguageImported(language.name) ? 'Imported' : 'Import'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {availableRepos.length === 0 && availableLanguages.length === 0 && (
        <div className="github-empty-state">
          <p>No GitHub data available to import. Please make sure your GitHub account has public repositories.</p>
        </div>
      )}
    </div>
  );
}

function getLanguageColor(language) {
  const colors = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
    Java: '#b07219',
    Ruby: '#701516',
    PHP: '#4F5D95',
    Go: '#00ADD8',
    C: '#555555',
    'C++': '#f34b7d',
    'C#': '#178600'
  };
  
  return colors[language] || '#8b949e';
}

export default GithubImport;