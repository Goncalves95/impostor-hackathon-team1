import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const HeroSection = styled.section`
  margin: 4rem 0;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 2rem;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: #4a6cf7;
  color: white;
  padding: 1rem 2rem;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3451b2;
  }
`;

const FeaturesSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
`;

const FeatureCard = styled.div`
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const FeatureDescription = styled.p`
  color: #666;
`;

function Home() {
  return (
    <HomeContainer>
      <HeroSection>
        <Title>Mini Portfolio Builder</Title>
        <Subtitle>Create your professional portfolio in minutes</Subtitle>
        <CTAButton to="/builder">Start Now</CTAButton>
      </HeroSection>

      <FeaturesSection>
        <FeatureCard>
          <FeatureTitle>Simple and Fast</FeatureTitle>
          <FeatureDescription>
            Just fill in some basic information and watch your portfolio come to life instantly.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>Projects & Skills</FeatureTitle>
          <FeatureDescription>
            Highlight your best projects and skills to impress recruiters.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>Share Easily</FeatureTitle>
          <FeatureDescription>
            Get a link to share your portfolio with anyone you want.
          </FeatureDescription>
        </FeatureCard>
      </FeaturesSection>
    </HomeContainer>
  );
}

export default Home;