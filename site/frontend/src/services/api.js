import axios from 'axios';
const API_BASE_URL = 'https://leveluphub-backend.onrender.com';
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const portfolioService = {
  getPortfolio: async () => {
    try {
      console.log("Fetching portfolio data from:", API_BASE_URL + '/portfolio/');
      const response = await api.get('/portfolio/');
      console.log("Portfolio data received:", response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar portfólio:', error);
      
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      
      throw error;
    }
  },

  savePortfolio: async (portfolioData) => {
    try {
      const response = await api.post('/portfolio/', portfolioData);
      return response.data;
    } catch (error) {
      console.error('Error saving portfólio:', error);
      throw error;
    }
  },

  updatePortfolio: async (portfolioId, portfolioData) => {
    try {
      const response = await api.put(`/portfolio/${portfolioId}/`, portfolioData);
      return response.data;
    } catch (error) {
      console.error('Error updating portfólio:', error);
      throw error;
    }
  },
};

export default api;