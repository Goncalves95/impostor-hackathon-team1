import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { usePortfolio } from '../context/PortfolioContext';
import axios from 'axios';

const DashboardContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #333;
`;

const Button = styled.button`
  padding: 0.7rem 1.2rem;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s, transform 0.2s;
  background-color: ${props => props.primary ? '#4a6cf7' : props.danger ? '#e53e3e' : '#f0f0f0'};
  color: ${props => props.primary || props.danger ? 'white' : '#333'};

  &:hover {
    background-color: ${props => props.primary ? '#3451b2' : props.danger ? '#c53030' : '#e0e0e0'};
    transform: translateY(-2px);
  }

  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const CardTitle = styled.h2`
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 1rem;
`;

const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const PortfolioCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const PortfolioCardImage = styled.div`
  height: 150px;
  background-color: #f0f0f0;
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
`;

const PortfolioCardContent = styled.div`
  padding: 1rem;
`;

const PortfolioCardTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const PortfolioCardDate = styled.p`
  font-size: 0.8rem;
  color: #777;
  margin-bottom: 0.5rem;
`;

const PortfolioCardActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const ProfileStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

const StatCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #4a6cf7;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
`;

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const { portfolioData } = usePortfolio();
  const [savedPortfolios, setSavedPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await axios.get('/api/portfolios/');
        setSavedPortfolios(response.data);
      } catch (err) {
        console.error('Error fetching portfolios:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleCreatePortfolio = () => {
    navigate('/builder');
  };

  const handleViewPortfolio = (id) => {
    navigate(`/preview/${id}`);
  };

  const handleEditPortfolio = (id) => {
    navigate(`/builder/${id}`);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <DashboardContainer>Loading...</DashboardContainer>;
  }

  return (
    <DashboardContainer>
      <Header>
        <Title>Dashboard</Title>
        <div>
          <Button primary onClick={handleCreatePortfolio}>Create New Portfolio</Button>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </Header>

      <Card>
        <CardTitle>Welcome, {currentUser.username}!</CardTitle>
        <p>Manage your portfolio projects and profile settings from this dashboard.</p>

        <ProfileStats>
          <StatCard>
            <StatValue>{savedPortfolios.length}</StatValue>
            <StatLabel>Portfolios</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{portfolioData.projects.length}</StatValue>
            <StatLabel>Projects</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{portfolioData.skills.length}</StatValue>
            <StatLabel>Skills</StatLabel>
          </StatCard>
        </ProfileStats>
      </Card>

      <Card>
        <CardTitle>Your Portfolios</CardTitle>
        {savedPortfolios.length === 0 ? (
          <p>You haven't created any portfolios yet. Click "Create New Portfolio" to get started.</p>
        ) : (
          <PortfolioGrid>
            {savedPortfolios.map((portfolio) => (
              <PortfolioCard key={portfolio.id}>
                <PortfolioCardImage image={portfolio.thumbnail} />
                <PortfolioCardContent>
                  <PortfolioCardTitle>{portfolio.title}</PortfolioCardTitle>
                  <PortfolioCardDate>Created: {formatDate(portfolio.created_at)}</PortfolioCardDate>
                  <PortfolioCardActions>
                    <Button primary onClick={() => handleViewPortfolio(portfolio.id)}>View</Button>
                    <Button onClick={() => handleEditPortfolio(portfolio.id)}>Edit</Button>
                  </PortfolioCardActions>
                </PortfolioCardContent>
              </PortfolioCard>
            ))}
          </PortfolioGrid>
        )}
      </Card>
    </DashboardContainer>
  );
}

export default Dashboard;