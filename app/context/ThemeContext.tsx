// app/context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// Define your light & dark themes
export const lightTheme = {
  background: '#ffffff',
  text: '#000000',
  card: '#f8f9fa',
  border: '#e0e0e0',
  primary: '#00BFFF',
  primaryDark: '#009acd',
  accent: '#00A650',
  gray: '#666666',
  error: '#ff3b30',
};

export const darkTheme = {
  background: '#121212',
  text: '#e0e0e0',
  card: '#1e1e1e',
  border: '#333333',
  primary: '#1e90ff',
  primaryDark: '#0c6ecf',
  accent: '#2ecc71',
  gray: '#aaaaaa',
  error: '#ff5252',
};

// Theme type
export type Theme = typeof lightTheme;

type ThemeMode = 'system' | 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => Promise<void>;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme(); // 'light' | 'dark' | null
  const [mode, setModeState] = useState<ThemeMode>('system');
  const [theme, setTheme] = useState<Theme>(lightTheme);

  // Load saved theme preference on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedMode = await SecureStore.getItemAsync('themeMode');
        if (savedMode && (savedMode === 'light' || savedMode === 'dark' || savedMode === 'system')) {
          setModeState(savedMode as ThemeMode);
        }
      } catch (e) {
        console.log('Failed to load theme mode', e);
      }
    };
    loadTheme();
  }, []);

  // Update theme when mode or system scheme changes
  useEffect(() => {
    let effectiveMode = mode;

    if (mode === 'system') {
      effectiveMode = systemColorScheme === 'dark' ? 'dark' : 'light';
    }

    const newTheme = effectiveMode === 'dark' ? darkTheme : lightTheme;
    setTheme(newTheme);
  }, [mode, systemColorScheme]);

  const changeMode = async (newMode: ThemeMode) => {
    setModeState(newMode);
    try {
      await SecureStore.setItemAsync('themeMode', newMode);
    } catch (e) {
      console.log('Failed to save theme mode', e);
    }
  };

  const isDark = mode === 'dark' || (mode === 'system' && systemColorScheme === 'dark');

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode: changeMode, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme anywhere
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};