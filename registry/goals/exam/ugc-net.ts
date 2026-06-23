import type { GoalDefinition } from '@/registry/goals/schema'

export const ugcNetGoal = {
  slug: 'ugc-net-photo-resizer',
  title: 'UGC NET Photo Resizer',
  shortTitle: 'UGC NET Photo',
  description:
    'Resize your photo to UGC NET / NTA specifications — 413×531 px, under 100 KB — for JRF and Assistant Professor applications.',
  longDescription:
    'The NTA UGC NET exam requires an application photo of 3.5×4.5 cm (413×531 pixels at 300 DPI), ' +
    'JPEG format, and under 100 KB. This tool applies the correct UGC NET preset — upload your photo and ' +
    'download a portal-ready JPEG in seconds. Works for both JRF (Junior Research Fellowship) and ' +
    'Assistant Professor eligibility applications.',
  category: 'exam',
  subcategory: 'railway-education',
  tags: ['ugc net', 'nta', 'jrf', 'assistant professor', 'nta exam', 'photo resize', 'university grants'],
  tool: 'image-resizer',
  preset: 'ugc-net',
  keywords: [
    'ugc net photo size',
    'nta ugc net photo requirements',
    'ugc net photo resize online',
    'ugc net application photo size pixels',
    'jrf photo size',
    'ugc net photo 413x531',
    'nta exam photo size',
  ],
  howItWorks: [
    {
      title: 'Upload your photo',
      body: 'Drop your photo or click to select it. JPEG, PNG, and WebP are all accepted.',
    },
    {
      title: 'Resized to UGC NET spec instantly',
      body: 'Your photo is resized to 413×531 pixels and compressed under 100 KB entirely in your browser.',
    },
    {
      title: 'Download and submit',
      body: 'Download your JPEG and upload it to the NTA UGC NET online application form.',
    },
  ],
  faqs: [
    {
      question: 'What photo size does UGC NET require?',
      answer:
        'NTA UGC NET requires a passport-size photo: 3.5×4.5 cm (413×531 pixels at 300 DPI), JPEG format, between 10 KB and 100 KB.',
    },
    {
      question: 'Is UGC NET photo size the same as other NTA exams?',
      answer:
        'Yes — most NTA exams (CUET, CSIR NET, CMAT) follow the same photo specification: 3.5×4.5 cm, JPEG, under 100 KB.',
    },
    {
      question: 'What is the correct background for NTA exam photos?',
      answer:
        'NTA requires a plain white background with the candidate\'s face clearly visible, looking straight at the camera.',
    },
    {
      question: 'Do I need to upload a signature for UGC NET?',
      answer:
        'Yes. NTA requires a signature image (140×60 px, under 30 KB). Use {{goal:signature-resize-30kb}} to prepare it.',
    },
    {
      question: 'Can I use this photo for CSIR UGC NET as well?',
      answer:
        'Yes. CSIR UGC NET and JRF applications use the same photo specification as UGC NET.',
    },
  ],
  relatedGoals: [
    'upsc-photo-resizer',
    'ssc-photo-resizer',
    'ibps-photo-resizer',
    'nda-photo-resizer',
    'signature-resize-30kb',
  ],
  complementaryGoals: [
    'signature-resize-30kb',
    'signature-resize-20kb',
  ],
  status: 'active',
  priority: 'medium',
  updatedAt: '2026-06-23',
} satisfies GoalDefinition
