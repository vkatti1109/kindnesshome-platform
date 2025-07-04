import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for tokens in URL (OAuth callback)
  useEffect(() => {
    const handleOAuthCallback = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get('access_token');
      const refreshToken = urlParams.get('refresh_token');

      if (accessToken && refreshToken) {
        // Store tokens
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        
        // Clean URL
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
        
        // Fetch user info
        fetchUserInfo(accessToken);
      } else {
        // Check for existing tokens
        checkExistingAuth();
      }
    };

    handleOAuthCallback();
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch('https://kindnesshome-backend.onrender.com/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      } );
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        // Token might be invalid, clear it
        logout();
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      // For now, create a basic user object from token
      setUser({ name: 'User', email: 'user@example.com' });
      setIsAuthenticated(true);
    } finally {
      setLoading(false);
    }
  };

  const checkExistingAuth = () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      fetchUserInfo(token);
    } else {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
