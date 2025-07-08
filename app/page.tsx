import Hero from '@/components/Hero'
import ServicesSection from '@/components/ServicesSection'
import TeamSection from '@/components/TeamSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import CaseStudiesSection from '@/components/CaseStudiesSection'
import CTASection from '@/components/CTASection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <TeamSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}