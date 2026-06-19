import type { GoalDefinition } from '@/registry/goals/schema'

export const compress20kbGoal = {
  slug: 'compress-image-to-20kb',
  title: 'Compress Image to 20KB',
  shortTitle: 'Compress to 20KB',
  description:
    'Compress any image to under 20 KB without quality controls — upload, compress, download. Works in your browser.',
  longDescription:
    'Many government portals cap image uploads at 20 KB — small enough that most photos need compression before they can be uploaded. ' +
    'This tool uses a binary-search quality algorithm to find the highest JPEG quality that produces a file under 20 KB. ' +
    'The result is the smallest possible file at the best possible quality. Everything runs in your browser.',
  category: 'compress',
  tags: ['compress image', 'reduce image size', '20kb', 'file size', 'jpeg compression'],
  tool: 'image-resizer',
  preset: 'compress-20kb',
  keywords: [
    'compress image to 20kb',
    'reduce image size to 20kb',
    'image compressor 20kb',
    'make photo 20kb',
    'compress jpg to 20kb',
  ],
  howItWorks: [
    {
      title: 'Upload your image',
      body: 'Drop your image or click to select it. JPEG, PNG, and WebP are all supported.',
    },
    {
      title: 'Compressed to under 20 KB in your browser',
      body: 'The tool finds the highest quality that fits under 20 KB using a binary search. Nothing is uploaded to any server.',
    },
    {
      title: 'Download your compressed image',
      body: 'Download your compressed file. It\'s ready to upload to any portal that caps uploads at 20 KB.',
    },
  ],
  faqs: [
    {
      question: 'Which portals require images under 20 KB?',
      answer:
        'Many Indian government portals including signature uploads for UPSC, GPSC, NDA, and bank exam applications require images under 20 KB.',
    },
    {
      question: 'Will my image look bad after compressing to 20 KB?',
      answer:
        'It depends on the original image size. The tool always picks the highest quality that fits within 20 KB, so the result is as good as it can be at that size.',
    },
    {
      question: 'Can I compress a PNG to 20 KB?',
      answer:
        'Yes. If the PNG cannot reach 20 KB at minimum quality while staying PNG, the tool converts it to JPEG automatically.',
    },
    {
      question: 'I need to compress my signature image to 20 KB with specific dimensions. What should I use?',
      answer:
        'Use our {{goal:signature-resize-20kb}} which applies both the correct dimensions (140×60 px) and the 20 KB limit in one step.',
    },
  ],
  relatedGoals: [
    'compress-image-to-50kb',
    'compress-image-to-100kb',
    'signature-resize-20kb',
    'aadhaar-photo-resizer',
  ],
  complementaryGoals: [
    'signature-resize-20kb',
    'compress-image-to-50kb',
  ],
  status: 'active',
  priority: 'high',
  updatedAt: '2026-06-01',
} satisfies GoalDefinition
