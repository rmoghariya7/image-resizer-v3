import type { GoalDefinition } from '@/registry/goals/schema'

export const panCardGoal = {
  slug: 'pan-card-photo-resizer',
  title: 'PAN Card Photo Resizer',
  shortTitle: 'PAN Card Photo',
  description:
    'Prepare your PAN card application photo. NSDL and UTIITSL require 200x230 pixels, JPEG, under 50 KB. Browser-only, no upload.',
  seoTitle: 'PAN card photo resize: 200x230 px, under 50 KB | Presetly',
  ogDescription:
    'Get your PAN card application photo ready. NSDL and UTIITSL require 200x230 pixels, JPEG, under 50 KB. Done in your browser. No upload.',
  twitterDescription: 'PAN card photo: 200x230 px, 50 KB. NSDL and UTIITSL ready. Free.',
  longDescription:
    'The NSDL and UTIITSL PAN card application portals require a photo of 200×230 pixels in JPEG format, ' +
    'under 50 KB. This tool resizes and compresses your photo to the correct PAN card dimensions automatically. ' +
    'All processing happens in your browser. Your photo never leaves your device.',
  category: 'id-documents',
  subcategory: 'central-ids',
  tags: ['pan card', 'nsdl', 'utiitsl', 'income tax', 'id document', 'photo resize'],
  tool: 'image-resizer',
  preset: 'pan-card',
  keywords: [
    'pan card photo size',
    'pan card photo resize',
    'nsdl photo requirements',
    'pan application photo size pixels',
    'pan card photo 200x230',
  ],
  howItWorks: [
    {
      title: 'Upload your photo',
      body: 'Select any clear photo of yourself. JPEG, PNG, and WebP are all supported.',
    },
    {
      title: 'Resized to 200×230 px in your browser',
      body: 'Your photo is resized to 200×230 pixels and compressed under 50 KB. Nothing is sent to any server.',
    },
    {
      title: 'Download and apply',
      body: 'Download your JPEG and upload it to the NSDL or UTIITSL PAN card application portal.',
    },
  ],
  faqs: [
    {
      question: 'What is the photo size for PAN card application?',
      answer:
        'NSDL and UTIITSL require a photo of 200×230 pixels in JPEG format, under 50 KB, with a white background.',
    },
    {
      question: 'Is the PAN card photo the same size as Aadhaar?',
      answer:
        'No. PAN card requires 200×230 px while Aadhaar requires a square 200×200 px. This tool applies the correct PAN card dimensions.',
    },
    {
      question: 'I also need to resize my signature for PAN card. Where can I do that?',
      answer:
        'Use our {{goal:signature-resize-20kb}}. PAN card also requires a digital signature of 140x60 pixels, under 10 KB.',
    },
    {
      question: 'What background should my PAN card photo have?',
      answer: 'A plain white or off-white background is required. The NSDL portal rejects photos with coloured backgrounds.',
    },
  ],
  relatedGoals: [
    'aadhaar-photo-resizer',
    'voter-id-photo-resizer',
    'passport-photo-maker',
    'signature-resize-20kb',
    'compress-image-to-50kb',
  ],
  complementaryGoals: [
    'signature-resize-20kb',
    'aadhaar-photo-resizer',
  ],
  status: 'active',
  priority: 'high',
  updatedAt: '2026-06-01',
} satisfies GoalDefinition
