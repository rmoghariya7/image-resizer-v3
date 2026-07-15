import type { FAQ, HowItWorksStep } from '@/types/registry'

// Page content for /background-remover. Standalone tools live outside the
// goal registry, so their copy is co-located with the route instead of a
// goal file (see app/(goals)/video-to-audio/content.ts for the same pattern).
//
// Target keyword variations (naturally woven through title, H1/H2s, FAQ and
// body copy below): free background remover, free ai background remover,
// ai background remover online, remove background from image free, remove
// background online, transparent background maker, background eraser,
// remove image background.

export const PAGE_TITLE = 'AI Background Remover'
export const SEO_TITLE =
  'Free AI Background Remover Online — Remove Image Background Instantly | Presetly'
export const DESCRIPTION =
  'Remove the background from any photo free with our AI background remover — no uploads, ' +
  'no sign-up, no watermark. Get a transparent PNG or a clean white/color background in seconds, ' +
  'right in your browser.'

export const HOW_IT_WORKS: HowItWorksStep[] = [
  {
    title: 'Upload your photo',
    body: 'Drop in a JPEG, PNG or WebP image. It opens locally in your browser — nothing is uploaded to a server.',
  },
  {
    title: 'AI removes the background automatically',
    body: 'An AI segmentation model runs inside your browser and erases the background the moment your photo loads — no brush, no manual selection.',
  },
  {
    title: 'Compare and choose a background',
    body: 'Drag the before/after slider to check the edges, then pick a transparent, white, or custom-color background.',
  },
  {
    title: 'Download',
    body: 'Save a transparent PNG, or a JPG if you chose a solid background — at full resolution, free.',
  },
]

export const FAQS: FAQ[] = [
  {
    question: 'Is this AI background remover really free?',
    answer:
      'Yes. Presetly is a free background remover with no sign-up, no watermark, and no limit on the ' +
      'number of photos — the free AI background remover runs the whole process on your own device, ' +
      'so there is no server cost to us per image.',
  },
  {
    question: 'How does an AI background remover online actually work?',
    answer:
      'An AI segmentation model — the same kind of technology used in professional photo editors — ' +
      'analyzes your photo pixel by pixel to tell the subject apart from the background, then builds a ' +
      'precise cutout mask. Presetly runs this model directly in your browser using WebAssembly, so the ' +
      'AI background remover works online without ever sending your photo anywhere.',
  },
  {
    question: 'Can I remove the background from an image for free and keep it transparent?',
    answer:
      'Yes — transparent is the default output. Upload any photo and Presetly acts as a transparent ' +
      'background maker, exporting a PNG with a see-through background you can drop onto any design, ' +
      'slide, or product listing.',
  },
  {
    question: 'Can I replace the background with white or a solid color instead?',
    answer:
      'Yes. After the background is removed, use the background picker to switch between Transparent, ' +
      'White, or a custom color — switching is instant since the AI mask is only computed once, and each ' +
      'option downloads as a ready-to-use JPG or PNG.',
  },
  {
    question: 'Is a background eraser the same as a background remover?',
    answer:
      'They describe the same result — erasing or removing everything behind your subject — but a manual ' +
      'background eraser tool usually needs you to brush over edges by hand. Presetly’s background ' +
      'remover does that automatically with AI, so most photos need zero manual touch-up.',
  },
  {
    question: 'Is my photo uploaded to a server when I remove the background online?',
    answer:
      'No. The AI model downloads once to your browser (a small one-time download, cached afterward), and ' +
      'every photo you process after that is analyzed entirely on your device. Your images never leave ' +
      'your browser, which is what makes this both a private and genuinely free background remover.',
  },
  {
    question: 'What image formats and sizes are supported?',
    answer:
      'You can upload JPEG, PNG, or WebP files up to 20 MB. The output is a transparent PNG (for the ' +
      'transparent option) or a high-quality JPG (for white or custom-color backgrounds), at the same ' +
      'resolution as your original photo.',
  },
  {
    question: 'Does this work on mobile phones?',
    answer:
      'Yes. The tool is built mobile-first and works in Chrome, Safari, Firefox and Edge on Android and ' +
      'iOS. On older phones with limited memory, prefer smaller photos for the fastest result.',
  },
]
