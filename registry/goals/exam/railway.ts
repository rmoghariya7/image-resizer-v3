import type { GoalDefinition } from '@/registry/goals/schema'

export const railwayGoal = {
  slug: 'railway-photo-resizer',
  title: 'Railway Photo Resizer',
  shortTitle: 'Railway Photo',
  description:
    'Resize your photo for Indian Railways (RRB/RRC) applications. Output is 413x531 px, under 100 KB, JPEG. Free and browser-based.',
  seoTitle: 'Railway RRB photo resize: 413x531 px free | Presetly',
  ogDescription:
    'Resize your photo for RRB NTPC, Group D, RRC, or RPF applications. 413x531 pixels, under 100 KB, JPEG. Free and browser-based.',
  twitterDescription: 'RRB NTPC, Group D photo: 413x531 px, 100 KB. Free.',
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
      body: 'Select a photo from your phone or computer. JPEG, PNG, and WebP are all fine. Opens right in the browser, no app needed.',
    },
    {
      title: 'Resized to Railway specs in your browser',
      body: 'The tool sets the size to 413x531 pixels and keeps the file under 100 KB. Everything is processed on your device. No data goes anywhere.',
    },
    {
      title: 'Download and submit to RRB or RRC portal',
      body: 'Download the JPEG. Then open the RRB NTPC, Group D, or RPF application form and attach this file in the photo upload field.',
    },
  ],
  faqs: [
    {
      question: 'What photo size does RRB NTPC require?',
      answer:
        'RRB NTPC requires a photo of 3.5x4.5 cm (413x531 pixels), JPEG format, and under 100 KB. This tool applies those exact specifications and produces a file the RRB portal will accept.',
    },
    {
      question: 'Is RRB Group D photo size the same as NTPC?',
      answer:
        'Yes. RRB NTPC, RRB Group D, RRC Group C, and RPF Constable all use the same photo dimensions. One processed file works for all of them.',
    },
    {
      question: 'What background is required for Railway recruitment photos?',
      answer:
        'White background, plain. No patterns, no outdoor settings. Face forward with a neutral expression. Railway recruitment boards are fairly strict about background quality on the admit card photo.',
    },
    {
      question: 'Do I also need to upload my signature for Railway applications?',
      answer:
        'Yes. RRB and RRC applications require a separate signature image at 140x60 pixels, under 20 KB. Prepare it with {{goal:signature-resize-20kb}} and upload it alongside the photo.',
    },
    {
      question: 'Can I use this tool for RPF Constable applications?',
      answer:
        'Yes. RPF Constable, RPF Sub-Inspector, and RRC Group C applications all follow the same photo size requirement as other Railway exams.',
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
  updatedAt: '2026-06-24',
} satisfies GoalDefinition
