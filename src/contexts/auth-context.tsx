"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { api } from "@/lib/api";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = api.getToken();
      if (token) {
        const response = await api.getCurrentUser();
        if (response.success && response.data) {
          setUser(response.data);
        } else {
          api.removeToken();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.login({ email, password });

      if (response.success && response.data) {
        api.setToken(response.data.token);
        setUser(response.data.user);
        return { success: true };
      }

      return { success: false, error: response.error || "Login failed" };
    } catch {
      return { success: false, error: "An unexpected error occurred" };
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await api.signup({ name, email, password });

      if (response.success && response.data) {
        api.setToken(response.data.token);
        setUser(response.data.user);
        return { success: true };
      }

      return { success: false, error: response.error || "Signup failed" };
    } catch {
      return { success: false, error: "An unexpected error occurred" };
    }
  };

  const logout = () => {
    api.removeToken();
    setUser(null);
    api.logout(); // Optional: call backend to invalidate token
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
