import { getTeamMembers } from '@/lib/cosmic'
import TeamMemberCard from '@/components/TeamMemberCard'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default async function TeamSection() {
  const teamMembers = await getTeamMembers()
  const featuredMembers = teamMembers.slice(0, 3)

  return (
    <section className="section-padding bg-white dark:bg-gray-900 transition-colors">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our talented team of experts is dedicated to bringing your vision to life.
          </p>
        </div>

        {featuredMembers.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
            
            <div className="text-center">
              <Link href="/team" className="btn-primary inline-flex items-center">
                Meet the Full Team
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400">Team members coming soon...</p>
          </div>
        )}
      </div>
    </section>
  )
}