import type { FAQ, HowItWorksStep } from '@/types/registry'

export const PAGE_TITLE = 'Convert Image'
export const SEO_TITLE = 'Convert Image Format Online Free — JPEG, PNG, WebP | Presetly'
export const DESCRIPTION =
  'Convert any image between JPEG, PNG and WebP in your browser — dimensions stay exactly the same, only the format changes. ' +
  'No uploads, no sign-up.'

export const HOW_IT_WORKS: HowItWorksStep[] = [
  {
    title: 'Upload your image',
    body: 'Drop in a JPEG, PNG or WebP file up to 20 MB. It is opened locally — nothing is uploaded.',
  },
  {
    title: 'Choose the output format',
    body: 'Pick JPEG for the smallest files, PNG to keep transparency, or WebP for the best of both.',
  },
  {
    title: 'Convert',
    body: 'The image is re-encoded at exactly its original pixel dimensions — nothing is cropped or resized.',
  },
  {
    title: 'Download',
    body: 'Your converted image downloads instantly in the new format.',
  },
]

export const FAQS: FAQ[] = [
  {
    question: 'Will converting change my image dimensions?',
    answer:
      'No. Convert Image keeps the exact original width and height — only the file format changes. Use Resize Image if you also want to change the dimensions.',
  },
  {
    question: 'Is my image uploaded to a server?',
    answer:
      'No. All processing happens locally in your browser using a Web Worker and the Canvas API. Your image never leaves your device.',
  },
  {
    question: 'Which format should I choose?',
    answer:
      'JPEG gives the smallest files for photographs but has no transparency. PNG preserves transparency and sharp edges (logos, screenshots) at a larger file size. WebP is a modern format that usually beats both at the same quality.',
  },
  {
    question: 'Will converting a PNG with transparency to JPEG lose the transparent background?',
    answer:
      'Yes — JPEG has no alpha channel, so transparent areas are filled with white before conversion. Keep the format as PNG or WebP if you need to preserve transparency.',
  },
  {
    question: 'Is this tool free?',
    answer: 'Yes, completely free with no sign-up, no watermark, and no daily limit.',
  },
]
