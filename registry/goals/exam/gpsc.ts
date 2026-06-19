import type { GoalDefinition } from '@/registry/goals/schema'

export const gpscGoal = {
  slug: 'gpsc-photo-resizer',
  title: 'GPSC Photo Resizer',
  shortTitle: 'GPSC Photo',
  description:
    'Resize your photo to GPSC specifications — 413×531 px, under 200 KB — in seconds. Works entirely in your browser.',
  longDescription:
    'The Gujarat Public Service Commission requires application photos to be exactly 3.5×4.5 cm (413×531 pixels) ' +
    'and under 200 KB in JPEG format. This tool applies the correct GPSC preset automatically — upload your photo, ' +
    'download a compliant JPEG. No settings to configure, no uploads to a server.',
  category: 'exam',
  subcategory: 'civil-services',
  tags: ['gpsc', 'gujarat psc', 'state psc', 'government exam', 'photo resize'],
  tool: 'image-resizer',
  preset: 'gpsc',
  keywords: [
    'gpsc photo size',
    'gpsc photo resize',
    'gujarat psc photo requirements',
    'gpsc application photo size pixels',
    'gpsc photo 413x531',
  ],
  howItWorks: [
    {
      title: 'Upload your photo',
      body: 'Drop your photo or click to select it. JPEG, PNG, and WebP are all accepted.',
    },
    {
      title: 'Resized to GPSC spec instantly',
      body: 'Your photo is resized to 413×531 pixels and compressed under 200 KB entirely in your browser.',
    },
    {
      title: 'Download and submit',
      body: 'Download your JPEG and upload it directly to the GPSC online application portal.',
    },
  ],
  faqs: [
    {
      question: 'What photo size does GPSC require?',
      answer:
        'GPSC requires a photo of 3.5×4.5 cm (413×531 pixels at 300 DPI), in JPEG format, and under 200 KB.',
    },
    {
      question: 'What background colour is required for GPSC photos?',
      answer: 'A plain white or light-coloured background is required. Outdoor or patterned backgrounds are rejected.',
    },
    {
      question: 'Is GPSC photo size different from UPSC?',
      answer:
        'The dimensions are the same (3.5×4.5 cm), but GPSC has a stricter file size limit of 200 KB compared to UPSC\'s 300 KB. Use this tool which applies the correct GPSC limit automatically.',
    },
    {
      question: 'Do I need to resize my signature for GPSC too?',
      answer:
        'Yes. Use our {{goal:signature-resize-20kb}} to prepare your digital signature to 140×60 pixels, under 20 KB.',
    },
  ],
  relatedGoals: [
    'upsc-photo-resizer',
    'nda-photo-resizer',
    'pan-card-photo-resizer',
    'aadhaar-photo-resizer',
    'signature-resize-20kb',
  ],
  complementaryGoals: [
    'signature-resize-20kb',
    'pan-card-photo-resizer',
  ],
  status: 'active',
  priority: 'high',
  updatedAt: '2026-06-01',
} satisfies GoalDefinition
