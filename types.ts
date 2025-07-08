// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status: string;
  bucket: string;
  published_at?: string;
  modified_by?: string;
  created_by?: string;
  thumbnail?: string;
}

// File/Image interface for Cosmic media fields
interface CosmicFile {
  url: string;
  imgix_url: string;
  name?: string;
  size?: number;
  type?: string;
}

// Rating interface for select-dropdown fields
interface CosmicRating {
  key: string;
  value: string;
}

// Service object type
interface Service extends CosmicObject {
  type: 'services';
  metadata: {
    service_name: string;
    description: string;
    key_features?: string;
    starting_price?: string;
    service_icon?: CosmicFile;
  };
}

// Team Member object type
interface TeamMember extends CosmicObject {
  type: 'team-members';
  metadata: {
    full_name: string;
    job_title: string;
    bio?: string;
    profile_photo?: CosmicFile;
    email?: string;
    linkedin_url?: string;
  };
}

// Testimonial object type
interface Testimonial extends CosmicObject {
  type: 'testimonials';
  metadata: {
    client_name: string;
    company?: string;
    position?: string;
    testimonial_text: string;
    rating?: CosmicRating;
    client_photo?: CosmicFile;
  };
}

// Case Study object type
interface CaseStudy extends CosmicObject {
  type: 'case-studies';
  metadata: {
    project_title: string;
    client_name: string;
    project_overview: string;
    challenge?: string;
    solution?: string;
    results?: string;
    project_duration?: string;
    featured_image?: CosmicFile;
    project_gallery?: CosmicFile[];
    related_service?: Service;
  };
}

// Contact Form Submission object type
interface ContactFormSubmission extends CosmicObject {
  type: 'contact-form-submissions';
  metadata: {
    name: string;
    email: string;
    message: string;
  };
}

// Cart Item interface
interface CartItem {
  id: string;
  service: Service;
  quantity: number;
  addedAt: Date;
}

// Cart state interface
interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
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

interface CosmicSingleResponse<T> {
  object: T;
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

interface CartItemProps {
  item: CartItem;
}

interface AddToCartButtonProps {
  service: Service;
  className?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
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

// Checkout form types
interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  projectDetails: string;
  preferredStartDate: string;
  paymentMethod: 'card' | 'invoice' | 'paypal';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  nameOnCard?: string;
}

// Error types
interface CosmicError {
  status: number;
  message: string;
}

// Type guards
function isService(obj: CosmicObject): obj is Service {
  return obj.type === 'services';
}

function isTeamMember(obj: CosmicObject): obj is TeamMember {
  return obj.type === 'team-members';
}

function isTestimonial(obj: CosmicObject): obj is Testimonial {
  return obj.type === 'testimonials';
}

function isCaseStudy(obj: CosmicObject): obj is CaseStudy {
  return obj.type === 'case-studies';
}

function isContactFormSubmission(obj: CosmicObject): obj is ContactFormSubmission {
  return obj.type === 'contact-form-submissions';
}

// Utility type for making all properties optional except specified ones
type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export type {
  CosmicObject,
  CosmicFile,
  CosmicRating,
  CosmicError,
  Service,
  TeamMember,
  Testimonial,
  CaseStudy,
  ContactFormSubmission,
  CartItem,
  CartState,
  RatingKey,
  CosmicResponse,
  CosmicSingleResponse,
  ServiceCardProps,
  TeamMemberCardProps,
  TestimonialCardProps,
  CaseStudyCardProps,
  CartItemProps,
  AddToCartButtonProps,
  ContactFormData,
  ContactFormProps,
  CheckoutFormData,
  PartialExcept,
};

export {
  isService,
  isTeamMember,
  isTestimonial,
  isCaseStudy,
  isContactFormSubmission,
};