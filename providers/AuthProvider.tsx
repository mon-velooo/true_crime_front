'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { setCookies, clearCookies, getCookies } from '@/actions/auth';

interface AuthDataType {
  username: string | null;
  email: string | null;
  role: string | null;
  token: string | null;
  id: string | null;
}

interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  user: AuthDataType | null;
  signIn: (username: string, email: string, role: string, token: string, id: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserCookies: (username: string, email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const [user, setUser] = useState<AuthDataType | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      const cookieData = await getCookies();
      if (cookieData.token) {
        setUser(cookieData);
      }
    };
    initAuth();
  }, []);

  const signIn = async (username: string, email: string, role: string, token: string, id: string) => {
    const userData = { username, email, role, token, id };
    await setCookies(userData);
    setUser(userData);
  };

  const signOut = async () => {
    await clearCookies();
    setUser(null);
  };

  const updateUserCookies = async (username: string, email: string) => {
    await setCookies({ username, email });
    setUser((prev) => (prev ? { ...prev, username, email } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        role: user?.role ?? null,
        user,
        signIn,
        signOut,
        updateUserCookies
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
