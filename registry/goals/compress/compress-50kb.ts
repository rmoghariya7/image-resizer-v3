import type { GoalDefinition } from '@/registry/goals/schema'

export const compress50kbGoal = {
  slug: 'compress-image-to-50kb',
  title: 'Compress Image to 50KB',
  shortTitle: 'Compress to 50KB',
  description:
    'Compress any image to under 50 KB instantly in your browser. No quality settings, no uploads, no sign-up required.',
  longDescription:
    'Aadhaar, PAN card, Voter ID, and many state government portals cap photo uploads at 50 KB. ' +
    'This tool compresses your image to under 50 KB using a quality-optimising algorithm that finds the ' +
    'highest possible quality at that file size. The format is preserved where possible — PNG stays PNG, JPEG stays JPEG.',
  category: 'compress',
  tags: ['compress image', 'reduce image size', '50kb', 'file size', 'jpeg compression'],
  tool: 'image-resizer',
  preset: 'compress-50kb',
  keywords: [
    'compress image to 50kb',
    'reduce image size to 50kb',
    'image compressor 50kb',
    'make photo 50kb',
    'compress jpg to 50kb',
    'compress image for aadhaar',
  ],
  howItWorks: [
    {
      title: 'Upload your image',
      body: 'Drop your image or click to select it. JPEG, PNG, and WebP are all accepted.',
    },
    {
      title: 'Compressed to under 50 KB in your browser',
      body: 'A quality-optimising algorithm finds the best compression level to stay under 50 KB. Nothing leaves your device.',
    },
    {
      title: 'Download your compressed image',
      body: 'Download your compressed file ready to upload to Aadhaar, PAN card, or any portal with a 50 KB limit.',
    },
  ],
  faqs: [
    {
      question: 'Which government portals require images under 50 KB?',
      answer:
        'Aadhaar (UIDAI), PAN card (NSDL/UTIITSL), Voter ID (NVSP), and many state exam portals limit photo uploads to 50 KB.',
    },
    {
      question: 'Does compressing to 50 KB reduce image quality significantly?',
      answer:
        'For most photos originally under 500 KB, the quality difference is barely visible. The tool always picks the highest quality that fits within 50 KB.',
    },
    {
      question: 'Will my PNG be converted to JPEG?',
      answer:
        'No, for this preset the format is preserved. If your PNG is still over 50 KB at maximum compression, you may need to resize it first.',
    },
    {
      question: 'I need to also resize my photo before compressing. What should I use?',
      answer:
        'Use a goal-specific tool: {{goal:aadhaar-photo-resizer}} for Aadhaar or {{goal:pan-card-photo-resizer}} for PAN — these resize and compress to the correct spec in one step.',
    },
  ],
  relatedGoals: [
    'compress-image-to-20kb',
    'compress-image-to-100kb',
    'aadhaar-photo-resizer',
    'pan-card-photo-resizer',
    'voter-id-photo-resizer',
  ],
  complementaryGoals: [
    'aadhaar-photo-resizer',
    'compress-image-to-20kb',
  ],
  status: 'active',
  priority: 'high',
  updatedAt: '2026-06-01',
} satisfies GoalDefinition
