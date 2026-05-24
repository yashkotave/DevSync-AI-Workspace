import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('devsync_user');
    const storedToken = localStorage.getItem('devsync_token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = ({ user, token }) => {
    setUser(user);
    setToken(token);
    localStorage.setItem('devsync_user', JSON.stringify(user));
    localStorage.setItem('devsync_token', token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('devsync_user');
    localStorage.removeItem('devsync_token');
  };

  const isAuthenticated = Boolean(user && token);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
