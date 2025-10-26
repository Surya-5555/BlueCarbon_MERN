import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import io from 'socket.io-client';
import { apiClient, AuthResponse, UserResponse } from '@/lib/api';

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
  refreshUserData: () => Promise<void>;
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
  const [socket, setSocket] = useState<any>(null);

  // Initialize WebSocket connection
  useEffect(() => {
    const token = localStorage.getItem('bluecarbon_token');
    if (token) {
      const newSocket = io('http://localhost:5000', {
        auth: {
          token: token
        }
      });
      
      setSocket(newSocket);

      // Handle role updates
      newSocket.on('role-updated', (data) => {
        console.log('Role updated:', data);
        if (user && user.id === data.userId) {
          setUser(prevUser => prevUser ? {
            ...prevUser,
            role: data.newRole as UserRole
          } : null);
          
          // Update localStorage
          const updatedUser = { ...user, role: data.newRole as UserRole };
          localStorage.setItem('bluecarbon_user', JSON.stringify(updatedUser));
          
          // Show notification
          console.log(`Your role has been changed from ${data.oldRole} to ${data.newRole}`);
        }
      });

      // Handle status updates
      newSocket.on('status-updated', (data) => {
        console.log('Status updated:', data);
        if (user && user.id === data.userId) {
          if (!data.isActive) {
            // User deactivated, logout
            logout();
          }
        }
      });

      return () => {
        newSocket.close();
      };
    }
  }, [user]);

  // Join user room when user is set
  useEffect(() => {
    if (socket && user) {
      socket.emit('join-user-room', user.id);
    }
  }, [socket, user]);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('bluecarbon_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Refresh user data from server
  const refreshUserData = async () => {
    try {
      const data: UserResponse = await apiClient.getMe();
      if (data.success && data.data && data.data.user) {
        const updatedUser: User = {
          id: data.data.user.id,
          email: data.data.user.email,
          name: data.data.user.name,
          role: data.data.user.role as UserRole,
        };
        setUser(updatedUser);
        localStorage.setItem('bluecarbon_user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Failed to refresh user data:', error);
    }
  };

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
      
      // Close WebSocket connection
      if (socket) {
        socket.close();
        setSocket(null);
      }
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
        refreshUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
