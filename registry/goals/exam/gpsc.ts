import type { GoalDefinition } from '@/registry/goals/schema'

export const gpscGoal = {
  slug: 'gpsc-photo-resizer',
  title: 'GPSC Photo Resizer',
  shortTitle: 'GPSC Photo',
  description:
    'Resize your photo for GPSC applications. Gets it to 413x531 px and under 200 KB, instantly in your browser. No uploads.',
  seoTitle: 'GPSC photo resizer: 413x531 px, 200 KB | Presetly',
  ogDescription:
    'Resize your photo for GPSC applications. 413x531 pixels, under 200 KB. Browser-only, nothing uploaded. Free.',
  twitterDescription: 'GPSC exam photo: 413x531 px, 200 KB. Browser-only. Free.',
  longDescription:
    'The Gujarat Public Service Commission checks photo dimensions and file size at the point of upload. Photos that miss the 200 KB limit or the 3.5x4.5 cm size are rejected on the spot. ' +
    'This tool applies the GPSC preset in one click. Upload your photo, and the output is portal-ready. ' +
    'All processing runs inside your browser. Nothing is sent to any server.',
  category: 'exam',
  subcategory: 'civil-services',
  tags: ['gpsc', 'gujarat psc', 'state psc', 'government exam', 'photo resize'],
  tool: 'image-resizer',
  preset: 'gpsc',
  keywords: [
    'gpsc photo size',
    'gpsc photo resize',
    'gujarat psc photo requirements',
    'gpsc application photo size pixels',
    'gpsc photo 413x531',
  ],
  howItWorks: [
    {
      title: 'Select your photo',
      body: 'Click the upload button or drag your photo onto the page. JPEG and PNG work fine, and WebP too if that is what you have. No account needed.',
    },
    {
      title: 'GPSC dimensions applied automatically',
      body: 'The tool sets the exact 413x531 pixel size and keeps the file under 200 KB. Everything runs in your browser. Your photo never goes to any server.',
    },
    {
      title: 'Download and submit to the GPSC portal',
      body: 'Save the JPEG to your phone or computer. Open the GPSC portal, navigate to the photo upload section, and attach this file directly.',
    },
  ],
  faqs: [
    {
      question: 'What photo size does GPSC require?',
      answer:
        'GPSC requires a photo of 3.5x4.5 cm (413x531 pixels at 300 DPI), in JPEG format, and under 200 KB. Both the size and the file limit are checked by the portal at the time of upload.',
    },
    {
      question: 'Why does GPSC need a white background for the photo?',
      answer: 'The GPSC portal uses the photo on the admit card and hall ticket. A plain white background makes the face clearer for identification. Coloured, patterned, or outdoor backgrounds are not accepted.',
    },
    {
      question: 'Is GPSC photo size different from UPSC?',
      answer:
        'The pixel dimensions are identical at 3.5x4.5 cm. But GPSC has a stricter 200 KB file size limit compared to UPSC\'s 300 KB. If you use the UPSC preset for a GPSC application, the file might exceed 200 KB and get rejected.',
    },
    {
      question: 'Do I need to resize my signature for GPSC too?',
      answer:
        'Yes, the GPSC application form has a separate signature upload. Use {{goal:signature-resize-20kb}} to get your scanned signature to 140x60 pixels, under 20 KB. Both files need to be uploaded.',
    },
  ],
  relatedGoals: [
    'upsc-photo-resizer',
    'nda-photo-resizer',
    'pan-card-photo-resizer',
    'aadhaar-photo-resizer',
    'signature-resize-20kb',
  ],
  complementaryGoals: [
    'signature-resize-20kb',
    'pan-card-photo-resizer',
  ],
  status: 'active',
  priority: 'high',
  updatedAt: '2026-06-24',
} satisfies GoalDefinition
