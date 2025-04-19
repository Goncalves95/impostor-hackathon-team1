import React, { createContext, useState, useContext } from 'react';

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState({
    bio: {
      name: '',
      title: '',
      about: '',
      email: '',
      github: '',
      linkedin: '',
    },
    projects: [],
    skills: [],
    github: {
      connected: false,
      token: null,
      repos: [],
      languages: [],
      stats: null,
    }
  });

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
      console.log('Portfolio salvo:', portfolioData);
      return portfolioData;
    } catch (error) {
      console.error('Erro ao salvar portfolio:', error);
      throw error;
    }
  };

  // GitHub Integration functions

  const setGithubToken = (token) => {
    setPortfolioData(prev => ({
      ...prev,
      github: {
        ...prev.github,
        connected: true,
        token
      }
    }));
    // Após salvar o token, você pode chamar funções para buscar dados do GitHub
    fetchGithubData(token);
  };

  const fetchGithubData = async (token) => {
    try {
      const reposResponse = await fetch('https://api.github.com/user/repos?sort=updated&per_page=100', {
        headers: {
          Authorization: `token ${token}`
        }
      });
      const repos = await reposResponse.json();

      const userResponse = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `token ${token}`
        }
      });
      const userData = await userResponse.json();

      const languages = {};
      const languagePromises = repos.slice(0, 10).map(repo => 
        fetch(repo.languages_url, {
          headers: {
            Authorization: `token ${token}`
          }
        })
        .then(res => res.json())
        .then(data => {
          Object.keys(data).forEach(lang => {
            languages[lang] = (languages[lang] || 0) + data[lang];
          });
        })
      );

      await Promise.all(languagePromises);

      setPortfolioData(prev => ({
        ...prev,
        bio: {
          ...prev.bio,
          github: userData.html_url || prev.bio.github,
        },
        github: {
          ...prev.github,
          repos: repos.map(repo => ({
            id: repo.id,
            name: repo.name,
            description: repo.description,
            url: repo.html_url,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
          })),
          languages: Object.entries(languages).map(([name, bytes]) => ({
            name,
            bytes,
            percentage: 0,
          })),
          stats: {
            totalRepos: userData.public_repos,
            followers: userData.followers,
            following: userData.following,
          }
        }
      }));

      const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
      setPortfolioData(prev => ({
        ...prev,
        github: {
          ...prev.github,
          languages: prev.github.languages.map(lang => ({
            ...lang,
            percentage: Math.round((lang.bytes / totalBytes) * 100)
          }))
        }
      }));

    } catch (error) {
      console.error('Error fetching GitHub data:', error);
    }
  };

  const disconnectGithub = () => {
    setPortfolioData(prev => ({
      ...prev,
      github: {
        connected: false,
        token: null,
        repos: [],
        languages: [],
        stats: null,
      }
    }));
  };

  const importGithubReposAsProjects = (selectedRepos) => {
    const newProjects = selectedRepos.map(repo => ({
      title: repo.name,
      description: repo.description || `A repository on GitHub called ${repo.name}`,
      technologies: [repo.language].filter(Boolean),
      link: repo.url,
      image: ''
    }));

    setPortfolioData(prev => ({
      ...prev,
      projects: [...prev.projects, ...newProjects]
    }));
  };

  const importGithubLanguagesAsSkills = () => {
    const newSkills = portfolioData.github.languages
      .filter(lang => lang.percentage >= 5)
      .map(lang => ({
        name: lang.name,
        category: 'technical'
      }));

    setPortfolioData(prev => ({
      ...prev,
      skills: [...prev.skills, ...newSkills.filter(newSkill => 
        !prev.skills.some(skill => 
          skill.name.toLowerCase() === newSkill.name.toLowerCase() && skill.category === 'technical'
        )
      )]
    }));
  };
  
  return (
    <PortfolioContext.Provider
      value={{
        portfolioData,
        updateBio,
        addProject,
        updateProject,
        removeProject,
        addSkill,
        removeSkill,
        savePortfolio,
        setGithubToken,
        disconnectGithub,
        importGithubReposAsProjects,
        importGithubLanguagesAsSkills
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};