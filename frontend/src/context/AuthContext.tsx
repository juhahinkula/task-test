import { useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { authService } from '../services/authService';
import { AuthContext } from './AuthContextDefinition';

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    const isAuth = authService.isAuthenticated();
    setUser(currentUser);
    setIsAuthenticated(isAuth);
  }, []);

  const login = (userData: User) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Login called without valid token');
      return;
    }
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = { user, isAuthenticated, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}