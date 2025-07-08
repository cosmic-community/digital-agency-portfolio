import { getServices } from '@/lib/cosmic'
import ServiceCard from '@/components/ServiceCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Services - Digital Agency Portfolio',
  description: 'Discover our comprehensive range of digital services including web development, UI/UX design, and digital strategy consulting.',
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="section-padding">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive digital solutions to help your business thrive in the modern world. 
            From strategy to execution, we're your partners in digital transformation.
          </p>
        </div>

        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600">No services available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}