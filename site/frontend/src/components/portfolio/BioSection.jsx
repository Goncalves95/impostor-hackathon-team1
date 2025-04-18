import React from 'react';
import styled from 'styled-components';

const BioContainer = styled.section`
  padding: 3rem;
  background-color: #f8f9fa;
  position: relative;
  overflow: hidden;
`;

const BioBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 150px;
  background-color: #4a6cf7;
  z-index: 0;
`;

const BioContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const ProfileImage = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background-color: #e0e7ff;
  border: 5px solid white;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #4a6cf7;
`;

const BioInfo = styled.div`
  flex-grow: 1;
`;

const Name = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.3rem;
  color: #333;
`;

const Title = styled.h2`
  font-size: 1.3rem;
  color: #4a6cf7;
  margin-bottom: 1.5rem;
  font-weight: 500;
`;

const AboutText = styled.p`
  color: #555;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #555;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #4a6cf7;
  }
`;

function BioSection({ bio }) {
  // Pega as iniciais do nome para exibir na imagem de perfil se não houver imagem
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <BioContainer>
      <BioBackground />
      <BioContent>
        <ProfileImage>
          {getInitials(bio.name)}
        </ProfileImage>
        <BioInfo>
          <Name>{bio.name || "Seu Nome"}</Name>
          <Title>{bio.title || "Seu Título Profissional"}</Title>
          <AboutText>
            {bio.about || "Nenhuma informação adicionada ainda."}
          </AboutText>
          <SocialLinks>
            {bio.email && (
              <SocialLink href={`mailto:${bio.email}`}  rel="noopener noreferrer">
                ✉️ Email
              </SocialLink>
            )}
            {bio.github && (
              <SocialLink href={bio.github}  rel="noopener noreferrer">
                🐙 GitHub
              </SocialLink>
            )}
            {bio.linkedin && (
              <SocialLink href={bio.linkedin}  rel="noopener noreferrer">
                🔗 LinkedIn
              </SocialLink>
            )}
          </SocialLinks>
        </BioInfo>
      </BioContent>
    </BioContainer>
  );
}

export default BioSection;