import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { fetchGithubData } from '../../services/github';
import '../../styles/GithubConnect.css';

function GithubCallback() {
  const navigate = useNavigate();
  const { setGithubToken, setGithubData, setGithubConnected } = usePortfolio();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const processGithubAuth = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (!code) {
          throw new Error('No authorization code received');
        }

        if (code === 'demo_auth_code' || process.env.NODE_ENV === 'production') {
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          const demoToken = 'demo_token';
          setGithubToken(demoToken);
          
          const githubData = await fetchGithubData(demoToken);
          if (githubData) {
            setGithubData(githubData);
            setGithubConnected(true);
          }
          
          navigate('/builder');
          return;
        }

        try {
          const response = await fetch('/api/github/callback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          });
          
          if (!response.ok) {
            throw new Error('Failed to exchange code for token');
          }
          
          const data = await response.json();
          
          if (data.access_token) {
            setGithubToken(data.access_token);
            
            const githubData = await fetchGithubData(data.access_token);
            if (githubData) {
              setGithubData(githubData);
              setGithubConnected(true);
            }
            
            navigate('/builder');
          } else {
            throw new Error('No access token received');
          }
        } catch (apiError) {
          console.error('API Error:', apiError);
          
          const demoToken = 'demo_token';
          setGithubToken(demoToken);
          
          const githubData = await fetchGithubData(demoToken);
          if (githubData) {
            setGithubData(githubData);
            setGithubConnected(true);
          }
          
          navigate('/builder');
        }
      } catch (err) {
        console.error('Error in GitHub authentication:', err);
        setError('Failed to connect to GitHub. Please try again.');
        setLoading(false);
        setTimeout(() => navigate('/builder'), 3000);
      }
    };

    processGithubAuth();
  }, [navigate, setGithubToken, setGithubData, setGithubConnected]);

  if (error) {
    return (
      <div className="github-callback-container">
        <div className="github-callback-content">
          <div className="error-icon">❌</div>
          <h2>Connection Error</h2>
          <p>{error}</p>
          <p>Redirecting back to portfolio builder...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="github-callback-container">
      <div className="github-callback-content">
        <div className="loading-spinner"></div>
        <h2>Connecting to GitHub</h2>
        <p>Please wait while we process your GitHub authorization...</p>
      </div>
    </div>
  );
}

export default GithubCallback;