import type { GoalDefinition } from '@/registry/goals/schema'

export const compress20kbGoal = {
  slug: 'compress-image-20kb',
  title: 'Compress Image to 20KB',
  shortTitle: 'Compress to 20KB',
  description:
    'Compress any image under 20 KB while keeping it clear. Ideal for signature portals and strict state government forms.',
  seoTitle: 'Compress image to 20 KB: strict govt portals | Presetly',
  ogDescription:
    'State government portals and older central systems cap uploads at 20 KB. This tool compresses any image to fit under 20 KB. Runs in your browser. Free.',
  twitterDescription: 'Compress image to 20 KB for strict govt portals. Browser-only. Free.',
  longDescription:
    'Some state government portals and older central government systems cap image uploads at just 20 KB. ' +
    'Standard compressors usually stop at 50 KB or 100 KB and leave you stuck. ' +
    'This tool is built for strict limits. It finds the highest quality level that still fits under 20 KB ' +
    'and outputs a clean JPEG. No manual trial and error. Runs in your browser with no server upload.',
  category: 'compress',
  subcategory: 'strict-size',
  tags: ['compress image', '20kb', 'image compressor', 'signature compress', 'government portal', 'reduce file size'],
  tool: 'image-resizer',
  preset: 'compress-20kb',
  keywords: [
    'compress image to 20kb',
    'reduce image size to 20kb online',
    'image compressor 20kb',
    'compress photo under 20kb',
    'resize image to 20kb',
    'compress jpg to 20kb',
    'signature image 20kb',
  ],
  howItWorks: [
    {
      title: 'Upload your image',
      body: 'Select your image file. JPEG, PNG, and WebP are supported. For signature images with transparent backgrounds, PNG works well.',
    },
    {
      title: 'Automatically compressed under 20 KB',
      body: 'The tool tries different quality levels automatically to find the highest JPEG quality that still fits under 20 KB. Nothing leaves your device.',
    },
    {
      title: 'Download and upload to your portal',
      body: 'Save the compressed file and upload it to whichever portal capped the upload at 20 KB. Signature portals, state government forms, older central portals.',
    },
  ],
  faqs: [
    {
      question: 'Which portals require images under 20 KB?',
      answer:
        'Older state government portals, some scholarship forms, and certain central recruitment sites cap signature uploads at 20 KB. If you get a file size error on upload, this is the right tool.',
    },
    {
      question: 'Will compressing to 20 KB make my image blurry?',
      answer:
        'For small images like signatures (140x60 pixels), the result is clear as long as the original has dark ink on white paper. For photos, some quality loss is expected at this size but the image stays usable.',
    },
    {
      question: 'Can I compress a photo to 20 KB, not just a signature?',
      answer:
        'Yes. Any JPEG, PNG, or WebP can be compressed here. Photos at 20 KB will show some compression, but the output is accepted by all portals that set this limit.',
    },
    {
      question: 'What format does the output use?',
      answer:
        'The output is always JPEG. Most portals that set a 20 KB limit expect JPEG. If you upload a PNG, it is converted to JPEG before compression.',
    },
    {
      question: 'Should I use this for exam photo uploads too?',
      answer:
        'Exam photo portals usually allow 100 KB or 200 KB. Use the exam-specific tools for photos. This compressor is for the cases where 20 KB is the actual hard limit.',
    },
  ],
  relatedGoals: [
    'compress-image-50kb',
    'compress-image-100kb',
    'signature-resize-20kb',
    'signature-resize-10kb',
  ],
  complementaryGoals: [
    'signature-resize-20kb',
    'signature-resize-10kb',
  ],
  status: 'active',
  priority: 'medium',
  updatedAt: '2026-06-24',
} satisfies GoalDefinition
