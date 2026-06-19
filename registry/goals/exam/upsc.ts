import type { GoalDefinition } from '@/registry/goals/schema'

export const upscGoal = {
  slug: 'upsc-photo-resizer',
  title: 'UPSC Photo Resizer',
  shortTitle: 'UPSC Photo',
  description:
    'Resize your photo to UPSC specifications — 413×531 px, under 300 KB — instantly in your browser. No uploads, no sign-up.',
  longDescription:
    'The UPSC online application system rejects photos that do not match the exact dimensional and file-size requirements. ' +
    'This tool resizes your photo to 413×531 pixels (3.5×4.5 cm at 300 DPI) and compresses it under 300 KB, which are the ' +
    'official UPSC Civil Services Examination specifications. Everything runs in your browser — your photo never leaves your device.',
  category: 'exam',
  subcategory: 'civil-services',
  tags: ['upsc', 'civil services', 'ias', 'ips', 'government exam', 'photo resize'],
  tool: 'image-resizer',
  preset: 'upsc',
  keywords: [
    'upsc photo size',
    'upsc photo resize',
    'upsc application photo requirements',
    'upsc cse photo size pixels',
    'ias application photo',
    'upsc photo 413x531',
  ],
  howItWorks: [
    {
      title: 'Upload your photo',
      body: 'Drop your photo or click to select it. JPEG, PNG, and WebP are all supported. No account needed.',
    },
    {
      title: 'Resized to UPSC spec instantly',
      body: 'Your photo is resized to exactly 413×531 pixels and compressed under 300 KB in your browser. Nothing is sent to any server.',
    },
    {
      title: 'Download and submit',
      body: 'Download your JPEG and upload it directly to the UPSC online application portal.',
    },
  ],
  faqs: [
    {
      question: 'What is the required photo size for UPSC application?',
      answer:
        'UPSC requires a photo of 3.5×4.5 cm (413×531 pixels at 300 DPI), saved as JPEG, and under 300 KB in file size.',
    },
    {
      question: 'What should the background of my UPSC photo be?',
      answer:
        'The background must be plain white or off-white. Coloured, patterned, or outdoor backgrounds are not accepted.',
    },
    {
      question: 'Can I upload a PNG photo to UPSC?',
      answer:
        'No. UPSC only accepts JPEG format. This tool automatically converts your photo to JPEG when you download it.',
    },
    {
      question: 'Will my photo quality be affected by resizing?',
      answer:
        'No. The tool targets the highest quality that fits within 300 KB. For most photos, the difference is invisible to the eye.',
    },
    {
      question: 'Do I also need to resize my signature for the UPSC application?',
      answer:
        'Yes. UPSC requires a digital signature of 140×60 pixels, under 20 KB. Use our {{goal:signature-resize-20kb}} for that.',
    },
  ],
  relatedGoals: [
    'gpsc-photo-resizer',
    'nda-photo-resizer',
    'aadhaar-photo-resizer',
    'pan-card-photo-resizer',
    'compress-image-to-50kb',
    'signature-resize-20kb',
  ],
  complementaryGoals: [
    'signature-resize-20kb',
    'pan-card-photo-resizer',
    'aadhaar-photo-resizer',
  ],
  requirementsPage: 'upsc-cse-photo-requirements-2026',
  status: 'active',
  priority: 'high',
  updatedAt: '2026-06-01',
} satisfies GoalDefinition
