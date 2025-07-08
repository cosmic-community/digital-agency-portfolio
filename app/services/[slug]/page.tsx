// app/services/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getServiceBySlug, getServices } from '@/lib/cosmic';
import AddToCartButton from '@/components/AddToCartButton';
import { Service } from '@/types';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service: Service | null = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          {service.metadata.service_icon && (
            <div className="w-24 h-24 mx-auto mb-6 overflow-hidden rounded-full">
              <img
                src={`${service.metadata.service_icon.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                alt={service.metadata.service_name}
                className="w-full h-full object-cover"
                width={96}
                height={96}
              />
            </div>
          )}
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {service.metadata.service_name}
          </h1>
          
          <div 
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
            dangerouslySetInnerHTML={{ __html: service.metadata.description }}
          />
          
          {service.metadata.starting_price && (
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-8">
              Starting at {service.metadata.starting_price}
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AddToCartButton service={service} size="lg" />
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              Get Custom Quote
            </a>
          </div>
        </div>

        {service.metadata.key_features && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              What's Included
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.metadata.key_features.split('\n').map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Add this service to your cart or contact us for a personalized consultation and quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AddToCartButton service={service} size="lg" />
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors dark:bg-gray-600 dark:hover:bg-gray-500"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate static params for all services
export async function generateStaticParams() {
  const services = await getServices();
  
  return services.map((service) => ({
    slug: service.slug,
  }));
}

// Generate metadata for each service
export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  
  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }
  
  return {
    title: `${service.metadata.service_name} - Digital Agency Portfolio`,
    description: service.metadata.description?.replace(/<[^>]*>/g, ''),
  };
}