import type { GoalDefinition } from '@/registry/goals/schema'

export const sscGoal = {
  slug: 'ssc-photo-resizer',
  title: 'SSC Photo Resizer',
  shortTitle: 'SSC Photo',
  description:
    'Resize your photo to SSC requirements — 413×531 px, under 100 KB, JPEG — instantly in your browser. Free, no uploads.',
  longDescription:
    'The Staff Selection Commission (SSC) requires application photos to be 3.5×4.5 cm (413×531 pixels at 300 DPI), ' +
    'in JPEG format, and under 100 KB. This tool applies the correct SSC preset automatically — upload your photo and ' +
    'download a portal-ready JPEG. No settings to configure, no server upload, no sign-up required.',
  category: 'exam',
  subcategory: 'banking-ssc',
  tags: ['ssc', 'ssc cgl', 'ssc chsl', 'staff selection commission', 'government exam', 'photo resize'],
  tool: 'image-resizer',
  preset: 'ssc',
  keywords: [
    'ssc photo size',
    'ssc cgl photo size',
    'ssc photo resize online',
    'ssc application photo requirements',
    'ssc photo 413x531',
    'staff selection commission photo size',
    'ssc chsl photo size pixels',
  ],
  howItWorks: [
    {
      title: 'Upload your photo',
      body: 'Drop your photo or click to select it. JPEG, PNG, and WebP are all accepted.',
    },
    {
      title: 'Resized to SSC spec instantly',
      body: 'Your photo is resized to 413×531 pixels and compressed under 100 KB entirely in your browser.',
    },
    {
      title: 'Download and submit',
      body: 'Download your JPEG and upload it directly to the SSC online application portal.',
    },
  ],
  faqs: [
    {
      question: 'What photo size does SSC require?',
      answer:
        'SSC requires a photo of 3.5×4.5 cm (413×531 pixels at 300 DPI), JPEG format, between 20 KB and 100 KB. This tool targets under 100 KB to comply with all SSC notifications.',
    },
    {
      question: 'Is SSC CGL photo size the same as SSC CHSL?',
      answer:
        'Yes — SSC CGL, SSC CHSL, SSC MTS, SSC CPO, and SSC GD all use the same photo specification: 3.5×4.5 cm, under 100 KB, JPEG.',
    },
    {
      question: 'What background colour is required for SSC photos?',
      answer:
        'SSC requires a plain white or off-white background. Coloured or patterned backgrounds are rejected.',
    },
    {
      question: 'Do I need to resize my signature separately?',
      answer:
        'Yes. Use {{goal:signature-resize-20kb}} to resize your digital signature to 140×60 pixels, under 20 KB — also required on the SSC application form.',
    },
    {
      question: 'Is SSC photo size different from UPSC?',
      answer:
        'The dimensions are identical (3.5×4.5 cm). UPSC allows up to 300 KB while SSC requires under 100 KB. Use the correct tool for each exam.',
    },
  ],
  relatedGoals: [
    'upsc-photo-resizer',
    'railway-photo-resizer',
    'ibps-photo-resizer',
    'bank-exam-photo-resizer',
    'signature-resize-20kb',
  ],
  complementaryGoals: [
    'signature-resize-20kb',
    'signature-resize-30kb',
  ],
  status: 'active',
  priority: 'high',
  updatedAt: '2026-06-23',
} satisfies GoalDefinition
