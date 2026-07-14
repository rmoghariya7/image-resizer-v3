import type { FAQ, HowItWorksStep } from '@/types/registry'

export const PAGE_TITLE = 'Resize Image'
export const SEO_TITLE = 'Resize Image Online Free — Custom Dimensions | Presetly'
export const DESCRIPTION =
  'Resize any JPEG, PNG or WebP to exact pixel dimensions — pick a common size or type your own width and height. ' +
  'Runs entirely in your browser, nothing is uploaded.'

export const HOW_IT_WORKS: HowItWorksStep[] = [
  {
    title: 'Upload your image',
    body: 'Drop in a JPEG, PNG or WebP file up to 20 MB. It is opened locally — nothing is uploaded.',
  },
  {
    title: 'Set dimensions',
    body: 'Pick a common size like HD or Square, or type your own width and height. Lock the aspect ratio to avoid stretching.',
  },
  {
    title: 'Choose format and quality',
    body: 'Keep the original format or convert to JPEG, PNG or WebP, and adjust the quality if needed.',
  },
  {
    title: 'Download',
    body: 'Your resized image downloads instantly at exactly the dimensions you set.',
  },
]

export const FAQS: FAQ[] = [
  {
    question: 'Can I resize an image to any custom width and height?',
    answer:
      'Yes. Type any width and height from 1 to 8000 pixels. Enable "lock aspect ratio" to keep the image from stretching when you only change one dimension.',
  },
  {
    question: 'Is my image uploaded to a server?',
    answer:
      'No. All processing happens locally in your browser using a Web Worker and the Canvas API. Your image never leaves your device.',
  },
  {
    question: 'Will resizing crop part of my image?',
    answer:
      'If the new aspect ratio differs from the original, the tool crops from the centre to fill the exact dimensions — the same "cover fit" behaviour used across Presetly\'s goal-specific resizers. Lock the aspect ratio to resize without any cropping.',
  },
  {
    question: 'What is the difference between this and the Image Cropper?',
    answer:
      'Resize Image scales your photo to exact pixel dimensions automatically. The Image Cropper lets you manually drag, pan and zoom to choose exactly which part of the photo to keep before exporting.',
  },
  {
    question: 'Is this tool free?',
    answer: 'Yes, completely free with no sign-up, no watermark, and no daily limit.',
  },
]
