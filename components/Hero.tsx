import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-white section-padding">
      <div className="container">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 animate-fade-in">
            Transform Your Digital Presence
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-slide-up">
            We create exceptional digital experiences through innovative design, 
            development, and strategic consulting that drive real business results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link href="/services" className="btn-primary inline-flex items-center">
              Explore Our Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/case-studies" className="btn-secondary">
              View Case Studies
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}