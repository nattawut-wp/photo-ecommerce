"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types";

interface AuthContextType {
  token: string | null;
  login: (token: string, role?: string) => void;
  logout: () => void;
  isAdmin: boolean;
  user: User | null; 
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Load state from localStorage on mount
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    
    if (storedToken) {
      setToken(storedToken);
      if (storedRole === 'admin') setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  const login = (newToken: string, role: string = 'user') => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    
    // ถ้า login เป็น admin ให้เก็บ role
    if (role === 'admin') {
        setIsAdmin(true);
        localStorage.setItem("role", 'admin');
    } else {
        setIsAdmin(false);
        localStorage.removeItem("role");
    }
    
    router.refresh();
  };

  const logout = () => {
    setToken(null);
    setIsAdmin(false);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAdmin, user: null, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;