/**
 * Theme Context Provider
 * Manages dark/light mode with localStorage persistence
 */

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const STORAGE_KEY = 'portfolio-theme'

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
}

export function ThemeProvider({ children, defaultTheme = 'light' }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
      if (stored === 'dark' || stored === 'light') {
        return stored
      }
      // No stored preference - default to light
      localStorage.setItem(STORAGE_KEY, 'light')
    }
    return defaultTheme
  })

  // Update DOM classes when theme changes
  useEffect(() => {
    const root = document.documentElement

    // Remove both classes first
    root.classList.remove('dark', 'light')
    
    // Add the current theme class
    root.classList.add(theme)

    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#fefdfb')
    }
  }, [theme])

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem(STORAGE_KEY)
      // Only auto-switch if user hasn't set a preference
      if (!stored) {
        setThemeState(e.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem(STORAGE_KEY, newTheme)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  const value: ThemeContextValue = {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark',
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
