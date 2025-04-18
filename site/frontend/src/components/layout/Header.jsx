import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4a6cf7;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  color: ${props => props.active ? '#4a6cf7' : '#666'};
  text-decoration: none;
  font-weight: ${props => props.active ? '600' : '500'};
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background-color: #4a6cf7;
    transition: width 0.3s;
  }

  &:hover {
    color: #4a6cf7;

    &:after {
      width: 100%;
    }
  }
`;

function Header() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          <span>📝</span> Mini Portfolio Builder
        </Logo>
        <NavLinks>
          <NavLink to="/" active={isActive('/')}>
            Home
          </NavLink>
          <NavLink to="/builder" active={isActive('/builder')}>
            Builder
          </NavLink>
          <NavLink to="/preview" active={isActive('/preview')}>
            Preview
          </NavLink>
        </NavLinks>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header;