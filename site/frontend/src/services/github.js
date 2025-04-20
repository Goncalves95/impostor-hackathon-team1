const GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID || 'your_default_client_id';

const isDev = process.env.NODE_ENV === 'development';
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI || 
                    (isDev ? 'http://localhost:3000/github/callback' : 
                             window.location.origin + '/github/callback');

const isDemo = !GITHUB_CLIENT_ID || GITHUB_CLIENT_ID === 'your_default_client_id';

export const MOCK_GITHUB_DATA = {
  user: {
    login: 'demo-user',
    name: 'Demo Developer',
    avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
    html_url: 'https://github.com/demo-user',
    bio: 'Full-stack developer passionate about React, Node.js and web technologies',
    public_repos: 15,
    followers: 45
  },
  repos: [
    {
      id: 1,
      name: 'portfolio-website',
      description: 'Personal portfolio website built with React and TailwindCSS',
      html_url: 'https://github.com/demo-user/portfolio-website',
      language: 'JavaScript',
      stargazers_count: 12,
      forks_count: 4,
      updated_at: '2023-09-10T15:37:12Z'
    },
    {
      id: 2,
      name: 'task-manager-api',
      description: 'RESTful API for task management built with Node.js and Express',
      html_url: 'https://github.com/demo-user/task-manager-api',
      language: 'JavaScript',
      stargazers_count: 8,
      forks_count: 2,
      updated_at: '2023-10-05T09:22:41Z'
    },
    {
      id: 3,
      name: 'weather-dashboard',
      description: 'Weather dashboard application using OpenWeather API',
      html_url: 'https://github.com/demo-user/weather-dashboard',
      language: 'JavaScript',
      stargazers_count: 5,
      forks_count: 1,
      updated_at: '2023-11-15T18:43:09Z'
    }
  ],
  languages: [
    { name: 'JavaScript', percentage: 65 },
    { name: 'HTML', percentage: 15 },
    { name: 'CSS', percentage: 12 },
    { name: 'Python', percentage: 8 }
  ]
};

export const initiateGithubLogin = () => {
  if (isDemo) {
    window.location.href = `${REDIRECT_URI}?code=demo_auth_code`;
    return;
  }
  
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=repo,user`;
  window.location.href = githubAuthUrl;
};

export const fetchGithubData = async (token) => {
  if (token === 'demo_token' || isDemo) {
    return MOCK_GITHUB_DATA;
  }
  
  try {
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return null;
  }
};