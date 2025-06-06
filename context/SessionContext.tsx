// context/SessionContext.tsx
"use client"; // จำเป็นสำหรับ Context

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, SessionContextType } from '@/types';
import { simulatedLogin, simulatedLogout } from '@/lib/auth'; // Import ฟังก์ชันจำลอง
import Cookies from 'js-cookie';

const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface SessionProviderProps {
  children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  
  // ตรวจสอบ session เมื่อโหลดครั้งแรก (จำลองจาก localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('accessToken');
    if (storedUser && storedToken) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
        setAccessToken(storedToken);
        setIsAuthenticated(true);
      } catch (e) {
        console.error("Failed to parse stored user or token:", e);
        logout(); // Clear invalid data
      }
    }
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    setAccessToken(token);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('accessToken', token);
    Cookies.set("token",token);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    Cookies.remove("token");
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    accessToken,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}