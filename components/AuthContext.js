"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/auth/me", { withCredentials: true });
      setUser(res.data.user || null);
    } catch (error) {
      console.error("Fetch user failed:", error);
      setUser(null);
    } finally {
      hasRole(user);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const hasRole = (roles) => {
    if (!user?.role) return false;
    return Array.isArray(roles)
      ? roles.includes(user.role)
      : roles === user.role;
  };

  return (
    <AuthContext.Provider value={{ user, loading, hasRole, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
