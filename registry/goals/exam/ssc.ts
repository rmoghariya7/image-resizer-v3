import type { GoalDefinition } from '@/registry/goals/schema'

export const sscGoal = {
  slug: 'ssc-photo-resizer',
  title: 'SSC Photo Resizer',
  shortTitle: 'SSC Photo',
  description:
    'Resize your photo for SSC applications: 413x531 px, under 100 KB, JPEG. Processed instantly in your browser. Free, no uploads.',
  seoTitle: 'SSC CGL photo resizer: 413x531 px, under 100 KB | Presetly',
  ogDescription:
    'Prepare your SSC application photo. 413x531 pixels, JPEG, under 100 KB. Works for CGL, CHSL, MTS, CPO, and GD. Free, browser-only.',
  twitterDescription: 'SSC exam photo: 413x531 px, 100 KB. CGL, CHSL, MTS. Free.',
  longDescription:
    'The Staff Selection Commission (SSC) requires application photos to be 3.5×4.5 cm (413×531 pixels at 300 DPI), ' +
    'in JPEG format, and under 100 KB. This tool applies the correct SSC preset automatically. Upload your photo and ' +
    'download a portal-ready JPEG. No settings to configure, no server upload, no sign-up required.',
  category: 'exam',
  subcategory: 'banking-ssc',
  tags: ['ssc', 'ssc cgl', 'ssc chsl', 'staff selection commission', 'government exam', 'photo resize'],
  tool: 'image-resizer',
  preset: 'ssc',
  keywords: [
    'ssc photo size',
    'ssc cgl photo size',
    'ssc photo resize online',
    'ssc application photo requirements',
    'ssc photo 413x531',
    'staff selection commission photo size',
    'ssc chsl photo size pixels',
  ],
  howItWorks: [
    {
      title: 'Upload your photo',
      body: 'Pick any photo from your phone or computer. JPEG, PNG, and WebP all work. No account or sign-up needed.',
    },
    {
      title: 'Resized and compressed for SSC in seconds',
      body: 'Your photo is resized to 413x531 pixels and compressed so the file stays between 20 KB and 100 KB. All of this happens inside your browser. Nothing is uploaded anywhere.',
    },
    {
      title: 'Download and attach to your SSC form',
      body: 'Save the output JPEG. Open the SSC online registration page and upload it in the photo section. Works for CGL, CHSL, MTS, CPO, and GD.',
    },
  ],
  faqs: [
    {
      question: 'What photo size does SSC require?',
      answer:
        'SSC requires a photo of 3.5x4.5 cm (413x531 pixels at 300 DPI), JPEG format, between 20 KB and 100 KB. This tool targets just under 100 KB so it passes all SSC notifications, including older ones with different lower limits.',
    },
    {
      question: 'Is SSC CGL photo size the same as SSC CHSL?',
      answer:
        'Yes. SSC CGL, SSC CHSL, SSC MTS, SSC CPO, and SSC GD all use the same photo specification. The same output file works for all of them.',
    },
    {
      question: 'What background is required for SSC photos?',
      answer:
        'Plain white or off-white only. The SSC portal often flags photos with coloured, patterned, or studio-prop backgrounds. Natural light on a white wall works well.',
    },
    {
      question: 'Do I need to resize my signature separately for SSC?',
      answer:
        'Yes, the SSC form has a separate signature upload field. Use {{goal:signature-resize-20kb}} to prepare your digital signature to 140x60 pixels, under 20 KB.',
    },
    {
      question: 'Is SSC photo size different from UPSC?',
      answer:
        'Same pixel dimensions, 3.5x4.5 cm. But UPSC allows up to 300 KB while SSC caps at 100 KB. A photo compressed for SSC will work for UPSC too. The reverse is not always true.',
    },
  ],
  relatedGoals: [
    'upsc-photo-resizer',
    'railway-photo-resizer',
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
