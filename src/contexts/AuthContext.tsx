import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  banned?: boolean;
  referralCode?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
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
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

interface AuthStorage {
  user: User;
  token: string;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load auth state from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: AuthStorage = JSON.parse(stored);
        setUser(parsed.user);
        setToken(parsed.token);
      }
    } catch (error) {
      console.error('Failed to load auth from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const persistAuth = (nextUser: User, nextToken: string) => {
    const payload: AuthStorage = { user: nextUser, token: nextToken };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setUser(nextUser);
    setToken(nextToken);
  };

  const login = async (emailOrUsername: string, password: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: emailOrUsername, password }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const message = data?.message || 'Login failed. Please check your credentials.';
        return { success: false, message };
      }

      const { token: jwt, user: userData } = data as { token: string; user: User };
      if (!jwt || !userData) {
        return { success: false, message: 'Invalid response from server.' };
      }

      persistAuth(userData, jwt);
      toast.success(`Welcome back, ${userData.username || userData.email}!`);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'An error occurred during login.' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string, _referralCode?: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const message = data?.message || 'Registration failed. Please try again.';
        return { success: false, message };
      }

      const { token: jwt, user: userData } = data as { token: string; user: User };
      if (!jwt || !userData) {
        return { success: false, message: 'Invalid response from server.' };
      }

      persistAuth(userData, jwt);
      toast.success(`Account created successfully! Welcome, ${userData.username || userData.email}!`);
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
    setToken(null);
    toast.success('Logged out successfully!');
  };

  // Still a mock for now; you can wire to backend when ready.
  const requestPasswordReset = async (_emailOrUsername: string) => {
    toast.success('Password reset link sent (mock). Check your email.');
    return { success: true };
  };

  const googleLogin = async () => {
    try {
      if (!(window as any).google || !(window as any).google.accounts || !(window as any).google.accounts.id) {
        toast.error('Google SDK not loaded. Please check your configuration.');
        return;
      }

      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      if (!clientId) {
        toast.error('Google client ID is not configured.');
        return;
      }

      setIsLoading(true);

      await new Promise<void>((resolve, reject) => {
        try {
          (window as any).google.accounts.id.initialize({
            client_id: clientId,
            callback: async (response: { credential: string }) => {
              try {
                const res = await fetch(`${API_BASE}/auth/google`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ idToken: response.credential }),
                });

                const data = await res.json().catch(() => ({}));
                if (!res.ok) {
                  const message = data?.message || 'Google login failed.';
                  toast.error(message);
                  reject(new Error(message));
                  return;
                }

                const { token: jwt, user: userData } = data as { token: string; user: User };
                persistAuth(userData, jwt);
                toast.success(`Welcome, ${userData.username || userData.email}!`);
                resolve();
              } catch (err) {
                console.error('Google login callback error:', err);
                toast.error('An error occurred during Google login.');
                reject(err);
              }
            },
          });

          (window as any).google.accounts.id.prompt((notification: any) => {
            if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
              // User closed or prompt could not be displayed
              resolve();
            }
          });
        } catch (err) {
          reject(err);
        }
      });
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
        token,
        isAuthenticated: !!user && !!token,
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

