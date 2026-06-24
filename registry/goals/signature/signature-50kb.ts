import type { GoalDefinition } from '@/registry/goals/schema'

export const signature50kbGoal = {
  slug: 'signature-resize-50kb',
  title: 'Signature Resize to 50KB',
  shortTitle: 'Signature 50KB',
  description:
    'Get your Aadhaar or PAN signature upload ready. Resizes to 140x60 px, compresses under 50 KB. Free, browser-based.',
  seoTitle: 'Aadhaar signature resize to 50 KB: 140x60 px | Presetly',
  ogDescription:
    'Prepare your Aadhaar update or PAN card signature. Resizes to 140x60 pixels, compresses within 50 KB. PNG transparent backgrounds converted to white. Free.',
  twitterDescription: 'Aadhaar, PAN signature: 140x60 px, 50 KB. Browser-only. Free.',
  longDescription:
    'UIDAI (Aadhaar update) and the PAN card portal both require a scanned signature at 140x60 pixels and under 50 KB. ' +
    'This is also the standard for state income tax portals and several scholarship forms. ' +
    'Upload your signature and the tool outputs a properly sized, compressed JPEG ready for any of these portals. ' +
    'Runs completely in your browser. Nothing is stored or transmitted.',
  category: 'signature',
  subcategory: 'aadhaar-pan',
  tags: ['signature', 'resize signature', '50kb', 'aadhaar', 'pan card', 'uidai', 'compress signature'],
  tool: 'image-resizer',
  preset: 'signature-50kb',
  keywords: [
    'signature resize 50kb',
    'aadhaar signature size',
    'pan card signature requirements',
    'compress signature to 50kb online',
    '140x60 signature 50kb',
    'uidai signature size pixels',
    'signature file 50kb',
  ],
  howItWorks: [
    {
      title: 'Upload your signature image',
      body: 'Select your signature file. JPEG, PNG, and WebP all work. Even a photo of your signature taken on a smartphone works fine.',
    },
    {
      title: 'Scaled to 140x60 and compressed within 50 KB',
      body: 'Your signature is scaled to 140x60 pixels and compressed within 50 KB. Transparent backgrounds are converted to white automatically. Runs fully in your browser.',
    },
    {
      title: 'Download and attach to your application',
      body: 'Download the JPEG and attach it to your Aadhaar update form or PAN card application. The file size and format will be accepted by both portals.',
    },
  ],
  faqs: [
    {
      question: 'What signature size does Aadhaar update require?',
      answer:
        'UIDAI requires a signature image of 140x60 pixels, JPEG format, under 50 KB for the Aadhaar update portal. The same specification applies to the PAN card application on the NSDL or UTIITSL portal.',
    },
    {
      question: 'Can I use a phone photo of my signature instead of a scan?',
      answer:
        'Yes. Place your signature on white paper in good natural light, photograph it flat, and upload the image. The tool crops and compresses it to the required size. A scanner gives a cleaner result, but a phone photo works.',
    },
    {
      question: 'Will a PNG signature work on the Aadhaar portal?',
      answer:
        'The Aadhaar portal expects JPEG. Upload your PNG here and the tool converts it to JPEG and compresses it under 50 KB before you download.',
    },
    {
      question: 'Does this work for state income tax portal signature uploads?',
      answer:
        'Most state income tax portals follow the same 140x60 pixel, 50 KB JPEG standard. A file prepared with this tool should be accepted.',
    },
    {
      question: 'Do I also need to resize my photo for Aadhaar update?',
      answer:
        'Yes. Aadhaar update requires a passport-size photo as well. Use {{goal:aadhaar-photo-resizer}} for the photo and prepare the signature here before starting the form.',
    },
  ],
  relatedGoals: [
    'signature-resize-20kb',
    'signature-resize-30kb',
    'signature-resize-10kb',
    'aadhaar-photo-resizer',
    'pan-card-photo-resizer',
  ],
  complementaryGoals: [
    'aadhaar-photo-resizer',
    'pan-card-photo-resizer',
  ],
  status: 'active',
  priority: 'high',
  updatedAt: '2026-06-24',
} satisfies GoalDefinition
