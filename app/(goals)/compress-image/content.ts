import type { FAQ, HowItWorksStep } from '@/types/registry'

export const PAGE_TITLE = 'Compress Image'
export const SEO_TITLE = 'Compress Image Online Free — Exact File Size | Presetly'
export const DESCRIPTION =
  'Compress any JPEG, PNG or WebP to an exact file size — 15 KB, 50 KB, 100 KB and more — right in your browser. ' +
  'No uploads, no sign-up, no quality guessing.'

export const HOW_IT_WORKS: HowItWorksStep[] = [
  {
    title: 'Pick a target size',
    body: 'Choose from the most common size limits — 15 KB, 20 KB, 50 KB, 100 KB, 200 KB and more.',
  },
  {
    title: 'Upload your image',
    body: 'Drop in a JPEG, PNG or WebP file up to 20 MB. It is opened locally — nothing is uploaded.',
  },
  {
    title: 'Automatic compression',
    body: 'A binary-search algorithm finds the highest quality that still fits your target size.',
  },
  {
    title: 'Download',
    body: 'Your compressed image downloads instantly, ready for any portal or upload form.',
  },
]

export const FAQS: FAQ[] = [
  {
    question: 'Which file size target should I choose?',
    answer:
      'Use 15–20 KB for strict government exam portals (UPSC, NDA), 50 KB for Aadhaar, PAN card and Voter ID, 100 KB for passport applications, and 200 KB or more for job portals and general web use.',
  },
  {
    question: 'Is my image uploaded to a server?',
    answer:
      'No. All processing happens locally in your browser using Web Workers and the Canvas API. Your image never leaves your device.',
  },
  {
    question: 'Does compressing to a small file size damage image quality?',
    answer:
      'Some quality reduction is unavoidable at very small sizes. The tool always finds the highest quality that still fits within the target, so the result is as sharp as it can be.',
  },
  {
    question: 'Which formats are supported?',
    answer:
      'JPEG, PNG and WebP up to 20 MB. For very small targets (under 40 KB), PNG is converted to JPEG since JPEG compresses photographs far more efficiently.',
  },
  {
    question: 'Is this tool free?',
    answer: 'Yes, completely free with no sign-up, no watermark, and no daily limit.',
  },
]
