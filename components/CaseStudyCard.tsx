import { CaseStudy } from '@/types';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <a 
      href={`/case-studies/${caseStudy.slug}`}
      className="block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700 group"
    >
      {caseStudy.metadata.featured_image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={`${caseStudy.metadata.featured_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
            alt={caseStudy.metadata.project_title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            width={600}
            height={400}
          />
        </div>
      )}
      <div className="p-6">
        <div className="mb-2">
          <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
            {caseStudy.metadata.client_name}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {caseStudy.metadata.project_title}
        </h3>
        <div 
          className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: caseStudy.metadata.project_overview }}
        />
        <div className="flex items-center justify-between">
          {caseStudy.metadata.project_duration && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Duration: {caseStudy.metadata.project_duration}
            </span>
          )}
          <span className="inline-flex items-center text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 font-medium transition-colors">
            Read More
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}