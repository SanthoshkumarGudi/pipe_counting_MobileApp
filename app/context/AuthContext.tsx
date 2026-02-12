// app/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkToken = async () => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      const decoded: any = jwtDecode(token);
      const now = Date.now() / 1000;
      if (decoded.exp < now) {
        await SecureStore.deleteItemAsync('authToken');
        setIsAuthenticated(false);
        router.replace('/');
      } else {
        setIsAuthenticated(true);
      }
    } catch (err) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
    // Check every 5 minutes
    const interval = setInterval(checkToken, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const login = async (token: string) => {
    await SecureStore.setItemAsync('authToken', token);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('authToken');
    setIsAuthenticated(false);
    router.replace('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);