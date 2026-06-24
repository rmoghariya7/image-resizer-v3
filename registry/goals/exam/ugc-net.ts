import type { GoalDefinition } from '@/registry/goals/schema'

export const ugcNetGoal = {
  slug: 'ugc-net-photo-resizer',
  title: 'UGC NET Photo Resizer',
  shortTitle: 'UGC NET Photo',
  description:
    'Resize your photo to UGC NET / NTA specifications: 413x531 px, under 100 KB, for JRF and Assistant Professor applications.',
  seoTitle: 'UGC NET photo size: 413x531 px, under 100 KB | Presetly',
  ogDescription:
    'Prepare your NTA UGC NET application photo. 413x531 pixels, JPEG, between 10 and 100 KB. Same file works for CSIR NET and JRF. Browser-only.',
  twitterDescription: 'UGC NET, CSIR NET photo: 413x531 px, 100 KB. Free.',
  longDescription:
    'The NTA UGC NET exam requires an application photo of 3.5×4.5 cm (413×531 pixels at 300 DPI), ' +
    'JPEG format, and under 100 KB. This tool applies the correct UGC NET preset. Upload your photo and ' +
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
      body: 'Click to browse or drag your photo onto the page. JPEG, PNG, and WebP formats all work. No sign-in needed.',
    },
    {
      title: 'Compressed and resized for NTA UGC NET',
      body: 'Your photo is resized to 413x531 pixels and compressed to fall between 10 KB and 100 KB. The whole process runs in your browser. Nothing is sent out.',
    },
    {
      title: 'Download and upload to the NTA portal',
      body: 'Save the JPEG. Open the NTA UGC NET application form and upload it in the photograph section. Same file works for CSIR NET and JRF applications too.',
    },
  ],
  faqs: [
    {
      question: 'What photo size does UGC NET require?',
      answer:
        'NTA UGC NET requires a passport-size photo: 3.5x4.5 cm (413x531 pixels at 300 DPI), JPEG format, between 10 KB and 100 KB. This tool targets under 100 KB to stay within limits across all NTA notifications.',
    },
    {
      question: 'Is UGC NET photo size the same as other NTA exams?',
      answer:
        'Most NTA exams use the same photo specification: 3.5x4.5 cm, JPEG, under 100 KB. This includes CUET, CSIR NET, and CMAT. One properly processed photo works for all of them.',
    },
    {
      question: 'What is the correct background for NTA exam photos?',
      answer:
        'A plain white background is required by NTA. Face straight at the camera, good lighting, no shadows on the background. The same photo often gets printed on the admit card, so clarity matters.',
    },
    {
      question: 'Do I need to upload a signature for UGC NET?',
      answer:
        'Yes. NTA UGC NET requires a separate signature image at 140x60 pixels, under 30 KB. Use {{goal:signature-resize-30kb}} to prepare it before starting the form.',
    },
    {
      question: 'Can I use this photo for CSIR UGC NET as well?',
      answer:
        'Yes. CSIR UGC NET, JRF, and Assistant Professor eligibility applications on the NTA portal all use the same photo specification. Download once and use across all applications.',
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
  updatedAt: '2026-06-24',
} satisfies GoalDefinition
