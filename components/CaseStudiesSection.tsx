import { getCaseStudies } from '@/lib/cosmic'
import CaseStudyCard from '@/components/CaseStudyCard'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default async function CaseStudiesSection() {
  const caseStudies = await getCaseStudies()
  const featuredCaseStudies = caseStudies.slice(0, 2)

  return (
    <section className="section-padding bg-white dark:bg-gray-900 transition-colors">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See how we've helped businesses achieve their goals with strategic design and development.
          </p>
        </div>

        {featuredCaseStudies.length > 0 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {featuredCaseStudies.map((caseStudy) => (
                <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
              ))}
            </div>
            
            <div className="text-center">
              <Link href="/case-studies" className="btn-primary inline-flex items-center">
                View All Case Studies
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400">Case studies coming soon...</p>
          </div>
        )}
      </div>
    </section>
  )
}