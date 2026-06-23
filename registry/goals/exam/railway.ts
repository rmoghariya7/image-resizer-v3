import type { GoalDefinition } from '@/registry/goals/schema'

export const railwayGoal = {
  slug: 'railway-photo-resizer',
  title: 'Railway Photo Resizer',
  shortTitle: 'Railway Photo',
  description:
    'Resize your photo to Indian Railways (RRB/RRC) requirements — 413×531 px, under 100 KB, JPEG — free and browser-based.',
  longDescription:
    'Indian Railways recruitment exams (RRB NTPC, RRB Group D, RRC, RPF) require application photos to be 3.5×4.5 cm ' +
    '(413×531 pixels at 300 DPI), JPEG format, and under 100 KB. This tool applies the correct Railway preset automatically. ' +
    'Upload your photo, download a compliant JPEG. No settings, no server, no sign-up.',
  category: 'exam',
  subcategory: 'railway-education',
  tags: ['railway', 'rrb', 'rrb ntpc', 'rrb group d', 'indian railways', 'rpf', 'government exam', 'photo resize'],
  tool: 'image-resizer',
  preset: 'railway',
  keywords: [
    'rrb photo size',
    'railway recruitment photo size',
    'rrb ntpc photo size pixels',
    'railway photo resize online',
    'rrb group d photo requirements',
    'indian railways application photo size',
    'rpf photo size',
  ],
  howItWorks: [
    {
      title: 'Upload your photo',
      body: 'Drop your photo or click to select it. JPEG, PNG, and WebP are all accepted.',
    },
    {
      title: 'Resized to Railway spec instantly',
      body: 'Your photo is resized to 413×531 pixels and compressed under 100 KB entirely in your browser.',
    },
    {
      title: 'Download and submit',
      body: 'Download your JPEG and upload it directly to the RRB or RRC online application portal.',
    },
  ],
  faqs: [
    {
      question: 'What photo size does RRB NTPC require?',
      answer:
        'RRB NTPC requires a photo of 3.5×4.5 cm (413×531 pixels), JPEG format, and typically under 100 KB. This tool applies those exact specifications.',
    },
    {
      question: 'Is RRB Group D photo size the same as NTPC?',
      answer:
        'Yes — RRB NTPC, RRB Group D, RRC Group C, and RPF all use the same photo dimensions: 3.5×4.5 cm, JPEG, under 100 KB.',
    },
    {
      question: 'What background is required for Railway exam photos?',
      answer:
        'A plain white background is required. The candidate must face forward with a neutral expression.',
    },
    {
      question: 'Do I also need to upload my signature?',
      answer:
        'Yes. Use {{goal:signature-resize-20kb}} to prepare your digital signature to 140×60 pixels, under 20 KB — required alongside the photo on Railway applications.',
    },
    {
      question: 'Can I use this tool for RPF Constable applications?',
      answer:
        'Yes. RPF Constable and Sub-Inspector applications follow the same photo requirements as other Railway exams.',
    },
  ],
  relatedGoals: [
    'upsc-photo-resizer',
    'ssc-photo-resizer',
    'ibps-photo-resizer',
    'bank-exam-photo-resizer',
    'signature-resize-20kb',
  ],
  complementaryGoals: [
    'signature-resize-20kb',
    'signature-resize-30kb',
  ],
  status: 'active',
  priority: 'high',
  updatedAt: '2026-06-23',
} satisfies GoalDefinition
