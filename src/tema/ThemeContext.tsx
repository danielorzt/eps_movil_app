import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { colores as staticColors } from "./colores";

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
  colors: typeof staticColors;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(prevIsDark => !prevIsDark);
  };

  const value = useMemo(() => ({
    isDark,
    toggleTheme,
    colors: staticColors,
  }), [isDark]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  return context;
};
