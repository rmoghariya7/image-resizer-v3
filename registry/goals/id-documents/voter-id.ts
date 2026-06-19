import type { GoalDefinition } from '@/registry/goals/schema'

export const voterIdGoal = {
  slug: 'voter-id-photo-resizer',
  title: 'Voter ID Photo Resizer',
  shortTitle: 'Voter ID Photo',
  description:
    'Resize your photo to EPIC / Voter ID specifications — 413×531 px, JPEG, under 50 KB — instantly in your browser.',
  longDescription:
    'The Election Commission of India requires a passport-size photo of 3.5×4.5 cm (413×531 pixels) in JPEG format, ' +
    'under 50 KB, for new EPIC (Voter ID) enrolment and corrections. This tool applies the correct specification automatically. ' +
    'Upload your photo, download a compliant JPEG — all in your browser with no uploads to any server.',
  category: 'id-documents',
  subcategory: 'central-ids',
  tags: ['voter id', 'epic card', 'election commission', 'id document', 'photo resize'],
  tool: 'image-resizer',
  preset: 'voter-id',
  keywords: [
    'voter id photo size',
    'voter id photo resize',
    'epic photo requirements',
    'election commission photo size pixels',
    'voter card photo size',
  ],
  howItWorks: [
    {
      title: 'Upload your photo',
      body: 'Drop your photo or click to select it. JPEG, PNG, and WebP are all supported.',
    },
    {
      title: 'Resized to Voter ID spec in your browser',
      body: 'Your photo is resized to 413×531 pixels and compressed under 50 KB entirely in your browser.',
    },
    {
      title: 'Download and submit',
      body: 'Download your JPEG and upload it to the National Voters\' Service Portal (NVSP).',
    },
  ],
  faqs: [
    {
      question: 'What photo size is required for Voter ID (EPIC) application?',
      answer:
        'The Election Commission requires a 3.5×4.5 cm photo (413×531 pixels at 300 DPI) in JPEG format, under 50 KB.',
    },
    {
      question: 'Is Voter ID photo size the same as Aadhaar?',
      answer:
        'No. Voter ID requires 3.5×4.5 cm (413×531 px) while Aadhaar requires a square 200×200 px photo. Use the correct tool for each.',
    },
    {
      question: 'What background is required for my Voter ID photo?',
      answer: 'A plain white or light-coloured background is required by the Election Commission.',
    },
    {
      question: 'I also need to update my Aadhaar card. Can I use the same photo?',
      answer:
        'No — Aadhaar requires a 200×200 px square photo. Use our {{goal:aadhaar-photo-resizer}} for the correct Aadhaar dimensions.',
    },
  ],
  relatedGoals: [
    'aadhaar-photo-resizer',
    'pan-card-photo-resizer',
    'passport-photo-maker',
    'compress-image-to-50kb',
  ],
  complementaryGoals: [
    'aadhaar-photo-resizer',
    'pan-card-photo-resizer',
  ],
  status: 'active',
  priority: 'medium',
  updatedAt: '2026-06-01',
} satisfies GoalDefinition
