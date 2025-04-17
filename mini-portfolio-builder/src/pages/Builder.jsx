import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BioForm from '../components/forms/BioForm';
import ProjectForm from '../components/forms/PreojectForm';
import SkillsForm from '../components/forms/SkillForm';
import { usePortfolio } from '../context/PortfolioContext';

const BuilderContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.active ? '#4a6cf7' : '#e0e0e0'};
  color: ${props => props.active ? 'white' : '#666'};
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StepText = styled.div`
  font-size: 0.9rem;
  color: ${props => props.active ? '#4a6cf7' : '#666'};
`;

const StepConnector = styled.div`
  flex-grow: 1;
  height: 2px;
  background-color: #e0e0e0;
  margin: 20px 10px;
`;

const FormContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
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

  &:disabled {
    background-color: #e0e0e0;
    color: #999;
    cursor: not-allowed;
    transform: none;
  }
`;

const BackButton = styled(Button)`
  background-color: #f0f0f0;
  color: #333;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const NextButton = styled(Button)`
  background-color: #4a6cf7;
  color: white;

  &:hover {
    background-color: #3451b2;
  }
`;

function Builder() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const { savePortfolio } = usePortfolio();

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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
    <BuilderContainer>
      <StepIndicator>
        <Step>
          <StepNumber active={currentStep >= 1}>1</StepNumber>
          <StepText active={currentStep >= 1}>Personal Information</StepText>
        </Step>
        <StepConnector />
        <Step>
          <StepNumber active={currentStep >= 2}>2</StepNumber>
          <StepText active={currentStep >= 2}>Projects</StepText>
        </Step>
        <StepConnector />
        <Step>
          <StepNumber active={currentStep >= 3}>3</StepNumber>
          <StepText active={currentStep >= 3}>Skills</StepText>
        </Step>
      </StepIndicator>

      <FormContainer>
        {currentStep === 1 && <BioForm />}
        {currentStep === 2 && <ProjectForm />}
        {currentStep === 3 && <SkillsForm />}

        <ButtonsContainer>
          <BackButton 
            onClick={handleBack} 
            disabled={currentStep === 1}
          >
            Back
          </BackButton>
          <NextButton onClick={handleNext}>
            {currentStep === 3 ? 'Finish' : 'Next'}
          </NextButton>
        </ButtonsContainer>
      </FormContainer>
    </BuilderContainer>
  );
}

export default Builder;