import type { GoalDefinition } from '@/registry/goals/schema'

export const drivingLicenceGoal = {
  slug: 'driving-licence-photo-resizer',
  title: 'Driving Licence Photo Resizer',
  shortTitle: 'Driving Licence Photo',
  description:
    'Resize your photo to Sarathi (Indian driving licence) requirements — 413×531 px, under 200 KB — free and browser-based.',
  longDescription:
    'The Sarathi portal for Indian driving licence applications requires a passport-size photo: 3.5×4.5 cm ' +
    '(413×531 pixels at 300 DPI), JPEG format, under 200 KB. This tool applies the correct preset automatically. ' +
    'Upload your photo and download a Sarathi-ready JPEG. Everything runs in your browser — no uploads to any server.',
  category: 'id-documents',
  subcategory: 'employment-travel',
  tags: ['driving licence', 'sarathi', 'dl', 'rto', 'driving license', 'vehicle licence', 'photo resize'],
  tool: 'image-resizer',
  preset: 'driving-licence',
  keywords: [
    'driving licence photo size',
    'sarathi photo size',
    'driving license photo resize online',
    'dl application photo requirements',
    'sarathi portal photo size pixels',
    'driving licence photo size india',
    'rto photo size',
  ],
  howItWorks: [
    {
      title: 'Upload your photo',
      body: 'Drop your photo or click to select it. JPEG, PNG, and WebP are all accepted.',
    },
    {
      title: 'Resized to Sarathi spec instantly',
      body: 'Your photo is resized to 413×531 pixels and compressed under 200 KB entirely in your browser.',
    },
    {
      title: 'Download and submit',
      body: 'Download your JPEG and upload it to the Sarathi driving licence portal.',
    },
  ],
  faqs: [
    {
      question: 'What photo size does the Sarathi driving licence portal require?',
      answer:
        'The Sarathi portal requires a passport-size photo: 3.5×4.5 cm (413×531 pixels at 300 DPI), JPEG format, under 200 KB.',
    },
    {
      question: 'Is the photo requirement the same for learner licence and permanent licence?',
      answer:
        'Yes — both learner licence (LL) and permanent driving licence (DL) applications on Sarathi use the same photo specification.',
    },
    {
      question: 'What background colour is required for the Sarathi photo?',
      answer:
        'A plain white background is required for all Sarathi application photos.',
    },
    {
      question: 'Can I use the same photo for Aadhaar and driving licence?',
      answer:
        'You can use the same original photo but both portals have the same dimensions (413×531 px), so the resized output is identical. Use {{goal:aadhaar-photo-resizer}} for Aadhaar specifically.',
    },
    {
      question: 'Does the tool work for commercial vehicle licence applications?',
      answer:
        'Yes. Both private and commercial vehicle driving licence applications on Sarathi use the same photo requirements.',
    },
  ],
  relatedGoals: [
    'voter-id-photo-resizer',
    'aadhaar-photo-resizer',
    'pan-card-photo-resizer',
    'passport-photo-maker',
    'visa-photo-maker',
  ],
  complementaryGoals: [
    'aadhaar-photo-resizer',
    'voter-id-photo-resizer',
  ],
  status: 'active',
  priority: 'high',
  updatedAt: '2026-06-23',
} satisfies GoalDefinition
