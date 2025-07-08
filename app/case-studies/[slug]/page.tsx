// app/case-studies/[slug]/page.tsx
import { getCaseStudyBySlug, getCaseStudies } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, ExternalLink } from 'lucide-react'

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies()
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }))
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = await getCaseStudyBySlug(slug)

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    }
  }

  return {
    title: `${caseStudy.metadata.project_title} - Case Study`,
    description: caseStudy.metadata.project_overview.replace(/<[^>]*>/g, ''),
  }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const caseStudy = await getCaseStudyBySlug(slug)

  if (!caseStudy) {
    notFound()
  }

  return (
    <div className="section-padding">
      <div className="container">
        <div className="mb-8">
          <Link 
            href="/case-studies" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Case Studies
          </Link>
        </div>

        {/* Hero Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {caseStudy.metadata.project_title}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Client: {caseStudy.metadata.client_name}
              </p>
              
              {caseStudy.metadata.project_duration && (
                <div className="flex items-center text-gray-500 mb-6">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{caseStudy.metadata.project_duration}</span>
                </div>
              )}

              {caseStudy.metadata.related_service && (
                <div className="mb-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                    {caseStudy.metadata.related_service.metadata.service_name}
                  </span>
                </div>
              )}
            </div>

            <div>
              {caseStudy.metadata.featured_image && (
                <img
                  src={`${caseStudy.metadata.featured_image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
                  alt={caseStudy.metadata.project_title}
                  width={800}
                  height={500}
                  className="rounded-lg shadow-lg"
                />
              )}
            </div>
          </div>
        </div>

        {/* Project Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Overview</h2>
          <div 
            className="prose prose-lg max-w-none text-gray-600"
            dangerouslySetInnerHTML={{ __html: caseStudy.metadata.project_overview }}
          />
        </div>

        {/* Challenge, Solution, Results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {caseStudy.metadata.challenge && (
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Challenge</h3>
              <p className="text-gray-600">{caseStudy.metadata.challenge}</p>
            </div>
          )}

          {caseStudy.metadata.solution && (
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Solution</h3>
              <p className="text-gray-600">{caseStudy.metadata.solution}</p>
            </div>
          )}

          {caseStudy.metadata.results && (
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Results</h3>
              <p className="text-gray-600">{caseStudy.metadata.results}</p>
            </div>
          )}
        </div>

        {/* Project Gallery */}
        {caseStudy.metadata.project_gallery && caseStudy.metadata.project_gallery.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {caseStudy.metadata.project_gallery.map((image, index) => (
                <img
                  key={index}
                  src={`${image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                  alt={`${caseStudy.metadata.project_title} gallery image ${index + 1}`}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              ))}
            </div>
          </div>
        )}

        {/* Related Service */}
        {caseStudy.metadata.related_service && (
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Interested in {caseStudy.metadata.related_service.metadata.service_name}?
            </h3>
            <p className="text-gray-600 mb-6">
              Learn more about how we can help with similar projects.
            </p>
            <Link 
              href={`/services/${caseStudy.metadata.related_service.slug}`}
              className="btn-primary inline-flex items-center"
            >
              View Service
              <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}