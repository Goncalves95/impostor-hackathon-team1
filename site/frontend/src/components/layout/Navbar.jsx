import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const Nav = styled.nav`
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  margin-left: 1.5rem;
  color: #555;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #4a6cf7;
  }
`;

const Button = styled.button`
  margin-left: 1.5rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s, transform 0.2s;
  background-color: ${props => props.primary ? '#4a6cf7' : 'transparent'};
  color: ${props => props.primary ? 'white' : '#555'};

  &:hover {
    background-color: ${props => props.primary ? '#3451b2' : '#f0f0f0'};
    transform: translateY(-2px);
  }
`;

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">
        <span>📝</span>Level Up Hub
        </Logo>
        
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          
          {currentUser ? (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/builder">Create Portfolio</NavLink>
              <NavLink to="/preview">
            Preview
            </NavLink>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <Button primary onClick={() => navigate('/register')}>Register</Button>
            </>
          )}
        </NavLinks>
      </NavContainer>
    </Nav>
  );
}

export default Navbar;