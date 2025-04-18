import React, { useState } from 'react';
import styled from 'styled-components';
import { usePortfolio } from '../../context/PortfolioContext';

const FormTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 2rem;
`;

const SkillTag = styled.div`
  background-color: #e0e7ff;
  color: #4a6cf7;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #e53e3e;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;

  &:hover {
    background-color: rgba(229, 62, 62, 0.1);
  }
`;

const Form = styled.form`
  display: flex;
  gap: 1rem;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4a6cf7;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s, transform 0.2s;
  background-color: #4a6cf7;
  color: white;

  &:hover {
    background-color: #3451b2;
    transform: translateY(-2px);
  }
`;

const CategoryContainer = styled.div`
  margin-top: 2rem;
`;

const CategoryTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #444;
`;

const CategorySelect = styled.select`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  margin-bottom: 1rem;
  width: 100%;

  &:focus {
    border-color: #4a6cf7;
    outline: none;
  }
`;

function SkillsForm() {
  const { portfolioData, addSkill, removeSkill } = usePortfolio();
  const [newSkill, setNewSkill] = useState('');
  const [category, setCategory] = useState('technical');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newSkill.trim()) {
      addSkill({
        name: newSkill.trim(),
        category: category
      });
      setNewSkill('');
    }
  };

  const technicalSkills = portfolioData.skills.filter(skill => skill.category === 'technical');
  const softSkills = portfolioData.skills.filter(skill => skill.category === 'soft');
  const languageSkills = portfolioData.skills.filter(skill => skill.category === 'language');

  return (
    <>
      <FormTitle>My Skills</FormTitle>
      
      <CategoryContainer>
        <CategoryTitle>Skill Category</CategoryTitle>
        <CategorySelect 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="technical">Technical Skills</option>
          <option value="soft">Soft Skills</option>
          <option value="language">Languages</option>
        </CategorySelect>
      </CategoryContainer>
      
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder={
            category === 'technical' ? "Ex: React, Node.js, Docker" : 
            category === 'soft' ? "Ex: Leadership, Communication, Teamwork" :
            "Ex: English (Fluent), Spanish (Basic)"
          }
        />
        <Button type="submit">Add</Button>
      </Form>

      {technicalSkills.length > 0 && (
        <CategoryContainer>
          <CategoryTitle>Technical Skills</CategoryTitle>
          <SkillsContainer>
            {technicalSkills.map((skill, index) => (
              <SkillTag key={index}>
                {skill.name}
                <DeleteButton onClick={() => removeSkill(portfolioData.skills.indexOf(skill))}>×</DeleteButton>
              </SkillTag>
            ))}
          </SkillsContainer>
        </CategoryContainer>
      )}

      {softSkills.length > 0 && (
        <CategoryContainer>
          <CategoryTitle>Soft Skills</CategoryTitle>
          <SkillsContainer>
            {softSkills.map((skill, index) => (
              <SkillTag key={index}>
                {skill.name}
                <DeleteButton onClick={() => removeSkill(portfolioData.skills.indexOf(skill))}>×</DeleteButton>
              </SkillTag>
            ))}
          </SkillsContainer>
        </CategoryContainer>
      )}

      {languageSkills.length > 0 && (
        <CategoryContainer>
          <CategoryTitle>Languages</CategoryTitle>
          <SkillsContainer>
            {languageSkills.map((skill, index) => (
              <SkillTag key={index}>
                {skill.name}
                <DeleteButton onClick={() => removeSkill(portfolioData.skills.indexOf(skill))}>×</DeleteButton>
              </SkillTag>
            ))}
          </SkillsContainer>
        </CategoryContainer>
      )}
    </>
  );
}

export default SkillsForm;