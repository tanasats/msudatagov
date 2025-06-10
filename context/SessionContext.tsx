// context/SessionContext.tsx
"use client"; // จำเป็นสำหรับ Context

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, SessionContextType } from '@/types';
//import { simulatedLogin, simulatedLogout } from '@/lib/auth'; // Import ฟังก์ชันจำลอง
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { verifyToken } from '@/lib/jwt';

const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface SessionProviderProps {
  children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  // ตรวจสอบ session เมื่อโหลดครั้งแรก (จำลองจาก localStorage)
  useEffect(() => {
    //const storedUser = localStorage.getItem('user');
    //const storedToken = localStorage.getItem('accessToken');
    const storedUser = Cookies.get("user");
    const storedToken = Cookies.get("token");
    
    //console.log("accessToken in localstorage : ",storedToken);
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

    const loadAndVerifyToken = async () => {
      //const storedToken = localStorage.getItem('accessToken')||"";
      const storedToken = Cookies.get("token")?.toString()||"";
      const isValid = await verifyToken(storedToken);
      //console.log("loadAndValidToken :",isValid);
      if(!isValid){
        logout();
      }
    }
    loadAndVerifyToken();


  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    setAccessToken(token);
    setIsAuthenticated(true);
    //localStorage.setItem('user', JSON.stringify(userData));
    //localStorage.setItem('accessToken', token);


    Cookies.set("user",JSON.stringify(userData),{expires:1,secure:true});
    Cookies.set("token",token,{expires:1,secure:true});

    router.push("/");
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setIsAuthenticated(false);
    //localStorage.removeItem('user');
    //localStorage.removeItem('accessToken');
    Cookies.remove("user");
    Cookies.remove("token");
    router.push("/");
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