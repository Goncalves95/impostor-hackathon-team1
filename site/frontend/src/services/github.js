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
      updated_at: '2023-09-10T15:37:12Z',
      image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=1770&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'task-manager-api',
      description: 'RESTful API for task management built with Node.js and Express',
      html_url: 'https://github.com/demo-user/task-manager-api',
      language: 'JavaScript',
      stargazers_count: 8,
      forks_count: 2,
      updated_at: '2023-10-05T09:22:41Z',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1772&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'weather-dashboard',
      description: 'Weather dashboard application using OpenWeather API',
      html_url: 'https://github.com/demo-user/weather-dashboard',
      language: 'JavaScript',
      stargazers_count: 5,
      forks_count: 1,
      updated_at: '2023-11-15T18:43:09Z',
      image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 4,
      name: 'e-commerce-platform',
      description: 'Full-featured online store with shopping cart and payment processing',
      html_url: 'https://github.com/demo-user/e-commerce-platform',
      language: 'TypeScript',
      stargazers_count: 15,
      forks_count: 3,
      updated_at: '2023-12-01T10:12:33Z',
      image: 'https://images.unsplash.com/photo-1556742031-c6961e8560b0?q=80&w=1770&auto=format&fit=crop'
    },
    {
      id: 5,
      name: 'chat-application',
      description: 'Real-time chat application with Socket.io and React',
      html_url: 'https://github.com/demo-user/chat-application',
      language: 'JavaScript',
      stargazers_count: 10,
      forks_count: 2,
      updated_at: '2023-11-20T14:25:10Z',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1674&auto=format&fit=crop'
    },
    {
      id: 6,
      name: 'blog-platform',
      description: 'A content management system for blogs with user authentication',
      html_url: 'https://github.com/demo-user/blog-platform',
      language: 'JavaScript',
      stargazers_count: 7,
      forks_count: 1,
      updated_at: '2023-10-15T08:45:22Z',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1770&auto=format&fit=crop' 
    },
    {
      id: 7,
      name: 'data-visualization-dashboard',
      description: 'Interactive data visualization dashboard using D3.js and React',
      html_url: 'https://github.com/demo-user/data-visualization-dashboard',
      language: 'JavaScript',
      stargazers_count: 9,
      forks_count: 2,
      updated_at: '2023-09-25T11:32:45Z',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1770&auto=format&fit=crop'
    {
      id: 8,
      name: 'fitness-tracker',
      description: 'Mobile app for tracking workouts and fitness progress',
      html_url: 'https://github.com/demo-user/fitness-tracker',
      language: 'TypeScript',
      stargazers_count: 6,
      forks_count: 1,
      updated_at: '2023-11-05T15:18:09Z',
      image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=1974&auto=format&fit=crop'
    }
  ],
  languages: [
    { name: 'JavaScript', percentage: 65 },
    { name: 'TypeScript', percentage: 15 },
    { name: 'HTML', percentage: 10 },
    { name: 'CSS', percentage: 8 },
    { name: 'Python', percentage: 2 }
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