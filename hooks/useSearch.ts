'use client'
import { useState, useCallback } from 'react'

export interface SearchResult {
  id: string
  type: string
  title: string
  slug: string
  description?: string
  metadata?: Record<string, any>
}

export function useSearch() {
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      if (!response.ok) {
        throw new Error('Search failed')
      }
      
      const data = await response.json()
      setResults(data.results || [])
    } catch (err) {
      setError('Search failed. Please try again.')
      console.error('Search error:', err)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearResults = useCallback(() => {
    setResults([])
    setError(null)
  }, [])

  return {
    results,
    isLoading,
    error,
    search,
    clearResults
  }
}