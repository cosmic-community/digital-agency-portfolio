// app/services/[slug]/page.tsx
import { getServiceBySlug, getServices } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, CheckCircle } from 'lucide-react'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const services = await getServices()
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: `${service.metadata.service_name} - Digital Agency Portfolio`,
    description: service.metadata.description.replace(/<[^>]*>/g, ''),
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const features = service.metadata.key_features?.split('\n').filter(Boolean) || []

  return (
    <div className="section-padding">
      <div className="container">
        <div className="mb-8">
          <Link 
            href="/services" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {service.metadata.service_name}
            </h1>
            
            <div 
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 prose prose-lg dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: service.metadata.description }}
            />

            {service.metadata.starting_price && (
              <div className="mb-8">
                <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">Starting at</span>
                <div className="text-3xl font-bold text-primary-600">
                  {service.metadata.starting_price}
                </div>
              </div>
            )}

            {features.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="lg:pl-8">
            {service.metadata.service_icon && (
              <img
                src={`${service.metadata.service_icon.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                alt={service.metadata.service_name}
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            )}
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Contact us today to discuss your project and see how we can help.
          </p>
          <Link href="/contact" className="btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}