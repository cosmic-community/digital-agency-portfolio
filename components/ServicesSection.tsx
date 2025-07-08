import { getServices } from '@/lib/cosmic'
import ServiceCard from '@/components/ServiceCard'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default async function ServicesSection() {
  const services = await getServices()
  const featuredServices = services.slice(0, 3)

  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We offer comprehensive digital solutions to help your business succeed online.
          </p>
        </div>

        {featuredServices.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
            
            <div className="text-center">
              <Link href="/services" className="btn-primary inline-flex items-center">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400">Services coming soon...</p>
          </div>
        )}
      </div>
    </section>
  )
}