import type { GoalDefinition } from '@/registry/goals/schema'

export const signature30kbGoal = {
  slug: 'signature-resize-30kb',
  title: 'Signature Resize to 30KB',
  shortTitle: 'Signature 30KB',
  description:
    'Prepare your bank exam signature in one step. Resizes to 140x60 px and compresses under 30 KB, browser only. Free.',
  seoTitle: 'IBPS signature resize to 30 KB: 140x60 px | Presetly',
  ogDescription:
    'Prepare your IBPS, NTA, or UGC NET signature upload. Resizes to 140x60 pixels and keeps the file under 30 KB. Browser-only. Nothing sent to any server. Free.',
  twitterDescription: 'IBPS, NTA signature: 140x60 px, 30 KB. Browser-only. Free.',
  longDescription:
    'IBPS, NTA, and several bank recruitment portals require a scanned signature at 140x60 pixels and under 30 KB. ' +
    'This is a common requirement across bank PO, clerk, and specialist officer exams. ' +
    'Upload your signature image and this tool applies the correct dimensions and compression automatically. ' +
    'No settings. No server. Just the file you need.',
  category: 'signature',
  subcategory: 'bank-exam',
  tags: ['signature', 'resize signature', '30kb', 'ibps', 'bank exam', 'nta', 'compress signature'],
  tool: 'image-resizer',
  preset: 'signature-30kb',
  keywords: [
    'signature resize 30kb',
    'ibps signature size',
    'nta signature 30kb',
    'compress signature to 30kb',
    '140x60 signature 30kb',
    'bank exam signature requirements',
    'signature file size 30kb',
  ],
  howItWorks: [
    {
      title: 'Upload your signature image',
      body: 'Tap to browse or drag your image file here. Accepts JPEG, PNG, and WebP. Use the freshly scanned image for the sharpest output.',
    },
    {
      title: 'Resized to 140x60 and compressed under 30 KB',
      body: 'The tool scales your signature to 140x60 pixels and compresses the file to stay under 30 KB. Runs fully in your browser. Your image never gets sent to any server.',
    },
    {
      title: 'Download and upload to the exam portal',
      body: 'Save the JPEG and upload it to the IBPS, SBI, or NTA exam portal. Works for signature fields on any bank or exam form that asks for 30 KB or below.',
    },
  ],
  faqs: [
    {
      question: 'What signature size does IBPS require?',
      answer:
        'IBPS requires a signature image of 140x60 pixels, JPEG format, under 30 KB. This applies to IBPS PO, IBPS Clerk, IBPS SO, and IBPS RRB applications.',
    },
    {
      question: 'Can I use this for NTA exams like UGC NET?',
      answer:
        'Yes. NTA requires a signature at 140x60 pixels under 30 KB for UGC NET, CSIR NET, and CMAT. This output is accepted across all NTA portals.',
    },
    {
      question: 'Does the tool handle PNG signatures?',
      answer:
        'Yes. Upload a PNG if that is what you have. The tool converts it to JPEG and brings the file under 30 KB. Transparent backgrounds are filled white automatically.',
    },
    {
      question: 'What background is required for a bank exam signature?',
      answer:
        'Plain white paper. Your signature should be in dark blue or black ink, with no ruled lines or printed borders visible in the image.',
    },
    {
      question: 'Do I also need to resize my photo for IBPS?',
      answer:
        'Yes. Upload your photo through {{goal:ibps-photo-resizer}} alongside this. Both the photo and signature are required before the IBPS form can be submitted.',
    },
  ],
  relatedGoals: [
    'signature-resize-20kb',
    'signature-resize-10kb',
    'signature-resize-50kb',
    'ibps-photo-resizer',
    'ugc-net-photo-resizer',
  ],
  complementaryGoals: [
    'ibps-photo-resizer',
    'ugc-net-photo-resizer',
  ],
  status: 'active',
  priority: 'high',
  updatedAt: '2026-06-24',
} satisfies GoalDefinition
