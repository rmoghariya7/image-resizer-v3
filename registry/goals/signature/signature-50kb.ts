import type { GoalDefinition } from '@/registry/goals/schema'

export const signature50kbGoal = {
  slug: 'signature-resize-50kb',
  title: 'Signature Resize to 50KB',
  shortTitle: 'Signature 50KB',
  description:
    'Resize your digital signature to 140×60 px and compress it under 50 KB — ideal for Aadhaar, PAN card, and document update portals.',
  longDescription:
    'Document update portals like Aadhaar online services and PAN card applications sometimes allow signatures up to 50 KB. ' +
    'This tool resizes your signature image to the standard 140×60 pixel dimensions and compresses it comfortably under 50 KB. ' +
    'Everything runs in your browser — no server upload, no account required.',
  category: 'signature',
  tags: ['signature', 'signature resize', '50kb', 'aadhaar signature', 'pan card', 'digital signature'],
  tool: 'image-resizer',
  preset: 'signature-50kb',
  keywords: [
    'signature resize 50kb',
    'signature 50kb online',
    'compress signature to 50kb',
    'aadhaar signature size',
    'pan card signature size 50kb',
    'signature 140x60 pixels 50kb',
    'resize signature 50kb free',
  ],
  howItWorks: [
    {
      title: 'Upload your scanned signature',
      body: 'Select your scanned or digital signature image. JPEG, PNG, and WebP are all supported.',
    },
    {
      title: 'Resized to 140×60 px and compressed under 50 KB',
      body: 'Your signature is resized to 140×60 pixels and compressed to meet the 50 KB limit — entirely in your browser.',
    },
    {
      title: 'Download and upload to your portal',
      body: 'Download the JPEG and upload it directly to Aadhaar services, PAN portal, or other document update portals.',
    },
  ],
  faqs: [
    {
      question: 'What is the signature size for Aadhaar update?',
      answer:
        'UIDAI Aadhaar online portals typically accept a signature image under 50 KB in JPEG format. This tool targets exactly that limit.',
    },
    {
      question: 'Is a 50 KB signature too large for most exam portals?',
      answer:
        'Yes — exam portals like UPSC, SSC, and IBPS require signatures under 20–30 KB. For those, use {{goal:signature-resize-20kb}} or {{goal:signature-resize-30kb}} instead.',
    },
    {
      question: 'My signature has a transparent background. Will that work?',
      answer:
        'The tool automatically fills transparent backgrounds with white, which is required for JPEG output. This ensures portal compatibility.',
    },
    {
      question: 'I also need to update my photo on the portal. What should I use?',
      answer:
        'Use {{goal:aadhaar-photo-resizer}} for Aadhaar photo updates or {{goal:pan-card-photo-resizer}} for PAN card applications.',
    },
  ],
  relatedGoals: [
    'signature-resize-20kb',
    'signature-resize-30kb',
    'signature-resize-10kb',
    'aadhaar-photo-resizer',
    'pan-card-photo-resizer',
  ],
  complementaryGoals: [
    'aadhaar-photo-resizer',
    'pan-card-photo-resizer',
  ],
  status: 'active',
  priority: 'medium',
  updatedAt: '2026-06-23',
} satisfies GoalDefinition
