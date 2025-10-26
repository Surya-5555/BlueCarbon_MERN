import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient, AuthResponse } from '@/lib/api';

export type UserRole = 'user' | 'ngo' | 'admin' | 'verifier';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('bluecarbon_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data: AuthResponse = await apiClient.login(email, password);

      if (data.success && data.data) {
        const user: User = {
          id: data.data.user.id,
          email: data.data.user.email,
          name: data.data.user.name,
          role: data.data.user.role as UserRole,
        };
        setUser(user);
        localStorage.setItem('bluecarbon_user', JSON.stringify(user));
        localStorage.setItem('bluecarbon_token', data.data.token);
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string, role: UserRole) => {
    try {
      const data: AuthResponse = await apiClient.register(email, password, name, role);

      if (data.success && data.data) {
        const user: User = {
          id: data.data.user.id,
          email: data.data.user.email,
          name: data.data.user.name,
          role: data.data.user.role as UserRole,
        };
        setUser(user);
        localStorage.setItem('bluecarbon_user', JSON.stringify(user));
        localStorage.setItem('bluecarbon_token', data.data.token);
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Call backend logout endpoint if token exists
      const token = localStorage.getItem('bluecarbon_token');
      if (token) {
        await apiClient.logout();
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Continue with client-side logout even if backend call fails
    } finally {
      // Always clear local state and storage
      setUser(null);
      localStorage.removeItem('bluecarbon_user');
      localStorage.removeItem('bluecarbon_token');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
