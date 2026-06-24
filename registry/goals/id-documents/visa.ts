import type { GoalDefinition } from '@/registry/goals/schema'

export const visaGoal = {
  slug: 'visa-photo-maker',
  title: 'Visa Photo Maker',
  shortTitle: 'Visa Photo',
  description:
    'Resize your photo to standard visa specifications. Output is 600x600 pixels with white background, under 500 KB. Free, browser-based.',
  seoTitle: 'Visa photo maker: 600x600 px, white background | Presetly',
  ogDescription:
    'Prepare your visa application photo. Resizes to 600x600 pixels with a white background, output under 500 KB. Works for most country visa formats. Free.',
  twitterDescription: 'Visa photo: 600x600 px, white background. Ready for most visa forms. Free.',
  longDescription:
    'Most international visa applications (including Indian e-Visa, US, UK, Schengen, and Gulf visas) require a square ' +
    'passport-style photo: typically 600×600 pixels at 300 DPI, plain white background, JPEG format, under 500 KB. ' +
    'This tool resizes your photo to the standard square visa format and ensures a white background fill. ' +
    'Everything runs in your browser. No server upload required.',
  category: 'id-documents',
  subcategory: 'employment-travel',
  tags: ['visa', 'visa photo', 'e-visa', 'passport photo', 'international travel', 'photo resize'],
  tool: 'image-resizer',
  preset: 'visa',
  keywords: [
    'visa photo size',
    'visa photo maker online free',
    'visa photo resize',
    'e-visa photo size india',
    'visa photo 600x600',
    'us visa photo size',
    'schengen visa photo size',
    'uk visa photo requirements',
  ],
  howItWorks: [
    {
      title: 'Upload your photo',
      body: 'Drop your photo or click to select it. JPEG, PNG, and WebP are all accepted.',
    },
    {
      title: 'Resized to square visa format',
      body: 'Your photo is resized to 600x600 pixels with a white background fill and compressed under 500 KB, entirely in your browser.',
    },
    {
      title: 'Download and attach to your visa application',
      body: 'Download your JPEG and upload it to your visa application portal.',
    },
  ],
  faqs: [
    {
      question: 'What is the standard visa photo size?',
      answer:
        'Most online visa portals accept a square photo of 600×600 pixels at 300 DPI, JPEG format, under 500 KB. This tool targets that standard format.',
    },
    {
      question: 'Does this tool work for Indian e-Visa applications?',
      answer:
        'Yes. The Indian e-Visa portal requires a square JPEG photo under 1 MB. This tool produces a 600×600 px JPEG well under that limit.',
    },
    {
      question: 'What background is required for visa photos?',
      answer:
        'All major visa programs require a plain white background. This tool applies a white background fill automatically to ensure compliance.',
    },
    {
      question: 'My country requires a 35mm × 45mm photo. Will this work?',
      answer:
        'Physical print requirements (like 35×45 mm) are for printed photos. For online visa applications, the 600×600 px digital format is the standard. For physical prints, consult a photo studio.',
    },
    {
      question: 'Can I use this for US visa (DS-160)?',
      answer:
        'The DS-160 form accepts a JPEG under 300 KB with a white background. This tool\'s output meets those requirements.',
    },
  ],
  relatedGoals: [
    'passport-photo-maker',
    'driving-licence-photo-resizer',
    'aadhaar-photo-resizer',
    'pan-card-photo-resizer',
    'compress-image-to-200kb',
  ],
  complementaryGoals: [
    'passport-photo-maker',
    'compress-image-to-200kb',
  ],
  status: 'active',
  priority: 'high',
  updatedAt: '2026-06-23',
} satisfies GoalDefinition
