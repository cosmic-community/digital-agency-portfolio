import { getTeamMembers } from '@/lib/cosmic'
import TeamMemberCard from '@/components/TeamMemberCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Team - Digital Agency Portfolio',
  description: 'Meet our talented team of designers, developers, and strategists who bring your digital vision to life.',
}

export default async function TeamPage() {
  const teamMembers = await getTeamMembers()

  return (
    <div className="section-padding">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Meet Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our diverse team of experts brings together years of experience in design, 
            development, and digital strategy to deliver exceptional results for our clients.
          </p>
        </div>

        {teamMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600">No team members available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}