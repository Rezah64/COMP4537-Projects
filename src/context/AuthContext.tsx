import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

interface User {
  email: string;
  isAdmin: boolean;
  apiCalls: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users for testing
const mockUsers: User[] = [
  { email: 'admin@admin.com', isAdmin: true, apiCalls: 5 },
  { email: 'john@john.com', isAdmin: false, apiCalls: 15 },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockUser = mockUsers.find(u => u.email === email);
      
      if (!mockUser) {
        throw new Error('Invalid credentials');
      }

      if (email === 'admin@admin.com' && password !== '111') {
        throw new Error('Invalid credentials');
      } else if (email === 'john@john.com' && password !== '123') {
        throw new Error('Invalid credentials');
      }

      setUser(mockUser);
      setIsAuthenticated(true);
      toast.success('Login successful!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      if (mockUsers.some(u => u.email === email)) {
        throw new Error('User already exists');
      }

      const newUser: User = {
        email,
        isAdmin: false,
        apiCalls: 0,
      };

      mockUsers.push(newUser);
      setUser(newUser);
      setIsAuthenticated(true);
      toast.success('Registration successful!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}