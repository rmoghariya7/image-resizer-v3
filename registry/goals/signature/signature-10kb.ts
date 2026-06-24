import type { GoalDefinition } from '@/registry/goals/schema'

export const signature10kbGoal = {
  slug: 'signature-resize-10kb',
  title: 'Signature Resize to 10KB',
  shortTitle: 'Signature 10KB',
  description:
    'Resize your scanned signature to 140x60 px and compress it under 10 KB for strict government portal uploads. Free.',
  seoTitle: 'Signature resize to 10 KB: 140x60 px, strict portals | Presetly',
  ogDescription:
    'Compress your signature to 10 KB for strict state government portals. Resizes to 140x60 pixels. Dark ink on white paper gives the cleanest result. Free.',
  twitterDescription: 'Signature: 140x60 px, under 10 KB. State govt portals. Free.',
  longDescription:
    'Some state government portals and older central government systems cap the signature upload at just 10 KB. ' +
    'Most general compressors cannot hit this limit without destroying the image. ' +
    'This tool is built for exactly that constraint. It scales your signature to 140x60 pixels, ' +
    'then compresses the output to fit under 10 KB while keeping the ink legible. ' +
    'Runs in your browser. No server, no upload, no account.',
  category: 'signature',
  subcategory: 'strict-limit',
  tags: ['signature', 'resize signature', '10kb', 'government portal', 'state government', 'compress signature'],
  tool: 'image-resizer',
  preset: 'signature-10kb',
  keywords: [
    'signature resize 10kb',
    'compress signature to 10kb online',
    'signature size 10kb government',
    '140x60 signature 10kb',
    'state portal signature size',
    'signature file size 10kb',
  ],
  howItWorks: [
    {
      title: 'Upload your signature image',
      body: 'Open the file from your phone or computer. Works with JPEG, PNG, and WebP. If you scanned your signature, upload the scan directly.',
    },
    {
      title: 'Scaled to 140x60 and compressed under 10 KB',
      body: 'Your signature is scaled down to 140x60 pixels. Then the tool compresses it to fit under 10 KB. This is a strict limit, so use a clear, high-contrast signature for the best result.',
    },
    {
      title: 'Download and attach to your form',
      body: 'Save the JPEG. Go to your state government or central portal and attach this file in the signature upload field.',
    },
  ],
  faqs: [
    {
      question: 'Which portals require a signature under 10 KB?',
      answer:
        'Several state government portals and some older central government recruitment sites set a 10 KB cap for signature uploads. If your portal shows a 10 KB error, this is the right tool.',
    },
    {
      question: 'Will the signature still look clear at 10 KB?',
      answer:
        'Yes, if the original is well-lit with dark ink on white paper. A dark blue or black pen on clean white gives the best result after compression. Faint or grey signatures may lose legibility.',
    },
    {
      question: 'What format should I use for a 10 KB signature?',
      answer:
        'JPEG is best for hitting very low file sizes. This tool outputs JPEG automatically. PNG files at 140x60 will almost always exceed 10 KB, so do not try to submit a PNG to a 10 KB portal.',
    },
    {
      question: 'Do I also need to resize my photo for the same portal?',
      answer:
        'Most likely yes. If your portal requires a 10 KB signature, it usually has a separate photo size requirement too. Check whether you need {{goal:upsc-photo-resizer}} or any of the exam photo tools.',
    },
  ],
  relatedGoals: [
    'signature-resize-20kb',
    'signature-resize-30kb',
    'signature-resize-50kb',
    'compress-image-20kb',
  ],
  complementaryGoals: [
    'upsc-photo-resizer',
    'compress-image-20kb',
  ],
  status: 'active',
  priority: 'low',
  updatedAt: '2026-06-24',
} satisfies GoalDefinition
