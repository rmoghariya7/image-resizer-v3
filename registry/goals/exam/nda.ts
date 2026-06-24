import type { GoalDefinition } from '@/registry/goals/schema'

export const ndaGoal = {
  slug: 'nda-photo-resizer',
  title: 'NDA Photo Resizer',
  shortTitle: 'NDA Photo',
  description:
    'Prepare your NDA application photo online. Gets it to 413x531 px and under 300 KB in seconds, right in your browser.',
  seoTitle: 'NDA photo resizer: 413x531 px, under 300 KB | Presetly',
  ogDescription:
    'Get your UPSC NDA application photo ready. 413x531 pixels, JPEG, under 300 KB. Runs in your browser. No server upload.',
  twitterDescription: 'NDA application photo: 413x531 px, 300 KB. Browser-only. Free.',
  longDescription:
    'The UPSC NDA online application has specific photo requirements: 3.5x4.5 cm (413x531 pixels at 300 DPI), JPEG format, and under 300 KB. ' +
    'Getting this wrong means the portal rejects your upload before you can proceed. ' +
    'This tool applies the correct NDA preset in one step. Upload, process, download. No settings to adjust, no server upload.',
  category: 'exam',
  subcategory: 'defence',
  tags: ['nda', 'national defence academy', 'defence exam', 'upsc nda', 'photo resize'],
  tool: 'image-resizer',
  preset: 'nda',
  keywords: [
    'nda photo size',
    'nda exam photo requirements',
    'nda application photo size pixels',
    'upsc nda photo resize',
    'nda photo 413x531',
  ],
  howItWorks: [
    {
      title: 'Upload your photo',
      body: 'Select a recent, clear photo. You can upload JPEG, PNG, or WebP. Nothing to install, no sign-up required.',
    },
    {
      title: 'NDA dimensions applied, all inside your browser',
      body: 'Your photo is resized to 413x531 pixels and compressed under 300 KB. The process runs locally in your browser. Your photo stays on your device the whole time.',
    },
    {
      title: 'Download and upload to the NDA portal',
      body: 'Save the JPEG file. Log in to the UPSC NDA portal, open your application form, and upload this file in the photograph section.',
    },
  ],
  faqs: [
    {
      question: 'What is the photo size requirement for the NDA exam application?',
      answer:
        'The NDA application requires a photo of 3.5x4.5 cm (413x531 pixels at 300 DPI), in JPEG format and under 300 KB. Both conditions must be met or the portal will reject the upload.',
    },
    {
      question: 'What background is acceptable for the NDA application photo?',
      answer: 'A plain white background is the safest option. Light off-white also works. Do not use coloured walls, studio backdrops, or outdoor settings. The face should be fully visible with no shadows.',
    },
    {
      question: 'Is the NDA photo size the same as UPSC Civil Services?',
      answer:
        'Yes, both use 3.5x4.5 cm, JPEG, under 300 KB. If you have already processed your photo for UPSC CSE, the same file can be used for the NDA application.',
    },
    {
      question: 'Do I need to resize my signature for the NDA application?',
      answer:
        'Yes. The NDA form requires a separate digital signature upload at 140x60 pixels, under 20 KB. Use {{goal:signature-resize-20kb}} to prepare it alongside the photo.',
    },
  ],
  relatedGoals: [
    'upsc-photo-resizer',
    'gpsc-photo-resizer',
    'signature-resize-20kb',
    'pan-card-photo-resizer',
  ],
  complementaryGoals: [
    'signature-resize-20kb',
    'upsc-photo-resizer',
  ],
  status: 'active',
  priority: 'medium',
  updatedAt: '2026-06-24',
} satisfies GoalDefinition
