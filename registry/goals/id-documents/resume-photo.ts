import type { GoalDefinition } from '@/registry/goals/schema'

export const resumePhotoGoal = {
  slug: 'resume-photo-resizer',
  title: 'Resume Photo Resizer',
  shortTitle: 'Resume Photo',
  description:
    'Resize your passport-style photo for Indian resumes — 413×531 px, under 200 KB — professional and portal-ready.',
  longDescription:
    'Many Indian employers and government job portals require a passport-size photo on the resume or application form: ' +
    '3.5×4.5 cm (413×531 pixels at 300 DPI), JPEG format, under 200 KB. ' +
    'This tool resizes and compresses your photo to the correct specification in seconds. ' +
    'Everything runs in your browser — no uploads, no sign-up required.',
  category: 'id-documents',
  subcategory: 'employment-travel',
  tags: ['resume', 'cv photo', 'resume photo', 'job application', 'professional photo', 'photo resize'],
  tool: 'image-resizer',
  preset: 'resume-photo',
  keywords: [
    'resume photo size',
    'cv photo resize online',
    'resume photo size india',
    'passport size photo for resume',
    'resume photo size pixels',
    'professional photo for resume',
    'compress photo for cv',
  ],
  howItWorks: [
    {
      title: 'Upload your professional photo',
      body: 'Drop your photo or click to select it. JPEG, PNG, and WebP are all accepted.',
    },
    {
      title: 'Resized to standard resume spec instantly',
      body: 'Your photo is resized to 413×531 pixels and compressed under 200 KB entirely in your browser.',
    },
    {
      title: 'Download and attach to your resume',
      body: 'Download your JPEG and insert it into your Word, PDF, or online resume as required.',
    },
  ],
  faqs: [
    {
      question: 'What is the standard photo size for an Indian resume?',
      answer:
        'The standard passport-size photo for Indian resumes is 3.5×4.5 cm (413×531 pixels at 300 DPI), JPEG format, under 200 KB.',
    },
    {
      question: 'Is a resume photo mandatory for Indian job applications?',
      answer:
        'It depends on the employer. Government forms and many private sector application portals in India require a passport-size photo. Check the specific application instructions.',
    },
    {
      question: 'What should I wear for a resume photo?',
      answer:
        'Wear professional business attire — a collared shirt or formal dress — with a plain white or light background for the best impression.',
    },
    {
      question: 'Can I also use this photo for job portal uploads?',
      answer:
        'Yes — use the same photo for both your resume and job portals like Naukri or government employment sites. It meets both requirements.',
    },
    {
      question: 'My resume file is too large because of the photo. How do I fix it?',
      answer:
        'This tool already compresses your photo under 200 KB. If your overall resume PDF is still large, use {{goal:compress-image-to-100kb}} to further reduce the photo before inserting it.',
    },
  ],
  relatedGoals: [
    'job-application-photo-resizer',
    'upsc-photo-resizer',
    'ssc-photo-resizer',
    'compress-image-to-200kb',
    'compress-image-to-100kb',
  ],
  complementaryGoals: [
    'job-application-photo-resizer',
    'compress-image-to-100kb',
  ],
  status: 'active',
  priority: 'medium',
  updatedAt: '2026-06-23',
} satisfies GoalDefinition
