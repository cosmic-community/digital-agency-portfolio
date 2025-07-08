'use client'
import Link from 'next/link'
import { Loader2, User, Briefcase, FileText, MessageSquare } from 'lucide-react'
import type { SearchResult } from '@/hooks/useSearch'

interface SearchResultsProps {
  results: SearchResult[]
  isLoading: boolean
  query: string
  onResultClick: () => void
}

export default function SearchResults({ 
  results, 
  isLoading, 
  query, 
  onResultClick 
}: SearchResultsProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'services':
        return <Briefcase className="h-4 w-4" />
      case 'team-members':
        return <User className="h-4 w-4" />
      case 'case-studies':
        return <FileText className="h-4 w-4" />
      case 'testimonials':
        return <MessageSquare className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'services':
        return 'Service'
      case 'team-members':
        return 'Team Member'
      case 'case-studies':
        return 'Case Study'
      case 'testimonials':
        return 'Testimonial'
      default:
        return 'Content'
    }
  }

  const getResultUrl = (result: SearchResult) => {
    switch (result.type) {
      case 'services':
        return `/services/${result.slug}`
      case 'team-members':
        return `/team#${result.slug}`
      case 'case-studies':
        return `/case-studies/${result.slug}`
      case 'testimonials':
        return `/#testimonials`
      default:
        return '/'
    }
  }

  const highlightText = (text: string, query: string) => {
    if (!query) return text
    
    const regex = new RegExp(`(${query})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-900 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    )
  }

  if (isLoading) {
    return (
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Searching...</span>
        </div>
      </div>
    )
  }

  if (!query.trim()) {
    return (
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
          Start typing to search services, team members, case studies, and testimonials
        </p>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
          No results found for "{query}"
        </p>
      </div>
    )
  }

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
      <div className="p-2">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 px-2">
          Found {results.length} result{results.length !== 1 ? 's' : ''}
        </p>
        
        <div className="space-y-1">
          {results.map((result) => (
            <Link
              key={`${result.type}-${result.id}`}
              href={getResultUrl(result)}
              onClick={onResultClick}
              className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1 text-primary-600 dark:text-primary-400">
                  {getIcon(result.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                      {highlightText(result.title, query)}
                    </h3>
                    <span className="flex-shrink-0 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                      {getTypeLabel(result.type)}
                    </span>
                  </div>
                  {result.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {highlightText(result.description, query)}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}