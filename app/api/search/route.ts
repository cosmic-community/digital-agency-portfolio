import { NextRequest, NextResponse } from 'next/server'
import { searchContent } from '@/lib/search'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')

  if (!query || !query.trim()) {
    return NextResponse.json({ results: [] })
  }

  try {
    const results = await searchContent(query)
    return NextResponse.json({ results })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    )
  }
}