import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Mock users for production/development preview
const adminUser = {
  id: 'admin-user-123',
  username: 'admin',
  email: 'admin@portfolio.com',
  first_name: 'Admin',
  last_name: 'User',
  role: 'admin',
  profile: {
    bio: 'System Administrator',
    avatar: 'https://via.placeholder.com/150'
  }
};

const demoUser = {
  id: 'demo-user-123',
  username: 'demo',
  email: 'demo@portfolio.com',
  first_name: 'Demo',
  last_name: 'User',
  role: 'user',
  profile: {
    bio: 'Portfolio creator enthusiast',
    avatar: 'https://via.placeholder.com/150'
  }
};

// List of predefined users that can "login" without a backend
const predefinedUsers = [
  adminUser,
  demoUser,
  // Add more demo accounts as needed
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDevTools, setShowDevTools] = useState(false);
  
  // Check if we're in dev mode with immediate mock login or production mode with demo login
  const isDevMode = process.env.NODE_ENV === 'development';
  const isImmediateMockLogin = isDevMode && localStorage.getItem('useMockAuth') === 'true';
  const isUsingLocalAuth = !isDevMode || localStorage.getItem('useLocalAuth') === 'true';

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        // For immediate mock login in development
        if (isImmediateMockLogin) {
          console.log('🛠️ Using mocked authentication for development');
          setCurrentUser(predefinedUsers[1]); // Using demo user by default
          setLoading(false);
          return;
        }

        // Check if we should try real API or use local auth
        if (!isUsingLocalAuth) {
          const token = localStorage.getItem('token');
          
          if (token) {
            axios.defaults.headers.common['Authorization'] = `Token ${token}`;
            
            try {
              const response = await axios.get('/api/user/');
              setCurrentUser(response.data);
              setLoading(false);
              return;
            } catch (err) {
              // API failed - fall back to local auth in production
              if (!isDevMode) {
                localStorage.setItem('useLocalAuth', 'true');
                // Continue with local auth flow
              } else {
                // In dev, just clear auth and show login screen
                localStorage.removeItem('token');
                delete axios.defaults.headers.common['Authorization'];
                setLoading(false);
                return;
              }
            }
          }
        }
        
        // Local authentication flow
        const localUser = localStorage.getItem('localUser');
        if (localUser) {
          setCurrentUser(JSON.parse(localUser));
        }
      } catch (err) {
        console.error('Authentication error:', err);
        // Clear any auth tokens
        localStorage.removeItem('token');
        localStorage.removeItem('localUser');
        delete axios.defaults.headers.common['Authorization'];
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
    
    // Enable dev tools with secret key combination
    const handleKeyDown = (e) => {
      // Ctrl + Shift + D to toggle dev tools
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setShowDevTools(prev => !prev);
        e.preventDefault();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDevMode, isImmediateMockLogin, isUsingLocalAuth]);

  const toggleMockAuth = () => {
    if (!isDevMode) return;
    
    if (isImmediateMockLogin) {
      localStorage.removeItem('useMockAuth');
      setCurrentUser(null);
    } else {
      localStorage.setItem('useMockAuth', 'true');
      setCurrentUser(predefinedUsers[1]); // Using demo user by default
    }
  };

  const login = async (username, password) => {
    try {
      // Reset previous errors
      setError(null);
      
      // For development immediate mock
      if (isDevMode && isImmediateMockLogin) {
        return predefinedUsers[1]; // Using demo user by default
      }
      
      // Try using predefined users for local auth
      if (isUsingLocalAuth) {
        // Find matching predefined user
        const user = predefinedUsers.find(u => 
          (u.username === username || u.email === username) && password === `${username}123`
        );
        
        if (user) {
          localStorage.setItem('localUser', JSON.stringify(user));
          setCurrentUser(user);
          return user;
        } else {
          throw new Error('Invalid username or password');
        }
      }
      
      // Try real API
      try {
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
        // If API fails in production, fall back to local auth
        if (!isDevMode) {
          localStorage.setItem('useLocalAuth', 'true');
          
          // Try local auth
          return login(username, password);
        }
        
        throw err;
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
      throw err;
    }
  };

  const register = async (username, email, password) => {
    try {
      // Reset previous errors
      setError(null);
      
      // For local auth, just create a new user in localStorage
      if (isUsingLocalAuth) {
        // Check if username/email already exists
        const exists = predefinedUsers.some(u => 
          u.username === username || u.email === email
        );
        
        if (exists) {
          throw new Error('Username or email already exists');
        }
        
        // Create new user
        const newUser = {
          id: `user-${Date.now()}`,
          username,
          email,
          first_name: '',
          last_name: '',
          role: 'user',
          profile: {
            bio: '',
            avatar: 'https://via.placeholder.com/150'
          }
        };
        
        // Store in localStorage
        localStorage.setItem('localUser', JSON.stringify(newUser));
        setCurrentUser(newUser);
        return true;
      }
      
      // Try real API
      try {
        await axios.post('/api/register/', {
          username,
          email,
          password
        });
        
        return true;
      } catch (err) {
        // If API fails in production, fall back to local auth
        if (!isDevMode) {
          localStorage.setItem('useLocalAuth', 'true');
          
          // Try local auth
          return register(username, email, password);
        }
        
        throw err;
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
      throw err;
    }
  };

  const logout = async () => {
    try {
      // For local auth, just remove from localStorage
      if (isUsingLocalAuth) {
        localStorage.removeItem('localUser');
        setCurrentUser(null);
        return;
      }
      
      // Try real API
      try {
        await axios.post('/api/logout/');
      } catch (err) {
        // Ignore error, proceed with logout
        console.warn('Logout API error (continuing):', err);
      }
      
      // Clean up regardless of API success
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setCurrentUser(null);
    } catch (err) {
      console.error('Logout error:', err);
      // Force logout on any error
      localStorage.removeItem('token');
      localStorage.removeItem('localUser');
      delete axios.defaults.headers.common['Authorization'];
      setCurrentUser(null);
    }
  };

  const isAdmin = () => {
    return currentUser?.role === 'admin';
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    isAdmin,
    isDevelopment: isDevMode
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      {showDevTools && (
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
            Development Tools (Ctrl+Shift+D)
          </div>
          <div style={{ marginBottom: '8px' }}>
            Status: {currentUser ? '✅ Authenticated' : '❌ Not Authenticated'}
          </div>
          <div style={{ marginBottom: '8px' }}>
            Mode: {isUsingLocalAuth ? '🔒 Local Auth' : '🌐 API Auth'}
          </div>
          <div style={{ marginBottom: '8px' }}>
            User: {currentUser?.username || 'None'}
          </div>
          <div style={{ marginBottom: '8px' }}>
            Role: {currentUser?.role || 'None'}
          </div>
          
          {isDevMode && (
            <button 
              onClick={toggleMockAuth}
              style={{
                backgroundColor: isImmediateMockLogin ? '#e74c3c' : '#2ecc71',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '3px',
                cursor: 'pointer',
                width: '100%',
                marginBottom: '8px'
              }}
            >
              {isImmediateMockLogin ? 'Disable Auto-Mock' : 'Enable Auto-Mock'}
            </button>
          )}
          
          <button 
            onClick={() => {
              localStorage.setItem('useLocalAuth', isUsingLocalAuth ? 'false' : 'true');
              window.location.reload();
            }}
            style={{
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '3px',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            {isUsingLocalAuth ? 'Try API Auth' : 'Use Local Auth'}
          </button>
        </div>
      )}
    </AuthContext.Provider>
  );
};