import type { GoalDefinition } from '@/registry/goals/schema'

export const bankExamGoal = {
  slug: 'bank-exam-photo-resizer',
  title: 'Bank Exam Photo Resizer',
  shortTitle: 'Bank Exam Photo',
  description:
    'Resize your photo for SBI, PNB, Canara Bank, and other bank exam portals. Output is 413x531 px, under 50 KB. Free.',
  seoTitle: 'SBI bank exam photo resizer: 413x531 px, 50 KB | Presetly',
  ogDescription:
    'Resize your photo for SBI, PNB, or Canara Bank applications. Hits the SBI 50 KB limit so it works for every bank portal. Free, browser-only.',
  twitterDescription: 'SBI, PNB, Canara bank exam photo: 413x531 px, 50 KB. Free.',
  longDescription:
    'SBI PO, SBI Clerk, PNB, Canara Bank, and other public sector bank exams require an application photo of ' +
    '3.5×4.5 cm (413×531 pixels), JPEG format, under 50 KB. This tool applies the most conservative bank exam ' +
    'limit (50 KB) so your photo is accepted by every bank portal. Upload your photo, download a compliant JPEG.',
  category: 'exam',
  subcategory: 'banking-ssc',
  tags: ['sbi', 'bank exam', 'bank po', 'bank clerk', 'sbi po', 'bank recruitment', 'photo resize'],
  tool: 'image-resizer',
  preset: 'bank-exam',
  keywords: [
    'bank exam photo size',
    'sbi po photo size pixels',
    'bank exam photo resize online',
    'sbi clerk photo requirements',
    'bank application photo size kb',
    'sbi photo 413x531',
    'pnb bank exam photo size',
    'canara bank photo requirements',
  ],
  howItWorks: [
    {
      title: 'Upload your photo',
      body: 'Click the upload area or drag your photo in. JPEG, PNG, and WebP all work. No registration or account required.',
    },
    {
      title: 'Compressed to 50 KB for bank portals',
      body: 'Your photo is resized to 413x531 pixels and compressed under 50 KB. SBI has the strictest limit of all bank portals. This output works on all of them. Processing stays in your browser.',
    },
    {
      title: 'Download and attach to your bank application',
      body: 'Save the JPEG file. Open SBI, PNB, Canara Bank, or any bank recruitment portal and upload this file in the photo field.',
    },
  ],
  faqs: [
    {
      question: 'What photo size does SBI PO require?',
      answer:
        'SBI PO and SBI Clerk require a passport-size photo: 3.5x4.5 cm (413x531 pixels), JPEG format, under 50 KB. This is the strictest bank portal limit in India, and this tool targets exactly that.',
    },
    {
      question: 'Why does this tool use 50 KB and not 200 KB?',
      answer:
        'SBI sets the strictest limit at 50 KB. If you compress to 50 KB, the same file will be accepted by all bank portals, including IBPS and PNB which allow higher sizes. Going the other way does not work.',
    },
    {
      question: 'What background is required for bank exam photos?',
      answer:
        'All major bank portals require a plain white background. Photo should be taken in the last 6 months, face forward, neutral expression. Coloured walls or outdoor backgrounds are rejected.',
    },
    {
      question: 'Do I need a separate signature image for bank applications?',
      answer:
        'Yes. Bank applications require a signature image at 140x60 pixels. The file size limit varies by bank. Use {{goal:signature-resize-20kb}} for a 20 KB output or {{goal:signature-resize-30kb}} for 30 KB.',
    },
    {
      question: 'Can I use this photo for IBPS as well?',
      answer:
        'Yes. A 50 KB photo is well within the IBPS 200 KB limit and will be accepted. But if quality matters more, use {{goal:ibps-photo-resizer}} instead, which applies the full 200 KB budget for a sharper result.',
    },
  ],
  relatedGoals: [
    'ibps-photo-resizer',
    'ssc-photo-resizer',
    'railway-photo-resizer',
    'upsc-photo-resizer',
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
