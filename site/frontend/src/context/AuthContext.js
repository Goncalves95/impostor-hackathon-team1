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
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDevTools, setShowDevTools] = useState(false);
  
  // Automatically use local auth in production if no backend available
  const [useLocalAuth, setUseLocalAuth] = useState(() => {
    const saved = localStorage.getItem('useLocalAuth');
    return saved !== null 
      ? saved === 'true' 
      : process.env.NODE_ENV === 'production'; // Default to local auth in production
  });
  
  // For development immediate mock login
  const isDevMode = process.env.NODE_ENV === 'development';
  const isAutoMockEnabled = isDevMode && localStorage.getItem('useMockAuth') === 'true';

  // Detect API availability to switch modes automatically
  const checkApiAvailability = async () => {
    try {
      // Make a simple OPTIONS request to check API availability
      await axios.options('/api/health-check/');
      return true;
    } catch (err) {
      console.warn('API seems unavailable, using local authentication');
      return false;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        // For automatic mock in development
        if (isDevMode && isAutoMockEnabled) {
          console.log('🛠️ Using auto-mocked authentication for development');
          setCurrentUser(demoUser);
          setLoading(false);
          return;
        }
        
        // First, check if we're in production and if API is available
        if (process.env.NODE_ENV === 'production') {
          const apiAvailable = await checkApiAvailability();
          
          if (!apiAvailable) {
            setUseLocalAuth(true);
            localStorage.setItem('useLocalAuth', 'true');
          }
        }
        
        // If using real API auth
        if (!useLocalAuth) {
          const token = localStorage.getItem('token');
          
          if (token) {
            try {
              // Set the token in headers
              axios.defaults.headers.common['Authorization'] = `Token ${token}`;
              
              // Try to get user data
              const response = await axios.get('/api/user/');
              setCurrentUser(response.data);
              setLoading(false);
              return;
            } catch (err) {
              // If API call fails, switch to local auth in production
              console.warn('API auth failed, switching to local auth');
              setUseLocalAuth(true);
              localStorage.setItem('useLocalAuth', 'true');
              
              // Clean up token
              localStorage.removeItem('token');
              delete axios.defaults.headers.common['Authorization'];
            }
          }
        }
        
        // Local auth flow
        if (useLocalAuth) {
          const savedUser = localStorage.getItem('localUser');
          
          if (savedUser) {
            setCurrentUser(JSON.parse(savedUser));
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
    
    // Set up dev tools keyboard shortcut
    const handleKeyDown = (e) => {
      // Ctrl + Shift + D to toggle dev tools
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setShowDevTools(prev => !prev);
        e.preventDefault();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDevMode, isAutoMockEnabled, useLocalAuth]);

  const login = async (username, password) => {
    try {
      setError(null);
      
      // For development auto-mock
      if (isDevMode && isAutoMockEnabled) {
        return demoUser;
      }
      
      // For local auth (or when API is unavailable)
      if (useLocalAuth) {
        // First try exact match with predefined users
        const user = predefinedUsers.find(u => 
          (u.username === username || u.email === username) && password === `${username}123`
        );
        
        if (user) {
          localStorage.setItem('localUser', JSON.stringify(user));
          setCurrentUser(user);
          return user;
        }
        
        // If no match with predefined users, check for previously registered local users
        const localUsers = JSON.parse(localStorage.getItem('localUsers') || '[]');
        const localUser = localUsers.find(u => 
          (u.username === username || u.email === username) && u.password === password
        );
        
        if (localUser) {
          // Remove password before storing in state
          const { password, ...userWithoutPassword } = localUser;
          localStorage.setItem('localUser', JSON.stringify(userWithoutPassword));
          setCurrentUser(userWithoutPassword);
          return userWithoutPassword;
        }
        
        // No user found
        throw new Error('Invalid username or password');
      }
      
      // Using real API auth
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
        // If API call fails with 405 Method Not Allowed or other network error
        if (err.response?.status === 405 || !err.response) {
          console.warn('API login failed, switching to local auth');
          setUseLocalAuth(true);
          localStorage.setItem('useLocalAuth', 'true');
          
          // Try again with local auth
          return login(username, password);
        }
        
        // Other API errors (like invalid credentials)
        throw new Error(err.response?.data?.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const register = async (username, email, password) => {
    try {
      setError(null);
      
      // For local auth (or when API is unavailable)
      if (useLocalAuth) {
        // Check if username or email already exists in predefined users
        const predefinedExists = predefinedUsers.some(u => 
          u.username === username || u.email === email
        );
        
        if (predefinedExists) {
          throw new Error('Username or email already exists');
        }
        
        // Check if username or email already exists in local users
        const localUsers = JSON.parse(localStorage.getItem('localUsers') || '[]');
        const localExists = localUsers.some(u => 
          u.username === username || u.email === email
        );
        
        if (localExists) {
          throw new Error('Username or email already exists');
        }
        
        // Create new user
        const newUser = {
          id: `user-${Date.now()}`,
          username,
          email,
          password, // Store password for local auth only
          first_name: '',
          last_name: '',
          role: 'user',
          profile: {
            bio: '',
            avatar: 'https://via.placeholder.com/150'
          }
        };
        
        // Add to local users
        localUsers.push(newUser);
        localStorage.setItem('localUsers', JSON.stringify(localUsers));
        
        // Don't auto-login after registration
        return true;
      }
      
      // Using real API auth
      try {
        await axios.post('/api/register/', {
          username,
          email,
          password
        });
        
        return true;
      } catch (err) {
        // If API call fails with 405 Method Not Allowed or other network error
        if (err.response?.status === 405 || !err.response) {
          console.warn('API registration failed, switching to local auth');
          setUseLocalAuth(true);
          localStorage.setItem('useLocalAuth', 'true');
          
          // Try again with local auth
          return register(username, email, password);
        }
        
        // Other API errors (like validation errors)
        throw new Error(err.response?.data?.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = () => {
    // Clear authentication data regardless of mode
    localStorage.removeItem('token');
    localStorage.removeItem('localUser');
    delete axios.defaults.headers.common['Authorization'];
    setCurrentUser(null);
    
    // Don't try API logout if using local auth
    if (!useLocalAuth) {
      // Try API logout but don't wait for it or handle errors
      axios.post('/api/logout/').catch(() => {
        // Silent catch - we don't care if this fails
      });
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
    isUsingLocalAuth: useLocalAuth
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
            Mode: {useLocalAuth ? '🔒 Local Auth' : '🌐 API Auth'}
          </div>
          <div style={{ marginBottom: '8px' }}>
            Environment: {process.env.NODE_ENV}
          </div>
          <div style={{ marginBottom: '8px' }}>
            User: {currentUser?.username || 'None'}
          </div>
          <div style={{ marginBottom: '8px' }}>
            Role: {currentUser?.role || 'None'}
          </div>
          
          {isDevMode && (
            <button 
              onClick={() => {
                const current = localStorage.getItem('useMockAuth') === 'true';
                localStorage.setItem('useMockAuth', current ? 'false' : 'true');
                window.location.reload();
              }}
              style={{
                backgroundColor: isAutoMockEnabled ? '#e74c3c' : '#2ecc71',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '3px',
                cursor: 'pointer',
                width: '100%',
                marginBottom: '8px'
              }}
            >
              {isAutoMockEnabled ? 'Disable Auto-Mock' : 'Enable Auto-Mock'}
            </button>
          )}
          
          <button 
            onClick={() => {
              setUseLocalAuth(!useLocalAuth);
              localStorage.setItem('useLocalAuth', !useLocalAuth ? 'true' : 'false');
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
            {useLocalAuth ? 'Try API Auth' : 'Use Local Auth'}
          </button>
        </div>
      )}
    </AuthContext.Provider>
  );
};