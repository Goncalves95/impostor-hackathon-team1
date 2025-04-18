import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';

function GithubCallback() {
  const navigate = useNavigate();
  const { setGithubToken } = usePortfolio();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      fetch('/api/github/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.access_token) {
            setGithubToken(data.access_token);
            navigate('/builder');
          }
        })
        .catch(error => {
          console.error('Error getting GitHub token:', error);
          navigate('/builder');
        });
    } else {
      navigate('/builder');
    }
  }, [navigate, setGithubToken]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Connecting to GitHub...</h2>
      <p>Please wait while we process your GitHub authorization.</p>
    </div>
  );
}

export default GithubCallback;