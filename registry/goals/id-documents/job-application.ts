import type { GoalDefinition } from '@/registry/goals/schema'

export const jobApplicationGoal = {
  slug: 'job-application-photo-resizer',
  title: 'Job Application Photo Resizer',
  shortTitle: 'Job Application Photo',
  description:
    'Resize your profile photo for job portals like Naukri, LinkedIn, and government employment sites — 413×531 px, under 200 KB.',
  longDescription:
    'Job portals and government employment sites (NCS, Employment Exchange, Naukri) typically require a passport-size ' +
    'professional photo: 3.5×4.5 cm (413×531 pixels at 300 DPI), JPEG format, under 200 KB. ' +
    'This tool applies those dimensions and compresses your photo to meet the file size requirement. ' +
    'Upload your photo and download a professional, portal-ready JPEG instantly.',
  category: 'id-documents',
  subcategory: 'employment-travel',
  tags: ['job application', 'job portal', 'naukri', 'employment', 'professional photo', 'photo resize'],
  tool: 'image-resizer',
  preset: 'job-application',
  keywords: [
    'job application photo size',
    'naukri photo size',
    'job portal photo resize',
    'employment portal photo requirements',
    'professional photo resize online',
    'job application photo size pixels',
    'ncs portal photo size',
  ],
  howItWorks: [
    {
      title: 'Upload your professional photo',
      body: 'Drop your photo or click to select it. JPEG, PNG, and WebP are all accepted.',
    },
    {
      title: 'Resized to job portal spec instantly',
      body: 'Your photo is resized to 413×531 pixels and compressed under 200 KB entirely in your browser.',
    },
    {
      title: 'Download and upload to your job portal',
      body: 'Download your JPEG and use it on Naukri, government employment portals, or any job application form.',
    },
  ],
  faqs: [
    {
      question: 'What photo size is required for job applications?',
      answer:
        'Most Indian job portals accept a passport-size photo: 3.5×4.5 cm (413×531 pixels), JPEG format, under 200 KB.',
    },
    {
      question: 'Can I use this for government job applications (SSC, UPSC)?',
      answer:
        'For SSC, use {{goal:ssc-photo-resizer}} and for UPSC, use {{goal:upsc-photo-resizer}} — those apply exam-specific file size limits.',
    },
    {
      question: 'What background should I use for a job application photo?',
      answer:
        'A plain white or light-grey background is professional and widely accepted. Wear formal attire for a polished appearance.',
    },
    {
      question: 'Is this photo suitable for LinkedIn?',
      answer:
        'LinkedIn recommends a square 400×400 px photo. For LinkedIn specifically, the output (413×531) may be cropped. This tool is better suited for form-based job portals.',
    },
  ],
  relatedGoals: [
    'resume-photo-resizer',
    'upsc-photo-resizer',
    'ssc-photo-resizer',
    'pan-card-photo-resizer',
    'compress-image-to-200kb',
  ],
  complementaryGoals: [
    'resume-photo-resizer',
    'compress-image-to-200kb',
  ],
  status: 'active',
  priority: 'medium',
  updatedAt: '2026-06-23',
} satisfies GoalDefinition
