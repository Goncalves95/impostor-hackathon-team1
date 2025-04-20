import React, { createContext, useState, useContext, useEffect } from 'react';
import { MOCK_GITHUB_DATA } from '../services/github';

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  const initialData = JSON.parse(localStorage.getItem('portfolioData')) || {
    bio: {
      name: '',
      title: '',
      about: '',
      email: '',
      github: '',
      linkedin: '',
      website: '',
      location: '',
      avatar: '',
    },
    projects: [],
    skills: [],
    github: {
      connected: false,
      token: null,
      repos: [],
      languages: [],
      user: null,
    }
  };

  const [portfolioData, setPortfolioData] = useState(initialData);
  const [githubToken, setGithubTokenState] = useState(localStorage.getItem('githubToken') || null);
  const [githubData, setGithubDataState] = useState(JSON.parse(localStorage.getItem('githubData') || 'null'));

  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
  }, [portfolioData]);

  useEffect(() => {
    if (githubToken) {
      localStorage.setItem('githubToken', githubToken);
    } else {
      localStorage.removeItem('githubToken');
    }
  }, [githubToken]);

  useEffect(() => {
    if (githubData) {
      localStorage.setItem('githubData', JSON.stringify(githubData));
      
      setPortfolioData(prev => ({
        ...prev,
        github: {
          ...prev.github,
          connected: true,
          repos: githubData.repos || [],
          languages: githubData.languages || [],
          user: githubData.user || {}
        },
        bio: {
          ...prev.bio,
          github: githubData.user?.html_url || prev.bio.github,
          name: prev.bio.name || githubData.user?.name || '',
          avatar: prev.bio.avatar || githubData.user?.avatar_url || '',
        }
      }));
    }
  }, [githubData]);

  const updateBio = (bioData) => {
    setPortfolioData(prev => ({
      ...prev,
      bio: {
        ...prev.bio,
        ...bioData
      }
    }));
  };

  const addProject = (project) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: [...prev.projects, project]
    }));
  };

  const updateProject = (index, updatedProject) => {
    const updatedProjects = [...portfolioData.projects];
    updatedProjects[index] = updatedProject;
    setPortfolioData(prev => ({
      ...prev,
      projects: updatedProjects
    }));
  };

  const removeProject = (index) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const addSkill = (skill) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: [...prev.skills, skill]
    }));
  };

  const removeSkill = (index) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const savePortfolio = async () => {
    try {
      localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
      console.log('Portfolio salvo:', portfolioData);
      return portfolioData;
    } catch (error) {
      console.error('Erro ao salvar portfolio:', error);
      throw error;
    }
  };

  const setGithubConnected = (connected) => {
    setPortfolioData(prev => ({
      ...prev,
      github: {
        ...prev.github,
        connected: connected
      }
    }));
  };

  const setGithubToken = (token) => {
    setGithubTokenState(token);
    
    if (token === 'demo_token' || process.env.NODE_ENV === 'production') {
      setGithubDataState(MOCK_GITHUB_DATA);
      setGithubConnected(true);
      return;
    }
    
    fetchGithubData(token);
  };

  const setGithubData = (data) => {
    setGithubDataState(data);
  };

  const fetchGithubData = async (token) => {
    if (process.env.NODE_ENV === 'production') {
      return;
    }
    
    try {
      const reposResponse = await fetch('https://api.github.com/user/repos?sort=updated&per_page=10', {
        headers: {
          Authorization: `token ${token}`
        }
      });
      
      if (!reposResponse.ok) {
        throw new Error('Failed to fetch GitHub repositories');
      }
      
      const repos = await reposResponse.json();

      const userResponse = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `token ${token}`
        }
      });
      
      if (!userResponse.ok) {
        throw new Error('Failed to fetch GitHub user data');
      }
      
      const userData = await userResponse.json();

      const languages = {};
      const languagePromises = repos.slice(0, 5).map(repo => 
        fetch(repo.languages_url, {
          headers: {
            Authorization: `token ${token}`
          }
        })
        .then(res => {
          if (!res.ok) {
            throw new Error(`Failed to fetch languages for ${repo.name}`);
          }
          return res.json();
        })
        .then(data => {
          Object.keys(data).forEach(lang => {
            languages[lang] = (languages[lang] || 0) + data[lang];
          });
        })
      );

      await Promise.all(languagePromises);

      const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
      const formattedLanguages = Object.entries(languages)
        .map(([name, bytes]) => ({
          name,
          bytes,
          percentage: Math.round((bytes / totalBytes) * 100)
        }))
        .sort((a, b) => b.percentage - a.percentage);

      const formattedRepos = repos.map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        language: repo.language,
        updated_at: repo.updated_at
      }));

      const githubData = {
        user: userData,
        repos: formattedRepos,
        languages: formattedLanguages
      };

      setGithubDataState(githubData);
      setGithubConnected(true);

    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      
      setGithubDataState(MOCK_GITHUB_DATA);
      setGithubConnected(true);
    }
  };

  const disconnectGithub = () => {
    setGithubTokenState(null);
    setGithubDataState(null);
    setPortfolioData(prev => ({
      ...prev,
      github: {
        connected: false,
        token: null,
        repos: [],
        languages: [],
        user: null,
      }
    }));
    
    localStorage.removeItem('githubToken');
    localStorage.removeItem('githubData');
  };

  const importGithubReposAsProjects = (selectedRepos) => {
    const newProjects = selectedRepos.map(repo => ({
      id: Date.now() + Math.random(),
      githubId: repo.id,
      title: repo.name,
      description: repo.description || `A repository on GitHub called ${repo.name}`,
      technologies: [repo.language].filter(Boolean),
      link: repo.html_url,
      image: repo.image || 
             `https://images.unsplash.com/photo-1556075798-4825dfaaf498?q=80&w=2076&auto=format&fit=crop`
    }));
  
    setPortfolioData(prev => ({
      ...prev,
      projects: [...prev.projects, ...newProjects]
    }));
  };

  const importGithubLanguagesAsSkills = (selectedLanguages) => {
    const newSkills = selectedLanguages.map(lang => ({
      id: Date.now() + Math.random(),
      name: lang.name,
      level: lang.percentage,
      category: 'technical'
    }));

    setPortfolioData(prev => ({
      ...prev,
      skills: [...prev.skills, ...newSkills]
    }));
  };
  
  return (
    <PortfolioContext.Provider
      value={{
        portfolioData,
        setPortfolioData,
        updateBio,
        addProject,
        updateProject,
        removeProject,
        addSkill,
        removeSkill,
        savePortfolio,
        githubToken,
        setGithubToken,
        githubData,
        setGithubData,
        setGithubConnected,
        disconnectGithub,
        importGithubReposAsProjects,
        importGithubLanguagesAsSkills
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};