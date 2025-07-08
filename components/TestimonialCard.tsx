import { Testimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const renderStars = (rating: string) => {
    const numStars = parseInt(rating);
    return (
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < numStars ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700">
      {testimonial.metadata.rating && renderStars(testimonial.metadata.rating.key)}
      
      <blockquote className="text-gray-700 dark:text-gray-300 mb-6 italic">
        "{testimonial.metadata.testimonial_text}"
      </blockquote>
      
      <div className="flex items-center">
        {testimonial.metadata.client_photo && (
          <img
            src={`${testimonial.metadata.client_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
            alt={testimonial.metadata.client_name}
            className="w-12 h-12 rounded-full object-cover mr-4"
            width={80}
            height={80}
          />
        )}
        <div>
          <div className="font-semibold text-gray-900 dark:text-white">
            {testimonial.metadata.client_name}
          </div>
          {testimonial.metadata.position && testimonial.metadata.company && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {testimonial.metadata.position} at {testimonial.metadata.company}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}