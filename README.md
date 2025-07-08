# Digital Agency Portfolio

A modern, responsive portfolio website built with Next.js 15 and Cosmic CMS. This application showcases services, team members, testimonials, and case studies for a digital agency, featuring beautiful UI components and optimized performance.

![Digital Agency Portfolio](https://imgix.cosmicjs.com/55d5e6b0-5bc2-11f0-a051-23c10f41277a-photo-1556742049-0cfed4f6a45d-1751955065980.jpg?w=1200&h=600&fit=crop&auto=format,compress)

## Features

- 🎨 **Modern Design** - Clean, professional design with smooth animations
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- ⚡ **Next.js 15** - Built with the latest Next.js App Router for optimal performance
- 🔧 **TypeScript** - Full type safety throughout the application
- 🎯 **SEO Optimized** - Proper meta tags and structured data
- 🚀 **Performance** - Optimized images with imgix integration
- 💼 **Service Showcase** - Dynamic service pages with detailed information
- 👥 **Team Section** - Professional team member profiles
- 💬 **Client Testimonials** - Social proof with ratings and client photos
- 📊 **Case Studies** - Detailed project showcases with before/after results
- 🎨 **Tailwind CSS** - Utility-first CSS framework for rapid development

## Clone this Bucket

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket to get started instantly:

[![Clone this Bucket](https://img.shields.io/badge/Clone%20this%20Bucket-4F46E5?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=company-website-production-fdd1db90-5bc1-11f0-ad17-fbb7c8c0d1d2)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a company website with services, team members, testimonials, and case studies"

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket. set apiEnvironment: "staging" in cosmic config

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Grid, Flexbox
- **CMS**: Cosmic CMS with staging environment
- **Images**: Imgix optimization
- **Icons**: Lucide React
- **Deployment**: Vercel-ready configuration

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the required object types

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Create a `.env.local` file:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application.

## Cosmic SDK Examples

### Fetching Services
```typescript
import { cosmic } from '@/lib/cosmic'

const services = await cosmic.objects
  .find({ type: 'services' })
  .props(['id', 'title', 'slug', 'metadata'])
```

### Fetching Team Members
```typescript
const teamMembers = await cosmic.objects
  .find({ type: 'team-members' })
  .props(['id', 'title', 'slug', 'metadata'])
```

### Fetching Case Studies with Related Services
```typescript
const caseStudies = await cosmic.objects
  .find({ type: 'case-studies' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1) // Include related service data
```

## Cosmic CMS Integration

This application integrates with [Cosmic](https://www.cosmicjs.com) CMS and uses the following object types:

- **Services** - Showcase your service offerings
- **Team Members** - Display your team with photos and bios
- **Testimonials** - Client reviews with ratings and photos
- **Case Studies** - Detailed project showcases with related services

For more information about the Cosmic SDK, visit the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add your environment variables in the Vercel dashboard
3. Deploy automatically on every push

### Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard

### Environment Variables
Set these in your hosting platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`
<!-- README_END -->