import type { GoalDefinition } from '@/registry/goals/schema'

export const compress50kbGoal = {
  slug: 'compress-image-50kb',
  title: 'Compress Image to 50KB',
  shortTitle: 'Compress to 50KB',
  description:
    'Compress any image under 50 KB for Aadhaar, PAN, Voter ID, and government portals. Free, browser-based.',
  seoTitle: 'Compress image to 50 KB: Aadhaar, PAN card | Presetly',
  ogDescription:
    'Aadhaar, PAN card, and Voter ID portals require photos under 50 KB. This tool finds the best quality that still fits. Browser-only. Free.',
  twitterDescription: 'Compress image to 50 KB for Aadhaar, PAN, Voter ID. Free.',
  longDescription:
    'Aadhaar update, PAN card applications, Voter ID forms, and several state scholarship portals cap image uploads at 50 KB. ' +
    'Getting there without degrading image quality is the challenge. ' +
    'This tool runs an automatic quality optimisation to find the highest compression that still fits under 50 KB. ' +
    'It keeps the original format where possible. Runs locally in your browser. No data leaves your device.',
  category: 'compress',
  subcategory: 'aadhaar-pan',
  tags: ['compress image', '50kb', 'image compressor', 'aadhaar', 'pan card', 'voter id', 'reduce file size'],
  tool: 'image-resizer',
  preset: 'compress-50kb',
  keywords: [
    'compress image to 50kb',
    'reduce image size to 50kb online',
    'compress photo under 50kb',
    'image compressor 50kb',
    'aadhaar photo 50kb',
    'pan card photo size kb',
    'compress jpg to 50kb free',
  ],
  howItWorks: [
    {
      title: 'Upload your image',
      body: 'Pick any image from your device. JPEG, PNG, and WebP all work. No size limit on the input file.',
    },
    {
      title: 'Quality optimised to fit under 50 KB',
      body: 'A quality optimisation algorithm finds the best compression level to stay under 50 KB. The original format is kept where possible. Nothing is uploaded to any server.',
    },
    {
      title: 'Download and attach to your form',
      body: 'Download the compressed file. Upload it to Aadhaar, the PAN card portal, Voter ID, or whichever government form has a 50 KB limit.',
    },
  ],
  faqs: [
    {
      question: 'Does Aadhaar update require photos under 50 KB?',
      answer:
        'Yes. UIDAI caps photo uploads at 50 KB for Aadhaar update requests. The photo must also be in JPEG format. This tool outputs a JPEG under 50 KB that the portal accepts.',
    },
    {
      question: 'Will the photo look clear after 50 KB compression?',
      answer:
        'Yes, for passport-size photos. At 413x531 pixels, a 50 KB JPEG is actually quite sharp. The quality drop becomes noticeable only on much larger images or if the starting photo was low quality.',
    },
    {
      question: 'Does compression change the format from PNG to JPEG?',
      answer:
        'For PNG inputs, the tool converts to JPEG to hit the 50 KB target. Most government portals that set a 50 KB limit only accept JPEG anyway. JPEG inputs stay as JPEG.',
    },
    {
      question: 'Can I use this for signature images too?',
      answer:
        'For signatures, use {{goal:signature-resize-50kb}} instead. It also resizes to the correct 140x60 pixel dimensions along with compressing under 50 KB.',
    },
    {
      question: 'Does this work for the PAN card photo upload?',
      answer:
        'Yes. The NSDL and UTIITSL PAN card portals require a photo under 50 KB. This tool produces a file the portal will accept. Check the photo dimensions separately for each portal.',
    },
  ],
  relatedGoals: [
    'compress-image-20kb',
    'compress-image-100kb',
    'signature-resize-50kb',
    'aadhaar-photo-resizer',
  ],
  complementaryGoals: [
    'aadhaar-photo-resizer',
    'signature-resize-50kb',
  ],
  status: 'active',
  priority: 'high',
  updatedAt: '2026-06-24',
} satisfies GoalDefinition
