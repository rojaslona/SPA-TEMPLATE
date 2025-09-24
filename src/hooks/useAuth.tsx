import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AuthUser } from '../types';

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: AuthUser } }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'LOAD_USER'; payload: { user: AuthUser } };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    
    case 'LOGIN_SUCCESS':
      return { 
        user: action.payload.user,
        isLoading: false
      };
    
    case 'LOGIN_FAILURE':
      return { 
        user: null,
        isLoading: false
      };
    
    case 'LOGOUT':
      return { 
        user: null,
        isLoading: false
      };
    
    case 'LOAD_USER':
      return {
        user: action.payload.user,
        isLoading: false
      };
    
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null, 
    isLoading: false 
  });

  // Cargar usuario desde localStorage al inicializar
  useEffect(() => {
    const savedUser = localStorage.getItem('hb-spa-user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'LOAD_USER', payload: { user } });
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('hb-spa-user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Simulación de autenticación (en producción sería una llamada a la API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Usuario de prueba para admin
      if (email === 'admin@hbspa.com' && password === 'admin123') {
        const adminUser: AuthUser = {
          id: 'admin-1',
          email: 'admin@hbspa.com',
          name: 'Administrador H&B SPA',
          role: 'admin',
          isAuthenticated: true
        };
        
        localStorage.setItem('hb-spa-user', JSON.stringify(adminUser));
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user: adminUser } });
        return true;
      }
      
      // Usuario de prueba regular
      if (email === 'cliente@ejemplo.com' && password === 'cliente123') {
        const customerUser: AuthUser = {
          id: 'customer-1',
          email: 'cliente@ejemplo.com',
          name: 'Cliente Ejemplo',
          role: 'customer',
          isAuthenticated: true
        };
        
        localStorage.setItem('hb-spa-user', JSON.stringify(customerUser));
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user: customerUser } });
        return true;
      }
      
      // Credenciales incorrectas
      dispatch({ type: 'LOGIN_FAILURE' });
      return false;
      
    } catch (error) {
      console.error('Login error:', error);
      dispatch({ type: 'LOGIN_FAILURE' });
      return false;
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Simulación de registro (en producción sería una llamada a la API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: AuthUser = {
        id: `user-${Date.now()}`,
        email: userData.email,
        name: userData.name,
        role: 'customer',
        isAuthenticated: true
      };
      
      localStorage.setItem('hb-spa-user', JSON.stringify(newUser));
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: newUser } });
      return true;
      
    } catch (error) {
      console.error('Register error:', error);
      dispatch({ type: 'LOGIN_FAILURE' });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('hb-spa-user');
    dispatch({ type: 'LOGOUT' });
  };

  const isAuthenticated = state.user?.isAuthenticated || false;
  const isAdmin = state.user?.role === 'admin' || false;

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}