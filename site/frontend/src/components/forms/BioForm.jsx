import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { usePortfolio } from '../../context/PortfolioContext';

const FormTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
`;

const Form = styled.form`
  display: grid;
  gap: 1.2rem;
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
  min-height: 100px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4a6cf7;
    outline: none;
  }
`;

function BioForm() {
  const { portfolioData, updateBio } = usePortfolio();
  const [formData, setFormData] = useState(portfolioData.bio);

  useEffect(() => {
    setFormData(portfolioData.bio);
  }, [portfolioData.bio]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlur = () => {
    updateBio(formData);
  };

  return (
    <>
      <FormTitle>Personal Information</FormTitle>
      <Form>
        <FormGroup>
          <Label htmlFor="name">Full Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ex: John Smith"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="title">Professional Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ex: Full Stack Developer"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="about">About Me</Label>
          <TextArea
            id="about"
            name="about"
            value={formData.about}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Write a brief description about yourself and your experience..."
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ex: john.smith@email.com"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="github">GitHub</Label>
          <Input
            type="text"
            id="github"
            name="github"
            value={formData.github}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ex: https://github.com/johnsmith"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            type="text"
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ex: https://linkedin.com/in/johnsmith"
          />
        </FormGroup>
      </Form>
    </>
  );
}

export default BioForm;