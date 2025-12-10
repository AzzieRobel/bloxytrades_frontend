import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  referralCode?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (emailOrUsername: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (username: string, email: string, password: string, referralCode?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  googleLogin: () => Promise<void>;
  requestPasswordReset: (emailOrUsername: string) => Promise<{ success: boolean; message?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'bloxytrade_auth';
const USERS_STORAGE_KEY = 'bloxytrade_users';

// Mock delay function to simulate API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get users from localStorage
const getStoredUsers = (): User[] => {
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Save users to localStorage
const saveUsers = (users: User[]) => {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Failed to save users:', error);
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const userData = JSON.parse(stored);
        setUser(userData);
      }
    } catch (error) {
      console.error('Failed to load user from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (emailOrUsername: string, password: string) => {
    try {
      setIsLoading(true);
      await delay(800); // Simulate API delay

      const users = getStoredUsers();
      
      // Find user by email or username
      const foundUser = users.find(
        (u) => u.email.toLowerCase() === emailOrUsername.toLowerCase() || 
               u.username.toLowerCase() === emailOrUsername.toLowerCase()
      );

      if (!foundUser) {
        return { success: false, message: 'User not found. Please check your credentials.' };
      }

      // In a real app, you'd verify the password hash
      // For mock purposes, we'll check if password exists (any password works for demo)
      if (!password || password.length < 3) {
        return { success: false, message: 'Invalid password.' };
      }

      // Save user to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(foundUser));
      setUser(foundUser);

      toast.success(`Welcome back, ${foundUser.username}!`);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'An error occurred during login.' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string, referralCode?: string) => {
    try {
      setIsLoading(true);
      await delay(1000); // Simulate API delay

      const users = getStoredUsers();

      // Check if username already exists
      if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
        return { success: false, message: 'Username already exists. Please choose another one.' };
      }

      // Check if email already exists
      if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        return { success: false, message: 'Email already registered. Please use a different email.' };
      }

      // Validate password
      if (!password || password.length < 6) {
        return { success: false, message: 'Password must be at least 6 characters long.' };
      }

      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        username,
        email: email.toLowerCase(),
        createdAt: new Date().toISOString(),
        referralCode: referralCode || undefined,
      };

      // Add user to storage
      users.push(newUser);
      saveUsers(users);

      // Auto-login after registration
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      setUser(newUser);

      toast.success(`Account created successfully! Welcome, ${username}!`);
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'An error occurred during registration.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    toast.success('Logged out successfully!');
  };

  const requestPasswordReset = async (emailOrUsername: string) => {
    try {
      setIsLoading(true);
      await delay(800);

      const users = getStoredUsers();
      const foundUser = users.find(
        (u) => u.email.toLowerCase() === emailOrUsername.toLowerCase() ||
               u.username.toLowerCase() === emailOrUsername.toLowerCase()
      );

      if (!foundUser) {
        return { success: false, message: 'User not found. Please check the email or username.' };
      }

      toast.success('Password reset link sent (mock). Check your email.');
      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, message: 'Unable to process reset. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      setIsLoading(true);
      await delay(1000); // Simulate API delay

      // Mock Google user
      const googleUser: User = {
        id: `google_${Date.now()}`,
        username: 'google_user',
        email: 'user@gmail.com',
        createdAt: new Date().toISOString(),
      };

      // Check if user exists, if not create one
      const users = getStoredUsers();
      const existingUser = users.find(u => u.email === googleUser.email);
      
      if (!existingUser) {
        users.push(googleUser);
        saveUsers(users);
      }

      const userToLogin = existingUser || googleUser;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userToLogin));
      setUser(userToLogin);

      toast.success(`Welcome, ${userToLogin.username}!`);
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Failed to login with Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        googleLogin,
        requestPasswordReset,
      }}
    >
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

