'use client'

import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    // Get initial theme from localStorage or default to system
    const savedTheme = localStorage.getItem('theme') as Theme | null
    const initialTheme = savedTheme || 'system'
    setTheme(initialTheme)
    
    // Function to get system preference
    const getSystemTheme = (): 'light' | 'dark' => {
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }
      return 'light'
    }

    // Function to update resolved theme
    const updateResolvedTheme = (currentTheme: Theme) => {
      const resolved = currentTheme === 'system' ? getSystemTheme() : currentTheme
      setResolvedTheme(resolved)
      
      // Update document class
      const root = document.documentElement
      root.classList.remove('light', 'dark')
      root.classList.add(resolved)
      
      // Update data attribute for better CSS targeting
      root.setAttribute('data-theme', resolved)
    }

    // Initial theme application
    updateResolvedTheme(initialTheme)

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = () => {
      if (theme === 'system') {
        updateResolvedTheme('system')
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [theme])

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    
    // Update resolved theme immediately
    const resolved = newTheme === 'system' 
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : newTheme
    
    setResolvedTheme(resolved)
    
    // Update document class
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(resolved)
    root.setAttribute('data-theme', resolved)
  }

  return {
    theme,
    resolvedTheme,
    setTheme: changeTheme
  }
}