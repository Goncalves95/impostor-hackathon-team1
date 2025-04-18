import React from 'react';
import styled from 'styled-components';

const SectionContainer = styled.section`
  padding: 3rem;
  background-color: #f8f9fa;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 2rem;
  position: relative;
  padding-bottom: 0.5rem;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background-color: #4a6cf7;
  }
`;

const SkillsLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const SkillCategory = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

const CategoryTitle = styled.h3`
  font-size: 1.3rem;
  color: #444;
  margin-bottom: 1.2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e0e7ff;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const SkillTag = styled.div`
  background-color: #e0e7ff;
  color: #4a6cf7;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  color: #666;
`;

function SkillsSection({ skills }) {
  if (!skills || skills.length === 0) {
    return (
      <SectionContainer>
        <SectionTitle>Skills</SectionTitle>
        <EmptyState>
          <p>No skills added yet.</p>
        </EmptyState>
      </SectionContainer>
    );
  }

  // Filter skills by category
  const technicalSkills = skills.filter(skill => skill.category === 'technical');
  const softSkills = skills.filter(skill => skill.category === 'soft');
  const languageSkills = skills.filter(skill => skill.category === 'language');

  return (
    <SectionContainer>
      <SectionTitle>Skills</SectionTitle>
      <SkillsLayout>
        {technicalSkills.length > 0 && (
          <SkillCategory>
            <CategoryTitle>Technical Skills</CategoryTitle>
            <SkillsContainer>
              {technicalSkills.map((skill, index) => (
                <SkillTag key={index}>{skill.name}</SkillTag>
              ))}
            </SkillsContainer>
          </SkillCategory>
        )}

        {softSkills.length > 0 && (
          <SkillCategory>
            <CategoryTitle>Soft Skills</CategoryTitle>
            <SkillsContainer>
              {softSkills.map((skill, index) => (
                <SkillTag key={index}>{skill.name}</SkillTag>
              ))}
            </SkillsContainer>
          </SkillCategory>
        )}

        {languageSkills.length > 0 && (
          <SkillCategory>
            <CategoryTitle>Languages</CategoryTitle>
            <SkillsContainer>
              {languageSkills.map((skill, index) => (
                <SkillTag key={index}>{skill.name}</SkillTag>
              ))}
            </SkillsContainer>
          </SkillCategory>
        )}
      </SkillsLayout>
    </SectionContainer>
  );
}

export default SkillsSection;