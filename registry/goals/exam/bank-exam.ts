import type { GoalDefinition } from '@/registry/goals/schema'

export const bankExamGoal = {
  slug: 'bank-exam-photo-resizer',
  title: 'Bank Exam Photo Resizer',
  shortTitle: 'Bank Exam Photo',
  description:
    'Resize your photo to SBI, PNB, Canara Bank, and other bank exam requirements — 413×531 px, under 50 KB — free.',
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
      body: 'Drop your photo or click to select it. JPEG, PNG, and WebP are all accepted.',
    },
    {
      title: 'Resized to bank exam spec instantly',
      body: 'Your photo is resized to 413×531 pixels and compressed under 50 KB entirely in your browser.',
    },
    {
      title: 'Download and submit',
      body: 'Download your JPEG and upload it to any bank exam application portal — SBI, PNB, Canara Bank, and more.',
    },
  ],
  faqs: [
    {
      question: 'What photo size does SBI PO require?',
      answer:
        'SBI PO and SBI Clerk require a passport-size photo: 3.5×4.5 cm (413×531 pixels), JPEG format, under 50 KB. This tool targets exactly that.',
    },
    {
      question: 'Why does this tool use 50 KB and not 200 KB?',
      answer:
        'SBI uses the strictest limit at 50 KB. Using 50 KB ensures your photo is accepted by all bank portals including those with higher limits.',
    },
    {
      question: 'What background is required for bank exam photos?',
      answer:
        'Most bank portals require a plain white background. Ensure a recent photo (within the last 6 months) with a neutral expression.',
    },
    {
      question: 'Do I need a separate signature image?',
      answer:
        'Yes. Banks require a signature image at 140×60 pixels, under 20–30 KB. Use {{goal:signature-resize-20kb}} or {{goal:signature-resize-30kb}}.',
    },
    {
      question: 'Can I use this for IBPS as well?',
      answer:
        'Yes, a 50 KB photo is within IBPS\'s 200 KB limit, so it will be accepted. Alternatively, use {{goal:ibps-photo-resizer}} which applies IBPS\'s native 200 KB limit for better quality.',
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
  updatedAt: '2026-06-23',
} satisfies GoalDefinition
