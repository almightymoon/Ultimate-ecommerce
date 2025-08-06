"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  preferences?: {
    theme?: 'light' | 'dark' | 'system';
    notifications?: boolean;
    marketing?: boolean;
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
}

type AuthAction =
  | { type: 'LOGIN'; payload: { user: User; token: string } }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'INITIALIZE'; payload: { user: User | null; token: string | null } };

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  isInitialized: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'INITIALIZE':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: !!action.payload.user && !!action.payload.token,
        isLoading: false,
        isInitialized: true,
      };

    default:
      return state;
  }
}

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  refreshToken: () => Promise<void>;
  checkAuth: () => boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      // Skip auth initialization on admin pages
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
        console.log('🚫 Skipping AuthContext on admin page');
        return;
      }

      try {
        const token = localStorage.getItem('ultimate-ecommerce-token');
        
        if (token) {
          const decoded = jwtDecode(token) as { exp?: number };
          const currentTime = Date.now() / 1000;
          
          if (decoded.exp && decoded.exp > currentTime) {
            // Token is valid, fetch user data
            try {
              const response = await fetch('/api/auth/me', {
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
              });
              
              if (response.ok) {
                const user = await response.json();
                dispatch({ type: 'INITIALIZE', payload: { user, token } });
              } else if (response.status === 404) {
                // User not found, but don't treat as error - just clear token
                console.log('User not found in database, clearing token');
                localStorage.removeItem('ultimate-ecommerce-token');
                dispatch({ type: 'INITIALIZE', payload: { user: null, token: null } });
              } else {
                // Token is invalid, remove it
                localStorage.removeItem('ultimate-ecommerce-token');
                dispatch({ type: 'INITIALIZE', payload: { user: null, token: null } });
              }
            } catch (error: unknown) {
              // Network error or other issue, clear token
              console.log('Error fetching user data, clearing token');
              localStorage.removeItem('ultimate-ecommerce-token');
              dispatch({ type: 'INITIALIZE', payload: { user: null, token: null } });
            }
          } else {
            // Token expired, remove it
            localStorage.removeItem('ultimate-ecommerce-token');
            dispatch({ type: 'INITIALIZE', payload: { user: null, token: null } });
          }
        } else {
          dispatch({ type: 'INITIALIZE', payload: { user: null, token: null } });
        }
      } catch (error: unknown) {
        console.error('Error initializing auth:', error);
        localStorage.removeItem('ultimate-ecommerce-token');
        dispatch({ type: 'INITIALIZE', payload: { user: null, token: null } });
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // For demo purposes, allow login with demo credentials even if API fails
      if (email === 'demo@ultimate.com' && password === 'demo123456') {
        const demoUser = {
          id: 'demo-user-id',
          name: 'Demo User',
          email: 'demo@ultimate.com',
          role: 'user' as const,
          preferences: {
            theme: 'light' as const,
            notifications: true,
            marketing: false,
          },
        };
        
        const demoToken = 'demo-token-' + Date.now();
        
        localStorage.setItem('ultimate-ecommerce-token', demoToken);
        dispatch({ type: 'LOGIN', payload: { user: demoUser, token: demoToken } });
        
        toast.success(`Welcome back, ${demoUser.name}!`);
        return;
      }
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      const { user, token } = data;
      
      console.log('Login response user data:', user);
      
      // Ensure user has a name, fallback to email if not
      const userName = user.name || user.email?.split('@')[0] || 'User';
      
      localStorage.setItem('ultimate-ecommerce-token', token);
      dispatch({ type: 'LOGIN', payload: { user, token } });
      
      toast.success(`Welcome back, ${userName}!`);
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error instanceof Error ? error.message : 'Login failed');
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      const { user, token } = data;
      
      console.log('Register response user data:', user);
      
      // Ensure user has a name, fallback to email if not
      const userName = user.name || user.email?.split('@')[0] || 'User';
      
      localStorage.setItem('ultimate-ecommerce-token', token);
      dispatch({ type: 'LOGIN', payload: { user, token } });
      
      toast.success(`Welcome to UltimateEcommerce, ${userName}!`);
    } catch (error) {
      console.error('Registration error:', error);
      // For demo purposes, create a local user if API fails
      const demoUser = {
        id: 'demo-user-' + Date.now(),
        name: userData.name,
        email: userData.email,
        role: 'user' as const,
        preferences: {
          theme: 'light' as const,
          notifications: true,
          marketing: false,
        },
      };
      
      const demoToken = 'demo-token-' + Date.now();
      
      localStorage.setItem('ultimate-ecommerce-token', demoToken);
      dispatch({ type: 'LOGIN', payload: { user: demoUser, token: demoToken } });
      
      toast.success(`Welcome to UltimateEcommerce, ${demoUser.name}!`);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = () => {
    localStorage.removeItem('ultimate-ecommerce-token');
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully');
  };

  const updateUser = (updates: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: updates });
  };

  const refreshToken = async () => {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${state.token}`,
        },
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('ultimate-ecommerce-token', token);
        // Update token in state without changing user
        dispatch({ type: 'LOGIN', payload: { user: state.user!, token } });
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
    }
  };

  const checkAuth = (): boolean => {
    if (!state.token) return false;
    
    try {
      const decoded = jwtDecode(state.token) as { exp?: number };
      const currentTime = Date.now() / 1000;
      
      if (decoded.exp && decoded.exp <= currentTime) {
        logout();
        return false;
      }
      
      return true;
    } catch (error) {
      logout();
      return false;
    }
  };

  const value: AuthContextType = {
    state,
    login,
    register,
    logout,
    updateUser,
    refreshToken,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 