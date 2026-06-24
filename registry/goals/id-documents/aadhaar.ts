import type { GoalDefinition } from '@/registry/goals/schema'

export const aadhaarGoal = {
  slug: 'aadhaar-photo-resizer',
  title: 'Aadhaar Photo Resizer',
  shortTitle: 'Aadhaar Photo',
  description:
    'Resize your photo for Aadhaar update. UIDAI requires 200x200 pixels, JPEG, under 50 KB. Done in your browser, no server upload.',
  seoTitle: 'Aadhaar photo resize online: 200x200 px, 50 KB | Presetly',
  ogDescription:
    'Resize your photo for Aadhaar update. UIDAI requires 200x200 pixels, JPEG, under 50 KB. All processing runs in your browser. Nothing uploaded.',
  twitterDescription: 'Aadhaar update photo: 200x200 px, 50 KB. Browser-only. Free.',
  longDescription:
    'The UIDAI Aadhaar update portal requires a photo of exactly 200×200 pixels in JPEG format, under 50 KB. ' +
    'Most phone cameras produce photos that are far too large and the wrong shape. This tool resizes and compresses ' +
    'your photo to the correct Aadhaar specification automatically. Everything runs locally in your browser.',
  category: 'id-documents',
  subcategory: 'central-ids',
  tags: ['aadhaar', 'uidai', 'aadhar card', 'id document', 'photo resize'],
  tool: 'image-resizer',
  preset: 'aadhaar',
  keywords: [
    'aadhaar photo size',
    'aadhaar photo resize',
    'uidai photo requirements',
    'aadhaar update photo size pixels',
    'aadhar card photo 200x200',
  ],
  howItWorks: [
    {
      title: 'Upload your photo',
      body: 'Select any recent photo of yourself. JPEG, PNG, and WebP are all supported.',
    },
    {
      title: 'Resized to 200×200 px in your browser',
      body: 'Your photo is resized to a 200×200 pixel square and compressed under 50 KB. Nothing is uploaded to any server.',
    },
    {
      title: 'Download and update Aadhaar',
      body: 'Download your JPEG and upload it to the UIDAI self-service update portal.',
    },
  ],
  faqs: [
    {
      question: 'What photo size does the Aadhaar update portal require?',
      answer:
        'UIDAI requires a photo of 200×200 pixels in JPEG format, under 50 KB, with a white or plain background.',
    },
    {
      question: 'Can I use a rectangular photo for Aadhaar update?',
      answer:
        'No. The Aadhaar portal requires a square photo (200×200 px). This tool crops your photo to a square automatically.',
    },
    {
      question: 'Can I also use this photo for my PAN card?',
      answer:
        'PAN card has different dimensions (200×230 px). Use our {{goal:pan-card-photo-resizer}} for the correct PAN card spec.',
    },
    {
      question: 'Will resizing reduce my photo quality?',
      answer:
        'The tool uses the highest JPEG quality that still meets the 50 KB limit. For most photos, the output looks identical to the original.',
    },
  ],
  relatedGoals: [
    'pan-card-photo-resizer',
    'voter-id-photo-resizer',
    'passport-photo-maker',
    'compress-image-to-50kb',
    'upsc-photo-resizer',
  ],
  complementaryGoals: [
    'pan-card-photo-resizer',
    'voter-id-photo-resizer',
    'compress-image-to-50kb',
  ],
  requirementsPage: 'aadhaar-photo-update-requirements',
  status: 'active',
  priority: 'high',
  updatedAt: '2026-06-01',
} satisfies GoalDefinition
