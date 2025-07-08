'use client'

import { useTheme } from '@/hooks/useTheme'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export default function ThemeSwitch() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const themes = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor }
  ] as const

  const currentTheme = themes.find(t => t.value === theme)
  const CurrentIcon = currentTheme?.icon || Monitor

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle theme"
        aria-expanded={isOpen}
      >
        <CurrentIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
          {themes.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => {
                setTheme(value)
                setIsOpen(false)
              }}
              className={`w-full flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                theme === value 
                  ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <Icon className="w-4 h-4 mr-3" />
              <span>{label}</span>
              {theme === value && (
                <div className="ml-auto w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}