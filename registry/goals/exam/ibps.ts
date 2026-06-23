import type { GoalDefinition } from '@/registry/goals/schema'

export const ibpsGoal = {
  slug: 'ibps-photo-resizer',
  title: 'IBPS Photo Resizer',
  shortTitle: 'IBPS Photo',
  description:
    'Resize your photo to IBPS specifications — 413×531 px, under 200 KB — for Bank PO, Clerk, and SO applications. Free.',
  longDescription:
    'IBPS (Institute of Banking Personnel Selection) requires a passport-size photo of 3.5×4.5 cm (413×531 pixels), ' +
    'JPEG format, and under 200 KB for all its exams — IBPS PO, IBPS Clerk, IBPS SO, and IBPS RRB. ' +
    'This tool applies the IBPS preset automatically — upload your photo and download a portal-ready JPEG in seconds.',
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
      body: 'Drop your photo or click to select it. JPEG, PNG, and WebP are all accepted.',
    },
    {
      title: 'Resized to IBPS spec instantly',
      body: 'Your photo is resized to 413×531 pixels and compressed under 200 KB entirely in your browser.',
    },
    {
      title: 'Download and submit',
      body: 'Download your JPEG and upload it to the IBPS online application portal.',
    },
  ],
  faqs: [
    {
      question: 'What photo size does IBPS require?',
      answer:
        'IBPS requires a passport-size photograph: 3.5×4.5 cm (413×531 pixels at 300 DPI), JPEG format, under 200 KB.',
    },
    {
      question: 'Is IBPS PO photo size the same as IBPS Clerk?',
      answer:
        'Yes — IBPS PO, IBPS Clerk, IBPS SO, and IBPS RRB all use the same photo specification: 413×531 px, under 200 KB, JPEG.',
    },
    {
      question: 'What background is required for IBPS photos?',
      answer:
        'IBPS requires a plain white background. Avoid outdoor backgrounds, studio props, or coloured walls.',
    },
    {
      question: 'Do I also need to resize my signature for IBPS?',
      answer:
        'Yes. IBPS requires a signature image at 140×60 pixels, under 30 KB. Use {{goal:signature-resize-30kb}} to prepare it.',
    },
    {
      question: 'Can I use the same photo for SBI PO as well?',
      answer:
        'SBI has a stricter 50 KB limit. Use {{goal:bank-exam-photo-resizer}} for SBI which targets under 50 KB.',
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
  updatedAt: '2026-06-23',
} satisfies GoalDefinition
