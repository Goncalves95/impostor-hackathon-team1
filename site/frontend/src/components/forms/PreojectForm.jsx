import React, { useState } from 'react';
import styled from 'styled-components';
import { usePortfolio } from '../../context/PortfolioContext';

const FormTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
`;

const ProjectsList = styled.div`
  margin-bottom: 2rem;
`;

const ProjectCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProjectInfo = styled.div`
  flex-grow: 1;
`;

const ProjectTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
`;

const ProjectDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechTag = styled.span`
  background-color: #e0e7ff;
  color: #4a6cf7;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${props => props.danger ? '#e53e3e' : '#4a6cf7'};
  font-size: 1.1rem;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const Form = styled.form`
  display: grid;
  gap: 1.2rem;
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #444;
`;

const Input = styled.input`
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

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  resize: vertical;
  min-height: 80px;
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

function ProjectForm() {
  const { portfolioData, addProject, updateProject, removeProject } = usePortfolio();
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    link: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Transform the technologies string into an array
    const project = {
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech)
    };

    if (editing !== null) {
      updateProject(editing, project);
      setEditing(null);
    } else {
      addProject(project);
    }

    // Clear the form
    setFormData({
      title: '',
      description: '',
      technologies: '',
      link: '',
      image: ''
    });
  };

  const handleEdit = (index) => {
    const project = portfolioData.projects[index];
    setFormData({
      ...project,
      technologies: project.technologies.join(', ')
    });
    setEditing(index);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      removeProject(index);
    }
  };

  return (
    <>
      <FormTitle>My Projects</FormTitle>
      
      <ProjectsList>
        {portfolioData.projects.length === 0 ? (
          <p>No projects added yet. Add your first project below.</p>
        ) : (
          portfolioData.projects.map((project, index) => (
            <ProjectCard key={index}>
              <ProjectInfo>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <ProjectTech>
                  {project.technologies.map((tech, i) => (
                    <TechTag key={i}>{tech}</TechTag>
                  ))}
                </ProjectTech>
              </ProjectInfo>
              <ButtonsContainer>
                <IconButton onClick={() => handleEdit(index)}>
                  ✏️
                </IconButton>
                <IconButton danger onClick={() => handleDelete(index)}>
                  🗑️
                </IconButton>
              </ButtonsContainer>
            </ProjectCard>
          ))
        )}
      </ProjectsList>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Project Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ex: Sustainable Products E-commerce"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Briefly describe the project and your contribution..."
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="technologies">Technologies Used</Label>
          <Input
            type="text"
            id="technologies"
            name="technologies"
            value={formData.technologies}
            onChange={handleChange}
            placeholder="Ex: React, Node.js, MongoDB (separated by commas)"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="link">Project Link</Label>
          <Input
            type="url"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="Ex: https://github.com/username/project"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="image">Image Link</Label>
          <Input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="URL of an image that represents the project"
          />
        </FormGroup>

        <Button type="submit">
          {editing !== null ? 'Update Project' : 'Add Project'}
        </Button>
      </Form>
    </>
  );
}

export default ProjectForm;