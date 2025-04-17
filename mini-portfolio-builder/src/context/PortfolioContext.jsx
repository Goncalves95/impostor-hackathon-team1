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

  return (
    <PortfolioContext.Provider value={{
      portfolioData,
      updateBio,
      addProject,
      updateProject,
      removeProject,
      addSkill,
      removeSkill,
      savePortfolio
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};