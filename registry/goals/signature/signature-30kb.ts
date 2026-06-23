import type { GoalDefinition } from '@/registry/goals/schema'

export const signature30kbGoal = {
  slug: 'signature-resize-30kb',
  title: 'Signature Resize to 30KB',
  shortTitle: 'Signature 30KB',
  description:
    'Resize your digital signature to 140×60 px and compress it under 30 KB — perfect for bank exam and job portal applications.',
  longDescription:
    'Several bank exam portals and employment boards require a scanned signature in JPEG format, 140×60 pixels, under 30 KB. ' +
    'This tool resizes your signature to the correct dimensions and compresses it to meet the 30 KB file size requirement. ' +
    'Everything runs in your browser — your signature image is never uploaded to any server.',
  category: 'signature',
  tags: ['signature', 'signature resize', '30kb', 'bank exam', 'digital signature'],
  tool: 'image-resizer',
  preset: 'signature-30kb',
  keywords: [
    'signature resize 30kb',
    'signature 30kb online',
    'compress signature to 30kb',
    'bank exam signature size 30kb',
    'signature 140x60 pixels 30kb',
    'ibps signature 30kb',
    'ssc signature resize',
  ],
  howItWorks: [
    {
      title: 'Upload your scanned signature',
      body: 'Select your scanned or digital signature image. JPEG, PNG, and WebP are all supported.',
    },
    {
      title: 'Resized to 140×60 px and compressed under 30 KB',
      body: 'Your signature is resized to 140×60 pixels and compressed to meet the 30 KB limit — entirely in your browser.',
    },
    {
      title: 'Download and upload to your portal',
      body: 'Download the JPEG and upload it directly to your bank exam or job application portal.',
    },
  ],
  faqs: [
    {
      question: 'Which portals require a signature under 30 KB?',
      answer:
        'Many bank recruitment portals (IBPS, SBI, RBI) allow signatures up to 30 KB. Check your application form — if it says 30 KB, use this tool.',
    },
    {
      question: 'Is the 30 KB signature suitable for UPSC?',
      answer:
        'UPSC allows signatures up to 30 KB (minimum 4 KB), so yes — this tool produces a UPSC-compatible signature. Use {{goal:signature-resize-20kb}} if you want a smaller file.',
    },
    {
      question: 'Can I use this for both IBPS PO and IBPS Clerk?',
      answer:
        'Yes. IBPS PO, IBPS Clerk, and IBPS SO all use the same signature specification — 140×60 px, under 30 KB, JPEG format.',
    },
    {
      question: 'I need a photo as well. What tool should I use?',
      answer:
        'Use {{goal:ibps-photo-resizer}} to prepare your IBPS application photo, or {{goal:bank-exam-photo-resizer}} for SBI and other banks.',
    },
  ],
  relatedGoals: [
    'signature-resize-20kb',
    'signature-resize-10kb',
    'signature-resize-50kb',
    'ibps-photo-resizer',
    'ssc-photo-resizer',
  ],
  complementaryGoals: [
    'ibps-photo-resizer',
    'bank-exam-photo-resizer',
  ],
  status: 'active',
  priority: 'medium',
  updatedAt: '2026-06-23',
} satisfies GoalDefinition
