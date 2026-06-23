import type { GoalDefinition } from '@/registry/goals/schema'

export const signature10kbGoal = {
  slug: 'signature-resize-10kb',
  title: 'Signature Resize to 10KB',
  shortTitle: 'Signature 10KB',
  description:
    'Resize your digital signature to 140×60 px and compress it under 10 KB — ready for portals with strict file size limits.',
  longDescription:
    'Some government portals require a scanned signature in JPEG format, 140×60 pixels, under 10 KB. ' +
    'This tool applies those exact dimensions and compresses the output to meet the 10 KB limit. ' +
    'Upload your scanned signature and download a portal-ready file. Everything runs in your browser — no uploads, no sign-up.',
  category: 'signature',
  tags: ['signature', 'signature resize', '10kb', 'digital signature', 'exam form'],
  tool: 'image-resizer',
  preset: 'signature-10kb',
  keywords: [
    'signature resize 10kb',
    'signature 10kb online',
    'compress signature to 10kb',
    'digital signature 10kb',
    'signature 140x60 pixels 10kb',
    'resize signature image 10kb',
  ],
  howItWorks: [
    {
      title: 'Upload your scanned signature',
      body: 'Select your scanned or digital signature image. JPEG, PNG, and WebP are all supported.',
    },
    {
      title: 'Resized to 140×60 px and compressed under 10 KB',
      body: 'Your signature is resized to 140×60 pixels and compressed to meet the 10 KB limit — entirely in your browser.',
    },
    {
      title: 'Download and upload to your portal',
      body: 'Download the JPEG and upload it directly to your application portal.',
    },
  ],
  faqs: [
    {
      question: 'Which portals require a signature under 10 KB?',
      answer:
        'Some state government portals and older central government systems enforce a 10 KB limit. Check your application form — if it says 10 KB, use this tool.',
    },
    {
      question: 'Will the signature still be readable at 10 KB?',
      answer:
        'Yes. At 140×60 px, the signature is small enough that JPEG compression at 10 KB still preserves legibility. Use a dark ink on plain white paper for best results.',
    },
    {
      question: 'My portal says 20 KB — which tool should I use?',
      answer:
        'Use {{goal:signature-resize-20kb}} for a 20 KB limit. It applies slightly less compression and preserves more detail.',
    },
    {
      question: 'Can I use the same signature image for both photo and signature upload slots?',
      answer:
        'No. The photo slot requires a face photo (413×531 px), while the signature slot requires your scanned signature (140×60 px). They are different files.',
    },
  ],
  relatedGoals: [
    'signature-resize-20kb',
    'signature-resize-30kb',
    'signature-resize-50kb',
    'upsc-photo-resizer',
    'ssc-photo-resizer',
  ],
  complementaryGoals: [
    'upsc-photo-resizer',
    'ssc-photo-resizer',
  ],
  status: 'active',
  priority: 'medium',
  updatedAt: '2026-06-23',
} satisfies GoalDefinition
