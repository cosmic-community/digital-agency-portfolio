// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type_slug?: string;
  created_at: string;
  modified_at: string;
}

// Service object type
interface Service extends CosmicObject {
  type_slug: 'services';
  metadata: {
    service_name: string;
    description: string;
    key_features?: string;
    starting_price?: string;
    service_icon?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Team Member object type
interface TeamMember extends CosmicObject {
  type_slug: 'team-members';
  metadata: {
    full_name: string;
    job_title: string;
    bio?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    email?: string;
    linkedin_url?: string;
  };
}

// Testimonial object type
interface Testimonial extends CosmicObject {
  type_slug: 'testimonials';
  metadata: {
    client_name: string;
    company?: string;
    position?: string;
    testimonial_text: string;
    rating?: {
      key: string;
      value: string;
    };
    client_photo?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Case Study object type
interface CaseStudy extends CosmicObject {
  type_slug: 'case-studies';
  metadata: {
    project_title: string;
    client_name: string;
    project_overview: string;
    challenge?: string;
    solution?: string;
    results?: string;
    project_duration?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    project_gallery?: Array<{
      url: string;
      imgix_url: string;
    }>;
    related_service?: Service;
  };
}

// Contact Form Submission object type
interface ContactFormSubmission extends CosmicObject {
  type_slug: 'contact-form-submissions';
  metadata: {
    name: string;
    email: string;
    message: string;
  };
}

// Type literals for ratings
type RatingKey = '3' | '4' | '5';

// API response types
interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Component prop interfaces
interface ServiceCardProps {
  service: Service;
}

interface TeamMemberCardProps {
  member: TeamMember;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

// Contact form types
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
}

// Type guards
function isService(obj: CosmicObject): obj is Service {
  return obj.type_slug === 'services';
}

function isTeamMember(obj: CosmicObject): obj is TeamMember {
  return obj.type_slug === 'team-members';
}

function isTestimonial(obj: CosmicObject): obj is Testimonial {
  return obj.type_slug === 'testimonials';
}

function isCaseStudy(obj: CosmicObject): obj is CaseStudy {
  return obj.type_slug === 'case-studies';
}

function isContactFormSubmission(obj: CosmicObject): obj is ContactFormSubmission {
  return obj.type_slug === 'contact-form-submissions';
}

export type {
  CosmicObject,
  Service,
  TeamMember,
  Testimonial,
  CaseStudy,
  ContactFormSubmission,
  RatingKey,
  CosmicResponse,
  ServiceCardProps,
  TeamMemberCardProps,
  TestimonialCardProps,
  CaseStudyCardProps,
  ContactFormData,
  ContactFormProps,
}

export {
  isService,
  isTeamMember,
  isTestimonial,
  isCaseStudy,
  isContactFormSubmission,
}