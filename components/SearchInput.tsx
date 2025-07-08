'use client'
import { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { useSearch } from '@/hooks/useSearch'
import SearchResults from './SearchResults'

interface SearchInputProps {
  onClose?: () => void
}

export default function SearchInput({ onClose }: SearchInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { results, isLoading, search, clearResults } = useSearch()
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        onClose?.()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    if (searchQuery.trim()) {
      search(searchQuery)
    } else {
      clearResults()
    }
  }

  const handleClear = () => {
    setQuery('')
    clearResults()
    inputRef.current?.focus()
  }

  const handleClose = () => {
    setIsOpen(false)
    setQuery('')
    clearResults()
    onClose?.()
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Search trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
        <span className="hidden sm:inline">Search</span>
      </button>

      {/* Search overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden" onClick={handleClose} />
      )}

      {/* Search input container */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-screen max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 md:w-96">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search services, team members, case studies..."
                className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {query && (
                <button
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              <button
                onClick={handleClose}
                className="absolute -top-2 -right-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 md:hidden"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Search results */}
          <SearchResults
            results={results}
            isLoading={isLoading}
            query={query}
            onResultClick={handleClose}
          />
        </div>
      )}
    </div>
  )
}