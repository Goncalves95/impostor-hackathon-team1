import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BioForm from '../components/forms/BioForm';
import ProjectForm from '../components/forms/PreojectForm';
import SkillsForm from '../components/forms/SkillForm';
import GithubConnect from '../components/github/GithubConnect';
import GithubImport from '../components/github/GithubImport';
import { usePortfolio } from '../context/PortfolioContext';
import '../styles/Builder.css';

function Builder() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const { portfolioData, savePortfolio } = usePortfolio();

  // Função para determinar a classe do número do passo
  const getStepNumberClass = (step) => {
    if (step < currentStep) return 'step-number completed';
    if (step === currentStep) return 'step-number active';
    return 'step-number inactive';
  };

  // Função para determinar a classe do texto do passo
  const getStepTextClass = (step) => {
    if (step < currentStep) return 'step-text completed';
    if (step === currentStep) return 'step-text active';
    return 'step-text inactive';
  };

  // Função para determinar a classe do conector
  const getConnectorClass = (index) => {
    if (currentStep > index + 1) return 'step-connector-progress full';
    if (currentStep === index + 1) return 'step-connector-progress half';
    return '';
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      // Scroll to top when changing steps
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Scroll to top when changing steps
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinish = async () => {
    try {
      await savePortfolio();
      navigate('/preview');
    } catch (error) {
      console.error('Error when finishing:', error);
      // Show error message
    }
  };

  return (
    <div className="builder-container">
      {/* Background elements */}
      <div className="builder-bg-elements">
        <div className="builder-bg-circle circle-1"></div>
        <div className="builder-bg-circle circle-2"></div>
        <div className="builder-bg-grid"></div>
      </div>

      {/* Step indicator */}
      <div className="step-indicator">
        <div className="step">
          <div className={getStepNumberClass(1)}>1</div>
          <div className={getStepTextClass(1)}>Personal Information</div>
        </div>
        
        <div className="step-connector">
          <div className={getConnectorClass(1)}></div>
        </div>
        
        <div className="step">
          <div className={getStepNumberClass(2)}>2</div>
          <div className={getStepTextClass(2)}>Projects</div>
        </div>
        
        <div className="step-connector">
          <div className={getConnectorClass(2)}></div>
        </div>
        
        <div className="step">
          <div className={getStepNumberClass(3)}>3</div>
          <div className={getStepTextClass(3)}>Skills</div>
        </div>
      </div>

      {/* Form container */}
      <div className="form-container">
        {currentStep === 1 && (
          <>
            <BioForm />
            <div className="section-divider"></div>
            <div className="github-section">
              <h3 className="section-header">GitHub Connection</h3>
              <GithubConnect isConnected={portfolioData.github.connected} />
              {portfolioData.github.connected && <GithubImport />}
            </div>
          </>
        )}
        
        {currentStep === 2 && (
          <>
            <ProjectForm />
            {portfolioData.github.connected && portfolioData.github.repos.length > 0 && (
              <>
                <div className="section-divider"></div>
                <div className="github-section">
                  <h3 className="section-header">GitHub Repositories</h3>
                  <p>You can import your GitHub repositories as projects using the GitHub tab in step 1.</p>
                </div>
              </>
            )}
          </>
        )}
        
        {currentStep === 3 && (
          <>
            <SkillsForm />
            {portfolioData.github.connected && portfolioData.github.languages.length > 0 && (
              <>
                <div className="section-divider"></div>
                <div className="github-section">
                  <h3 className="section-header">GitHub Languages</h3>
                  <p>You can import your GitHub programming languages as skills using the GitHub tab in step 1.</p>
                </div>
              </>
            )}
          </>
        )}

        <div className="buttons-container">
          <button 
            className="builder-button back-button" 
            onClick={handleBack} 
            disabled={currentStep === 1}
          >
            Back
          </button>
          <button className="builder-button next-button" onClick={handleNext}>
            {currentStep === 3 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Builder;