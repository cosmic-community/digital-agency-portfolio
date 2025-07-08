import { CaseStudy } from '@/types'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {caseStudy.metadata.featured_image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={`${caseStudy.metadata.featured_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
            alt={caseStudy.metadata.project_title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            width={600}
            height={400}
          />
        </div>
      )}
      <div className="p-6">
        <div className="mb-2">
          <span className="text-sm text-blue-600 font-medium">
            {caseStudy.metadata.client_name}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {caseStudy.metadata.project_title}
        </h3>
        <div 
          className="text-gray-600 mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: caseStudy.metadata.project_overview }}
        />
        <div className="flex items-center justify-between">
          {caseStudy.metadata.project_duration && (
            <span className="text-sm text-gray-500">
              Duration: {caseStudy.metadata.project_duration}
            </span>
          )}
          <a
            href={`/case-studies/${caseStudy.slug}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            Read More
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}