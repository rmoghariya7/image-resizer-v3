import type { GoalDefinition } from '@/registry/goals/schema'

export const ibpsGoal = {
  slug: 'ibps-photo-resizer',
  title: 'IBPS Photo Resizer',
  shortTitle: 'IBPS Photo',
  description:
    'Resize your photo to IBPS specifications: 413x531 px, under 200 KB, for Bank PO, Clerk, and SO applications. Free.',
  seoTitle: 'IBPS photo resizer: 413x531 px, under 200 KB | Presetly',
  ogDescription:
    'Prepare your IBPS application photo. Resizes to 413x531 pixels, compresses under 200 KB. Works for PO, Clerk, SO, and RRB. Browser-only.',
  twitterDescription: 'IBPS photo: 413x531 px, 200 KB. PO, Clerk, SO, RRB. Free.',
  longDescription:
    'IBPS (Institute of Banking Personnel Selection) requires a passport-size photo of 3.5×4.5 cm (413×531 pixels), ' +
    'JPEG format, and under 200 KB for all its exams: IBPS PO, IBPS Clerk, IBPS SO, and IBPS RRB. ' +
    'This tool applies the IBPS preset automatically. Upload your photo and download a portal-ready JPEG in seconds.',
  category: 'exam',
  subcategory: 'banking-ssc',
  tags: ['ibps', 'ibps po', 'ibps clerk', 'ibps so', 'bank exam', 'photo resize', 'banking exam'],
  tool: 'image-resizer',
  preset: 'ibps',
  keywords: [
    'ibps photo size',
    'ibps po photo size pixels',
    'ibps clerk photo requirements',
    'ibps photo resize online',
    'ibps application photo size kb',
    'ibps photo 413x531',
    'ibps rrb photo size',
  ],
  howItWorks: [
    {
      title: 'Upload your photo',
      body: 'Tap the upload area or drag your photo in. Works with JPEG, PNG, and WebP. You do not need to create any account.',
    },
    {
      title: 'IBPS spec applied automatically',
      body: 'The tool resizes your photo to 413x531 pixels and brings the file under 200 KB. Processing happens entirely in your browser. Nothing gets uploaded anywhere.',
    },
    {
      title: 'Download and use on the IBPS portal',
      body: 'Download the JPEG. Then go to the IBPS registration page and upload it in the photograph field. Same file works for PO, Clerk, SO, and RRB applications.',
    },
  ],
  faqs: [
    {
      question: 'What photo size does IBPS require?',
      answer:
        'IBPS requires a passport-size photo: 3.5x4.5 cm (413x531 pixels at 300 DPI), JPEG format, under 200 KB. This applies to all IBPS notifications unless a specific exam states otherwise.',
    },
    {
      question: 'Is IBPS PO photo size the same as IBPS Clerk?',
      answer:
        'Yes. IBPS PO, IBPS Clerk, IBPS SO, and IBPS RRB all use the same photo specification. One properly sized file works across all four application portals.',
    },
    {
      question: 'What background is required for IBPS photos?',
      answer:
        'IBPS requires a plain white background. The photo appears on your admit card, so a clean white background with even lighting gives the clearest result. Outdoor backgrounds, studio props, and coloured walls are rejected.',
    },
    {
      question: 'Do I also need to resize my signature for IBPS?',
      answer:
        'Yes. IBPS requires a signature image at 140x60 pixels, under 30 KB. Use {{goal:signature-resize-30kb}} to prepare it. Both the photo and signature must be uploaded before you can submit the application.',
    },
    {
      question: 'Can I use the same photo for SBI PO as well?',
      answer:
        'SBI PO has a stricter 50 KB file size limit. A 200 KB IBPS photo will be rejected on the SBI portal. Use {{goal:bank-exam-photo-resizer}} which compresses specifically to 50 KB.',
    },
  ],
  relatedGoals: [
    'bank-exam-photo-resizer',
    'ssc-photo-resizer',
    'upsc-photo-resizer',
    'ugc-net-photo-resizer',
    'signature-resize-30kb',
  ],
  complementaryGoals: [
    'signature-resize-30kb',
    'signature-resize-20kb',
  ],
  status: 'active',
  priority: 'high',
  updatedAt: '2026-06-24',
} satisfies GoalDefinition
