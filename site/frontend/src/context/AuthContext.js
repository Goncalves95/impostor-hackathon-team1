import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Mock for one user to access development environment
const mockUser = {
  id: 'dev-user-123',
  username: 'testuser',
  email: 'test@example.com',
  first_name: 'Test',
  last_name: 'User',
  profile: {
    bio: 'Developer in testing',
    avatar: 'https://via.placeholder.com/150'
  }
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingMockAuth, setUsingMockAuth] = useState(false);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        if (process.env.NODE_ENV === 'development') {
          const useMock = localStorage.getItem('useMockAuth') === 'true';
          
          if (useMock) {
            console.log('🛠️ Using mocked authentication for development');
            setCurrentUser(mockUser);
            setUsingMockAuth(true);
            setLoading(false);
            return;
          }
        }

        const token = localStorage.getItem('token');
        
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Token ${token}`;
          
          try {
            const response = await axios.get('/api/user/');
            setCurrentUser(response.data);
          } catch (err) {
            if (process.env.NODE_ENV === 'development') {
              console.log('🛠️ API failed, using mocked authentication as fallback');
              setCurrentUser(mockUser);
              setUsingMockAuth(true);
            } else {
              throw err;
            }
          }
        }
      } catch (err) {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  const toggleMockAuth = () => {
    if (process.env.NODE_ENV !== 'development') return;
    
    if (usingMockAuth) {
      localStorage.removeItem('useMockAuth');
      setCurrentUser(null);
      setUsingMockAuth(false);
    } else {
      localStorage.setItem('useMockAuth', 'true');
      setCurrentUser(mockUser);
      setUsingMockAuth(true);
    }
  };

  const login = async (username, password) => {
    try {
      if (process.env.NODE_ENV === 'development' && 
          (username === 'test' || username === mockUser.username || username === mockUser.email)) {
        console.log('🛠️ Mocked login for development');
        localStorage.setItem('useMockAuth', 'true');
        setCurrentUser(mockUser);
        setUsingMockAuth(true);
        return mockUser;
      }

      const response = await axios.post('/api/login/', {
        username,
        password
      });
      
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
      
      setCurrentUser(user);
      return user;
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log('🛠️ Login API failed, using mock as fallback');
        localStorage.setItem('useMockAuth', 'true');
        setCurrentUser(mockUser);
        setUsingMockAuth(true);
        return mockUser;
      }
      
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    }
  };

  const register = async (username, email, password) => {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('🛠️ Mocked registration for development');
        return true;
      }

      await axios.post('/api/register/', {
        username,
        email,
        password
      });
      
      return true;
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log('🛠️ Registration API failed, using mock as fallback');
        return true;
      }
      
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    }
  };

  const logout = async () => {
    try {
      if (usingMockAuth) {
        localStorage.removeItem('useMockAuth');
        setCurrentUser(null);
        setUsingMockAuth(false);
        return;
      }

      await axios.post('/api/logout/');
      
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setCurrentUser(null);
    } catch (err) {
      console.error('Logout error:', err);
      localStorage.removeItem('token');
      localStorage.removeItem('useMockAuth');
      delete axios.defaults.headers.common['Authorization'];
      setCurrentUser(null);
      setUsingMockAuth(false);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    usingMockAuth,
    toggleMockAuth,
    isDevelopment: process.env.NODE_ENV === 'development'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      {process.env.NODE_ENV === 'development' && (
        <div style={{ 
          position: 'fixed', 
          bottom: '10px', 
          right: '10px', 
          backgroundColor: '#333', 
          color: 'white', 
          padding: '10px', 
          borderRadius: '5px',
          zIndex: 9999,
          fontSize: '14px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
        }}>
          <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>
            Development Mode
          </div>
          <div style={{ marginBottom: '8px' }}>
            Status: {currentUser ? '✅ Authenticated' : '❌ Not Authenticated'}
          </div>
          <div style={{ marginBottom: '8px' }}>
            Using Mock: {usingMockAuth ? '✅ Yes' : '❌ No'}
          </div>
          <button 
            onClick={toggleMockAuth}
            style={{
              backgroundColor: usingMockAuth ? '#e74c3c' : '#2ecc71',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '3px',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            {usingMockAuth ? 'Disable Mock' : 'Enable Mock'}
          </button>
        </div>
      )}
    </AuthContext.Provider>
  );
};