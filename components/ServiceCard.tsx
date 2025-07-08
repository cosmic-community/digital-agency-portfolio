import { Service } from '@/types'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700">
      {service.metadata.service_icon && (
        <div className="w-16 h-16 mb-4 overflow-hidden rounded-lg">
          <img
            src={`${service.metadata.service_icon.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
            alt={service.metadata.service_name}
            className="w-full h-full object-cover"
            width={64}
            height={64}
          />
        </div>
      )}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
        {service.metadata.service_name}
      </h3>
      <div 
        className="text-gray-600 dark:text-gray-300 mb-4"
        dangerouslySetInnerHTML={{ __html: service.metadata.description }}
      />
      {service.metadata.key_features && (
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features:</h4>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            {service.metadata.key_features.split('\n').map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg className="w-4 h-4 text-blue-500 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex items-center justify-between">
        {service.metadata.starting_price && (
          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
            Starting at {service.metadata.starting_price}
          </span>
        )}
        <a
          href={`/services/${service.slug}`}
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
        >
          Learn More
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  )
}