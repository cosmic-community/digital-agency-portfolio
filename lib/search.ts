import { cosmic } from '@/lib/cosmic'
import type { SearchResult } from '@/hooks/useSearch'
import type { Service, TeamMember, CaseStudy, Testimonial } from '@/types'

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

function normalizeText(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function matchesQuery(text: string, query: string): boolean {
  const normalizedText = normalizeText(text)
  const normalizedQuery = normalizeText(query)
  return normalizedText.includes(normalizedQuery)
}

export async function searchContent(query: string): Promise<SearchResult[]> {
  if (!query.trim()) {
    return []
  }

  const results: SearchResult[] = []

  try {
    // Search services
    const services = await cosmic.objects
      .find({ type: 'services' })
      .props(['id', 'title', 'slug', 'metadata'])

    for (const service of services.objects as Service[]) {
      const searchableText = [
        service.title,
        service.metadata.service_name,
        stripHtml(service.metadata.description || ''),
        service.metadata.key_features || '',
        service.metadata.starting_price || ''
      ].join(' ')

      if (matchesQuery(searchableText, query)) {
        results.push({
          id: service.id,
          type: 'services',
          title: service.metadata.service_name || service.title,
          slug: service.slug,
          description: stripHtml(service.metadata.description || '').substring(0, 150),
          metadata: service.metadata
        })
      }
    }
  } catch (error) {
    if (!hasStatus(error) || error.status !== 404) {
      console.error('Error searching services:', error)
    }
  }

  try {
    // Search team members
    const teamMembers = await cosmic.objects
      .find({ type: 'team-members' })
      .props(['id', 'title', 'slug', 'metadata'])

    for (const member of teamMembers.objects as TeamMember[]) {
      const searchableText = [
        member.title,
        member.metadata.full_name,
        member.metadata.job_title,
        member.metadata.bio || '',
        member.metadata.email || ''
      ].join(' ')

      if (matchesQuery(searchableText, query)) {
        results.push({
          id: member.id,
          type: 'team-members',
          title: member.metadata.full_name || member.title,
          slug: member.slug,
          description: member.metadata.job_title + (member.metadata.bio ? ` - ${member.metadata.bio.substring(0, 100)}` : ''),
          metadata: member.metadata
        })
      }
    }
  } catch (error) {
    if (!hasStatus(error) || error.status !== 404) {
      console.error('Error searching team members:', error)
    }
  }

  try {
    // Search case studies
    const caseStudies = await cosmic.objects
      .find({ type: 'case-studies' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    for (const caseStudy of caseStudies.objects as CaseStudy[]) {
      const searchableText = [
        caseStudy.title,
        caseStudy.metadata.project_title,
        caseStudy.metadata.client_name,
        stripHtml(caseStudy.metadata.project_overview || ''),
        caseStudy.metadata.challenge || '',
        caseStudy.metadata.solution || '',
        caseStudy.metadata.results || ''
      ].join(' ')

      if (matchesQuery(searchableText, query)) {
        results.push({
          id: caseStudy.id,
          type: 'case-studies',
          title: caseStudy.metadata.project_title || caseStudy.title,
          slug: caseStudy.slug,
          description: `${caseStudy.metadata.client_name} - ${stripHtml(caseStudy.metadata.project_overview || '').substring(0, 100)}`,
          metadata: caseStudy.metadata
        })
      }
    }
  } catch (error) {
    if (!hasStatus(error) || error.status !== 404) {
      console.error('Error searching case studies:', error)
    }
  }

  try {
    // Search testimonials
    const testimonials = await cosmic.objects
      .find({ type: 'testimonials' })
      .props(['id', 'title', 'slug', 'metadata'])

    for (const testimonial of testimonials.objects as Testimonial[]) {
      const searchableText = [
        testimonial.title,
        testimonial.metadata.client_name,
        testimonial.metadata.company || '',
        testimonial.metadata.position || '',
        testimonial.metadata.testimonial_text
      ].join(' ')

      if (matchesQuery(searchableText, query)) {
        results.push({
          id: testimonial.id,
          type: 'testimonials',
          title: testimonial.metadata.client_name || testimonial.title,
          slug: testimonial.slug,
          description: `${testimonial.metadata.company || ''} ${testimonial.metadata.position || ''} - ${testimonial.metadata.testimonial_text.substring(0, 100)}`.trim(),
          metadata: testimonial.metadata
        })
      }
    }
  } catch (error) {
    if (!hasStatus(error) || error.status !== 404) {
      console.error('Error searching testimonials:', error)
    }
  }

  // Sort results by relevance (exact title matches first, then partial matches)
  return results.sort((a, b) => {
    const aExactMatch = normalizeText(a.title).includes(normalizeText(query))
    const bExactMatch = normalizeText(b.title).includes(normalizeText(query))
    
    if (aExactMatch && !bExactMatch) return -1
    if (!aExactMatch && bExactMatch) return 1
    
    return a.title.localeCompare(b.title)
  })
}