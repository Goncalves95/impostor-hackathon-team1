import React from 'react';
import styled from 'styled-components';

const SectionContainer = styled.section`
  padding: 3rem;
  background-color: white;
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const ProjectImage = styled.div`
  height: 160px;
  background-color: #e0e7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a6cf7;
  font-size: 1.5rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  color: #333;
`;

const ProjectDescription = styled.p`
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const TechContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TechTag = styled.span`
  background-color: #e0e7ff;
  color: #4a6cf7;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const ProjectLink = styled.a`
  display: inline-block;
  color: #4a6cf7;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;

  &:hover {
    color: #3451b2;
    text-decoration: underline;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  color: #666;
`;

function ProjectsSection({ projects }) {
  if (!projects || projects.length === 0) {
    return (
      <SectionContainer>
        <SectionTitle>Projetos</SectionTitle>
        <EmptyState>
          <p>Nenhum projeto adicionado ainda.</p>
        </EmptyState>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer>
      <SectionTitle>Projects</SectionTitle>
      <ProjectsGrid>
        {projects.map((project, index) => (
          <ProjectCard key={index}>
            <ProjectImage>
              {project.image ? (
                <img src={project.image} alt={project.title} />
              ) : (
                '🚀'
              )}
            </ProjectImage>
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <TechContainer>
                {project.technologies.map((tech, i) => (
                  <TechTag key={i}>{tech}</TechTag>
                ))}
              </TechContainer>
              {project.link && (
                <ProjectLink href={project.link}  rel="noopener noreferrer">
                  See Project →
                </ProjectLink>
              )}
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </SectionContainer>
  );
}

export default ProjectsSection;