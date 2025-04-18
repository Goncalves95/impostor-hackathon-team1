import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  padding: 2rem;
  border-top: 1px solid #e0e0e0;
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Copyright = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

const TeamInfo = styled.p`
  color: #999;
  font-size: 0.85rem;
  margin-top: 0.5rem;
`;

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>
          © {currentYear} Mini Portfolio Builder. All rights reserved.
        </Copyright>
        <TeamInfo>
          Developed with ❤️ by the Hackathon team
        </TeamInfo>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer;