import { getTestimonials } from '@/lib/cosmic'
import TestimonialCard from '@/components/TestimonialCard'

export default async function TestimonialsSection() {
  const testimonials = await getTestimonials()

  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </div>

        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400">Testimonials coming soon...</p>
          </div>
        )}
      </div>
    </section>
  )
}