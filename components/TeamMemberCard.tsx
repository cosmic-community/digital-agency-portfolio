import { TeamMember } from '@/types'

interface TeamMemberCardProps {
  member: TeamMember
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {member.metadata.profile_photo && (
        <div className="aspect-square overflow-hidden">
          <img
            src={`${member.metadata.profile_photo.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
            alt={member.metadata.full_name}
            className="w-full h-full object-cover"
            width={400}
            height={400}
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">
          {member.metadata.full_name}
        </h3>
        <p className="text-blue-600 font-medium mb-3">
          {member.metadata.job_title}
        </p>
        {member.metadata.bio && (
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            {member.metadata.bio}
          </p>
        )}
        <div className="flex items-center space-x-3">
          {member.metadata.email && (
            <a
              href={`mailto:${member.metadata.email}`}
              className="text-gray-400 hover:text-blue-600 transition-colors"
              aria-label={`Email ${member.metadata.full_name}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </a>
          )}
          {member.metadata.linkedin_url && (
            <a
              href={member.metadata.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 transition-colors"
              aria-label={`${member.metadata.full_name} LinkedIn profile`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}