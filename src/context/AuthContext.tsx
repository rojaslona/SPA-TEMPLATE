import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (firstName: string, lastName: string, email: string, password: string, phone?: string) => Promise<boolean>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    const savedUser = localStorage.getItem('spa-user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('spa-user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo user for testing
      if (email === 'admin@hbspa.com' && password === 'admin123') {
        const adminUser: User = {
          id: '1',
          email: 'admin@hbspa.com',
          firstName: 'Administrador',
          lastName: 'SPA',
          isAdmin: true,
          createdAt: new Date()
        };
        setUser(adminUser);
        localStorage.setItem('spa-user', JSON.stringify(adminUser));
        return true;
      } else if (email === 'cliente@ejemplo.com' && password === 'cliente123') {
        const clientUser: User = {
          id: '2',
          email: 'cliente@ejemplo.com',
          firstName: 'María',
          lastName: 'García',
          phone: '555-1234',
          isAdmin: false,
          createdAt: new Date()
        };
        setUser(clientUser);
        localStorage.setItem('spa-user', JSON.stringify(clientUser));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    firstName: string, 
    lastName: string, 
    email: string, 
    _password: string, 
    phone?: string
  ): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        email,
        firstName,
        lastName,
        phone,
        isAdmin: false,
        createdAt: new Date()
      };
      
      setUser(newUser);
      localStorage.setItem('spa-user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('spa-user');
  };

  const isAuthenticated = user !== null;
  const isAdmin = user?.isAdmin || false;

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      logout,
      register,
      isAuthenticated,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};