import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verificar se o usuário já está logado ao carregar a página
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
          // Configurar cabeçalho de autenticação para todas as solicitações
          axios.defaults.headers.common['Authorization'] = `Token ${token}`;
          
          // Obter informações do usuário atual
          const response = await axios.get('/api/user/');
          setCurrentUser(response.data);
        }
      } catch (err) {
        // Se o token for inválido ou expirado, remova-o
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('/api/login/', {
        username,
        password
      });
      
      const { token, user } = response.data;
      
      // Salvar token no localStorage
      localStorage.setItem('token', token);
      
      // Configurar cabeçalho de autenticação para todas as solicitações
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
      
      setCurrentUser(user);
      return user;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    }
  };

  const register = async (username, email, password) => {
    try {
      await axios.post('/api/register/', {
        username,
        email,
        password
      });
      
      // Registro bem-sucedido, mas não loga automaticamente
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/logout/');
      
      // Remover token do localStorage
      localStorage.removeItem('token');
      
      // Remover cabeçalho de autenticação
      delete axios.defaults.headers.common['Authorization'];
      
      setCurrentUser(null);
    } catch (err) {
      console.error('Logout error:', err);
      // Mesmo com erro, limpe o estado do usuário
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setCurrentUser(null);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};