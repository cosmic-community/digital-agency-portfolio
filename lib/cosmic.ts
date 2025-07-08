import { createBucketClient } from '@cosmicjs/sdk';
import type { 
  Service, 
  TeamMember, 
  Testimonial, 
  CaseStudy, 
  ContactFormData,
  ContactFormSubmission,
  CosmicResponse,
  CosmicSingleResponse,
  CosmicError
} from '@/types';

// Create Cosmic client with environment variables
export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: "staging",
});

// Error helper for Cosmic SDK
function isCosmicError(error: unknown): error is CosmicError {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Generic function to handle Cosmic API errors
function handleCosmicError(error: unknown, operation: string): never {
  if (isCosmicError(error)) {
    if (error.status === 404) {
      throw new Error(`${operation}: No data found`);
    }
    throw new Error(`${operation}: ${error.message || 'Unknown error'}`);
  }
  throw new Error(`${operation}: Failed to complete operation`);
}

// Fetch all services
export async function getServices(): Promise<Service[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'services' })
      .props(['id', 'title', 'slug', 'metadata', 'type', 'status'])
      .sort('-created_at');
    
    return response.objects as Service[];
  } catch (error) {
    if (isCosmicError(error) && error.status === 404) {
      return [];
    }
    handleCosmicError(error, 'getServices');
  }
}

// Fetch service by slug
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'services',
      slug
    }).props(['id', 'title', 'slug', 'metadata', 'type', 'status']);
    
    return response.object as Service;
  } catch (error) {
    if (isCosmicError(error) && error.status === 404) {
      return null;
    }
    handleCosmicError(error, `getServiceBySlug(${slug})`);
  }
}

// Fetch all team members
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'team-members' })
      .props(['id', 'title', 'slug', 'metadata', 'type', 'status'])
      .sort('-created_at');
    
    return response.objects as TeamMember[];
  } catch (error) {
    if (isCosmicError(error) && error.status === 404) {
      return [];
    }
    handleCosmicError(error, 'getTeamMembers');
  }
}

// Fetch team member by slug
export async function getTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'team-members',
      slug
    }).props(['id', 'title', 'slug', 'metadata', 'type', 'status']);
    
    return response.object as TeamMember;
  } catch (error) {
    if (isCosmicError(error) && error.status === 404) {
      return null;
    }
    handleCosmicError(error, `getTeamMemberBySlug(${slug})`);
  }
}

// Fetch all testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'testimonials' })
      .props(['id', 'title', 'slug', 'metadata', 'type', 'status'])
      .sort('-created_at');
    
    return response.objects as Testimonial[];
  } catch (error) {
    if (isCosmicError(error) && error.status === 404) {
      return [];
    }
    handleCosmicError(error, 'getTestimonials');
  }
}

// Fetch all case studies with related services
export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'case-studies' })
      .props(['id', 'title', 'slug', 'metadata', 'type', 'status'])
      .depth(1)
      .sort('-created_at');
    
    return response.objects as CaseStudy[];
  } catch (error) {
    if (isCosmicError(error) && error.status === 404) {
      return [];
    }
    handleCosmicError(error, 'getCaseStudies');
  }
}

// Fetch case study by slug with related service
export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'case-studies',
      slug
    }).props(['id', 'title', 'slug', 'metadata', 'type', 'status']).depth(1);
    
    return response.object as CaseStudy;
  } catch (error) {
    if (isCosmicError(error) && error.status === 404) {
      return null;
    }
    handleCosmicError(error, `getCaseStudyBySlug(${slug})`);
  }
}

// Submit contact form - SERVER-SIDE ONLY
export async function submitContactForm(data: ContactFormData): Promise<void> {
  try {
    const title = `${data.name} Contact Form`;
    const slug = `${data.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    
    await cosmic.objects.insertOne({
      title,
      slug,
      type: 'contact-form-submissions',
      status: 'published',
      metadata: {
        name: data.name,
        email: data.email,
        message: data.message
      }
    });
  } catch (error) {
    console.error('Failed to submit contact form:', error);
    handleCosmicError(error, 'submitContactForm');
  }
}

// Fetch contact form submissions - SERVER-SIDE ONLY (for admin purposes)
export async function getContactSubmissions(): Promise<ContactFormSubmission[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'contact-form-submissions' })
      .props(['id', 'title', 'slug', 'metadata', 'type', 'status', 'created_at'])
      .sort('-created_at');
    
    return response.objects as ContactFormSubmission[];
  } catch (error) {
    if (isCosmicError(error) && error.status === 404) {
      return [];
    }
    handleCosmicError(error, 'getContactSubmissions');
  }
}

// Health check function to verify Cosmic connection
export async function checkCosmicConnection(): Promise<boolean> {
  try {
    await cosmic.objects.find({ type: 'services' }).limit(1);
    return true;
  } catch (error) {
    console.error('Cosmic connection failed:', error);
    return false;
  }
}