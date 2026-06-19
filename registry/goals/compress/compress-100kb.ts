import type { GoalDefinition } from '@/registry/goals/schema'

export const compress100kbGoal = {
  slug: 'compress-image-to-100kb',
  title: 'Compress Image to 100KB',
  shortTitle: 'Compress to 100KB',
  description:
    'Compress any image to under 100 KB instantly in your browser. No settings, no uploads, no account required.',
  longDescription:
    'Passport photo applications, railway concession forms, scholarship portals, and many government services ' +
    'cap photo uploads at 100 KB. This tool compresses your image to under 100 KB by finding the highest quality ' +
    'level that fits within that limit. The format is preserved — JPEG stays JPEG, PNG stays PNG. ' +
    'All processing runs in your browser; nothing is uploaded to any server.',
  category: 'compress',
  tags: ['compress image', 'reduce image size', '100kb', 'file size', 'jpeg compression'],
  tool: 'image-resizer',
  preset: 'compress-100kb',
  keywords: [
    'compress image to 100kb',
    'reduce image size to 100kb',
    'image compressor 100kb',
    'make photo 100kb',
    'compress jpg to 100kb',
    'compress png to 100kb',
  ],
  howItWorks: [
    {
      title: 'Upload your image',
      body: 'Drop your image or click to select it. JPEG, PNG, and WebP are all accepted.',
    },
    {
      title: 'Compressed to under 100 KB in your browser',
      body: 'A quality-optimising algorithm finds the highest quality that fits within 100 KB. Nothing leaves your device.',
    },
    {
      title: 'Download your compressed image',
      body: 'Download the compressed file and upload it to any portal that requires images under 100 KB.',
    },
  ],
  faqs: [
    {
      question: 'Which portals require images under 100 KB?',
      answer:
        'Passport applications (Passport Seva), IRCTC railway concessions, scholarship portals, and many state recruitment boards limit photos to 100 KB.',
    },
    {
      question: 'Is 100 KB enough quality for a printed photo?',
      answer:
        'For digital submission, yes — portals display the photo at screen resolution. For printing, you may need a higher-resolution original.',
    },
    {
      question: 'Will my PNG be converted to JPEG during compression?',
      answer:
        'No. For this preset the format is preserved. If the PNG is still over 100 KB at maximum compression, try resizing the image first.',
    },
    {
      question: 'I need my passport photo at exactly 600×600 px as well. What should I use?',
      answer:
        'Use {{goal:passport-photo-maker}} — it resizes to the correct 600×600 px and compresses to under 500 KB for Indian passport applications in one step.',
    },
  ],
  relatedGoals: [
    'compress-image-to-50kb',
    'compress-image-to-20kb',
    'passport-photo-maker',
    'aadhaar-photo-resizer',
    'voter-id-photo-resizer',
  ],
  complementaryGoals: [
    'passport-photo-maker',
    'compress-image-to-50kb',
  ],
  status: 'active',
  priority: 'high',
  updatedAt: '2026-06-01',
} satisfies GoalDefinition
