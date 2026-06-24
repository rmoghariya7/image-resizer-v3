import type { GoalDefinition } from '@/registry/goals/schema'

export const upscGoal = {
  slug: 'upsc-photo-resizer',
  title: 'UPSC Photo Resizer',
  shortTitle: 'UPSC Photo',
  description:
    'Get your UPSC exam photo right. Resizes to 413x531 pixels, keeps the file under 300 KB. Runs in your browser. No upload, no account.',
  longDescription:
    'UPSC online applications (Civil Services, NDA, CDS, CAPF) require a passport-size photo of 3.5x4.5 cm ' +
    '(413×531 pixels at 300 DPI), JPEG format, and under 300 KB. This tool applies the correct UPSC preset automatically. ' +
    'Upload your photo, download a portal-ready JPEG. No settings, no server, no sign-up.',
  seoTitle: 'UPSC photo resizer: 413x531 px, 300 KB | Presetly',
  ogDescription:
    'Upload your photo and get a UPSC-ready JPEG in seconds. 413x531 pixels, under 300 KB. Runs in your browser. Your photo never leaves your device.',
  twitterDescription: 'UPSC exam photo: 413x531 px, 300 KB. Done in your browser. Free.',
  category: 'exam',
  subcategory: 'civil-services',
  tags: ['upsc', 'civil services', 'ias', 'ips', 'government exam', 'photo resize'],
  tool: 'image-resizer',
  preset: 'upsc',
  keywords: [
    'upsc photo size',
    'upsc photo resize online',
    'upsc application photo size pixels',
    'upsc exam photo 413x531',
    'ias photo size',
    'civil services photo requirements',
    'upsc photo under 300kb',
  ],
  howItWorks: [
    {
      title: 'Upload your photo',
      body: 'Drop your photo or click to select it. JPEG, PNG, and WebP are all accepted. No account or sign-up needed.',
    },
    {
      title: 'UPSC dimensions applied in your browser',
      body: 'Your photo is resized to 413x531 pixels and compressed under 300 KB. Everything runs locally in your browser. Nothing is uploaded to any server.',
    },
    {
      title: 'Download and upload to the UPSC portal',
      body: 'Save the output JPEG. Open your UPSC online application, navigate to the photo upload section, and attach this file directly.',
    },
  ],
  faqs: [
    {
      question: 'What photo size does UPSC require?',
      answer:
        'UPSC requires a passport-size photo of 3.5x4.5 cm (413x531 pixels at 300 DPI), in JPEG format and under 300 KB. This applies to Civil Services, NDA, CDS, and CAPF applications.',
    },
    {
      question: 'What background is required for a UPSC exam photo?',
      answer:
        'A plain white or light-coloured background is required. The face must be clearly visible with a neutral expression. Sunglasses, caps, and heavy shadow are not allowed.',
    },
    {
      question: 'Is the UPSC photo size the same as GPSC?',
      answer:
        'The pixel dimensions are the same (413x531 px), but GPSC allows only up to 200 KB while UPSC allows 300 KB. Use {{goal:gpsc-photo-resizer}} for GPSC applications.',
    },
    {
      question: 'Do I also need to resize my signature for UPSC?',
      answer:
        'Yes. UPSC requires a separate signature image at 140x60 pixels, under 20 KB. Use {{goal:signature-resize-20kb}} to prepare it alongside the photo.',
    },
    {
      question: 'Can I use this photo for multiple UPSC exams?',
      answer:
        'Yes. A single properly processed photo works for all UPSC exams (CSE, NDA, CDS, CAPF) as long as the photo is recent (taken within the last 6 months).',
    },
  ],
  relatedGoals: [
    'gpsc-photo-resizer',
    'nda-photo-resizer',
    'ssc-photo-resizer',
    'signature-resize-20kb',
    'compress-image-20kb',
  ],
  complementaryGoals: [
    'signature-resize-20kb',
    'compress-image-20kb',
  ],
  status: 'active',
  priority: 'high',
  updatedAt: '2026-06-24',
} satisfies GoalDefinition
