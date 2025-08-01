import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>(undefined);

const themes: Array<Theme> = ["dark", "light"]

const getSavedTheme = () => {
  const store = localStorage.getItem('theme') as any
  if (themes.includes(store)) return store
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getSavedTheme)

  useLayoutEffect(() => {
    const root = document.documentElement;

    root.classList.remove('light', 'dark')
    root.classList.add(theme)

    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext)
  return context;
}
