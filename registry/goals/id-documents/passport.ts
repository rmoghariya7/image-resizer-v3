import type { GoalDefinition } from '@/registry/goals/schema'

export const passportGoal = {
  slug: 'passport-photo-maker',
  title: 'Passport Photo Maker',
  shortTitle: 'Passport Photo',
  description:
    'Create a biometric passport photo that meets Indian passport requirements — 600×600 px, white background, JPEG — in your browser.',
  longDescription:
    'Indian passport applications require a 2×2 inch (51×51 mm) colour photograph with a white or near-white background, ' +
    'in JPEG format. This tool resizes your photo to 600×600 pixels (2×2 inches at 300 DPI), fills transparent areas with white, ' +
    'and ensures the output file is under 500 KB. All processing happens in your browser — nothing is uploaded.',
  category: 'id-documents',
  subcategory: 'central-ids',
  tags: ['passport', 'india passport', 'biometric photo', 'id document', 'photo resize'],
  tool: 'passport-photo',
  preset: 'passport-india',
  keywords: [
    'india passport photo size',
    'passport photo requirements india',
    'passport photo resize',
    'indian passport photo 600x600',
    'passport photo maker india',
    'ecnr passport photo size',
  ],
  howItWorks: [
    {
      title: 'Upload your photo',
      body: 'Select a clear, front-facing photo taken against a white or light background.',
    },
    {
      title: 'Resized and background filled in your browser',
      body: 'Your photo is resized to 600×600 pixels, any transparent areas are filled white, and the file is compressed under 500 KB.',
    },
    {
      title: 'Download your passport photo',
      body: 'Download the JPEG and attach it to your passport application or print it at standard 2×2 inch size.',
    },
  ],
  faqs: [
    {
      question: 'What size should an Indian passport photo be?',
      answer:
        'Indian passport photos must be 2×2 inches (51×51 mm), which is 600×600 pixels at 300 DPI, in JPEG format with a white or near-white background.',
    },
    {
      question: 'Can I wear glasses in my Indian passport photo?',
      answer:
        'No. Since 2019, the Indian passport authority does not accept photos with glasses. The face must be clearly visible without eyewear.',
    },
    {
      question: 'What colour should the background be for an Indian passport photo?',
      answer:
        'The background must be plain white or near-white. This tool automatically fills any transparent or non-white areas with white.',
    },
    {
      question: 'My photo has a non-white background. Can I still use it?',
      answer:
        'This tool fills transparent PNG areas with white. For photos with a coloured background, you should retake the photo against a white background for best results.',
    },
  ],
  relatedGoals: [
    'aadhaar-photo-resizer',
    'pan-card-photo-resizer',
    'voter-id-photo-resizer',
    'compress-image-to-100kb',
  ],
  complementaryGoals: [
    'aadhaar-photo-resizer',
    'pan-card-photo-resizer',
  ],
  requirementsPage: 'passport-photo-requirements-india',
  status: 'active',
  priority: 'high',
  updatedAt: '2026-06-01',
} satisfies GoalDefinition
