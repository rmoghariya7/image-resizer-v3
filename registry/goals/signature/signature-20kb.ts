import type { GoalDefinition } from '@/registry/goals/schema'

export const signature20kbGoal = {
  slug: 'signature-resize-20kb',
  title: 'Signature Resize to 20KB',
  shortTitle: 'Signature 20KB',
  description:
    'Resize your digital signature image to 140x60 px and compress it under 20 KB. Ready for UPSC, GPSC, NDA, and bank exam applications.',
  seoTitle: 'UPSC signature resize to 20 KB: 140x60 px | Presetly',
  ogDescription:
    'Prepare your UPSC, GPSC, or NDA signature upload. Resizes to 140x60 pixels and compresses under 20 KB. Done in your browser. No upload. Free.',
  twitterDescription: 'UPSC, GPSC signature: 140x60 px, 20 KB. Browser-only. Free.',
  longDescription:
    'Most Indian competitive exam portals (UPSC, GPSC, NDA, SSC, IBPS) require a scanned signature in JPEG format, ' +
    '140×60 pixels, under 20 KB. This tool applies those exact dimensions and compresses the output to meet the file-size requirement. ' +
    'Upload your scanned signature, and download a portal-ready file. Everything runs in your browser.',
  category: 'signature',
  tags: ['signature', 'signature resize', '20kb', 'upsc signature', 'exam form', 'digital signature'],
  tool: 'image-resizer',
  preset: 'signature-20kb',
  keywords: [
    'signature resize 20kb',
    'upsc signature size',
    'signature 140x60 pixels',
    'compress signature to 20kb',
    'digital signature resize',
    'gpsc signature size',
    'nda signature photo size',
  ],
  howItWorks: [
    {
      title: 'Upload your scanned signature',
      body: 'Select your scanned or digital signature image. JPEG, PNG, and WebP are all supported.',
    },
    {
      title: 'Resized to 140×60 px and compressed under 20 KB',
      body: 'Your signature is resized to 140x60 pixels and compressed to meet the 20 KB limit, entirely in your browser.',
    },
    {
      title: 'Download and upload to your exam portal',
      body: 'Download the JPEG and upload it to your UPSC, GPSC, NDA, or bank exam registration portal.',
    },
  ],
  faqs: [
    {
      question: 'What is the signature size required for UPSC application?',
      answer:
        'UPSC requires a scanned signature in JPEG format, 140×60 pixels, between 4 KB and 30 KB (we target under 20 KB to stay well within both limits).',
    },
    {
      question: 'What is the signature size for GPSC exam forms?',
      answer:
        'GPSC requires a digital signature of 140x60 pixels in JPEG format, under 20 KB. The same specification as UPSC. This tool works for both.',
    },
    {
      question: 'My signature background is coloured. Will the tool handle it?',
      answer:
        'Yes, but for best results scan your signature on white paper. A transparent PNG background is converted to white automatically.',
    },
    {
      question: 'I also need to upload a photo for my application. What should I use?',
      answer:
        'Use {{goal:upsc-photo-resizer}} for UPSC applications or {{goal:gpsc-photo-resizer}} for GPSC. Both apply the correct exam photo dimensions.',
    },
  ],
  relatedGoals: [
    'upsc-photo-resizer',
    'gpsc-photo-resizer',
    'nda-photo-resizer',
    'compress-image-to-20kb',
  ],
  complementaryGoals: [
    'upsc-photo-resizer',
    'gpsc-photo-resizer',
    'compress-image-to-20kb',
  ],
  status: 'active',
  priority: 'high',
  updatedAt: '2026-06-01',
} satisfies GoalDefinition
