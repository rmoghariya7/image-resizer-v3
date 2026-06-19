import type { GoalDefinition } from '@/registry/goals/schema'

export const ndaGoal = {
  slug: 'nda-photo-resizer',
  title: 'NDA Photo Resizer',
  shortTitle: 'NDA Photo',
  description:
    'Resize your photo to NDA exam specifications — 413×531 px, JPEG, under 300 KB — instantly in your browser.',
  longDescription:
    'The National Defence Academy online application requires photos at 3.5×4.5 cm (413×531 pixels at 300 DPI), ' +
    'in JPEG format and under 300 KB. This tool applies the correct NDA preset automatically. ' +
    'Upload your photo and download a compliant file in seconds — all processing happens in your browser.',
  category: 'exam',
  subcategory: 'defence',
  tags: ['nda', 'national defence academy', 'defence exam', 'upsc nda', 'photo resize'],
  tool: 'image-resizer',
  preset: 'nda',
  keywords: [
    'nda photo size',
    'nda exam photo requirements',
    'nda application photo size pixels',
    'upsc nda photo resize',
    'nda photo 413x531',
  ],
  howItWorks: [
    {
      title: 'Upload your photo',
      body: 'Drop your photo or click to select it. JPEG, PNG, and WebP are all supported.',
    },
    {
      title: 'Resized to NDA spec in your browser',
      body: 'Your photo is resized to 413×531 pixels and compressed under 300 KB. Nothing leaves your device.',
    },
    {
      title: 'Download and submit',
      body: 'Download your JPEG and upload it to the NDA online application portal.',
    },
  ],
  faqs: [
    {
      question: 'What is the photo size requirement for the NDA exam application?',
      answer:
        'The NDA application requires a photo of 3.5×4.5 cm (413×531 pixels at 300 DPI), in JPEG format and under 300 KB.',
    },
    {
      question: 'What background should I use for my NDA application photo?',
      answer: 'Use a white or plain light-coloured background. The photo must show your full face clearly.',
    },
    {
      question: 'Is the NDA photo size the same as UPSC?',
      answer:
        'Yes, both NDA and UPSC use the same photo dimensions (3.5×4.5 cm, JPEG, 300 KB max). You can use the same photo.',
    },
    {
      question: 'Do I need to resize my signature for the NDA application?',
      answer:
        'Yes. The NDA application also requires a digital signature image. Use our {{goal:signature-resize-20kb}} to prepare it.',
    },
  ],
  relatedGoals: [
    'upsc-photo-resizer',
    'gpsc-photo-resizer',
    'signature-resize-20kb',
    'pan-card-photo-resizer',
  ],
  complementaryGoals: [
    'signature-resize-20kb',
    'upsc-photo-resizer',
  ],
  status: 'active',
  priority: 'medium',
  updatedAt: '2026-06-01',
} satisfies GoalDefinition
