import { getCaseStudies } from '@/lib/cosmic'
import CaseStudyCard from '@/components/CaseStudyCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Studies - Digital Agency Portfolio',
  description: 'Explore our successful projects and see how we\'ve helped clients achieve their digital goals with measurable results.',
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies()

  return (
    <div className="section-padding">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Case Studies
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how we've helped businesses transform their digital presence 
            and achieve measurable results through strategic design and development.
          </p>
        </div>

        {caseStudies.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((caseStudy) => (
              <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600">No case studies available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}