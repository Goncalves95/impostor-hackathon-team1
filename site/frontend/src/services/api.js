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
      const response = await api.get('/portfolio/');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar portfólio:', error);
      throw error;
    }
  },

  savePortfolio: async (portfolioData) => {
    try {
      const response = await api.post('/portfolio/', portfolioData);
      return response.data;
    } catch (error) {
      console.error('Erro ao salvar portfólio:', error);
      throw error;
    }
  },

  updatePortfolio: async (portfolioId, portfolioData) => {
    try {
      const response = await api.put(`/portfolio/${portfolioId}/`, portfolioData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar portfólio:', error);
      throw error;
    }
  },
};

export default api;