import type { CategoryDefinition } from './schema'

export const categoryDefinitions: readonly CategoryDefinition[] = Object.freeze([
  {
    slug: 'exam',
    name: 'Exam Photos',
    description: 'Photo resizer tools for Indian competitive exam applications',
    metaDescription:
      'Resize your photo to the exact size required for UPSC, GPSC, NDA, SSC, and other Indian competitive exam online applications.',
    keywords: ['exam photo', 'upsc photo size', 'gpsc photo size', 'nda photo size', 'competitive exam photo'],
    faqs: [
      {
        question: 'Are exam photo requirements the same for UPSC and GPSC?',
        answer:
          'The pixel dimensions are the same (413×531 px) but the maximum file size differs — UPSC allows up to 300 KB while GPSC limits to 200 KB. Use the goal-specific tool for each exam.',
      },
      {
        question: 'What background colour is required for competitive exam photos?',
        answer:
          'Most competitive exams require a plain white or off-white background. Patterned, coloured, or dark backgrounds are rejected.',
      },
      {
        question: 'Can I use the same photo for UPSC and NDA applications?',
        answer:
          'If the photo meets both specifications (413×531 px, JPEG), you can use it for both — but always re-process it through the correct goal tool to ensure the file size limit is met.',
      },
    ],
    subcategories: [
      {
        slug: 'civil-services',
        name: 'Civil Services',
        description: 'Photo tools for civil services exams — UPSC, GPSC, and state PSC applications',
        parentCategory: 'exam',
        goalSlugs: ['upsc-photo-resizer', 'gpsc-photo-resizer'],
      },
      {
        slug: 'defence',
        name: 'Defence Exams',
        description: 'Photo tools for NDA, CDS, and other defence exam applications',
        parentCategory: 'exam',
        goalSlugs: ['nda-photo-resizer'],
      },
    ],
    priority: 0.9,
    updatedAt: '2026-06-01',
  },
  {
    slug: 'id-documents',
    name: 'ID Documents',
    description: 'Photo resizer tools for Aadhaar, PAN card, Passport, and Voter ID applications',
    metaDescription:
      'Resize your photo for Aadhaar (UIDAI), PAN card (NSDL), Indian Passport, and Voter ID (NVSP) applications instantly in your browser.',
    keywords: [
      'aadhaar photo size',
      'pan card photo size',
      'passport photo size',
      'voter id photo size',
      'id document photo',
    ],
    faqs: [
      {
        question: 'Is the photo size the same for Aadhaar, PAN, and Voter ID?',
        answer:
          'No — each document has different requirements. Aadhaar requires 200×200 px, PAN card requires 200×230 px, Voter ID requires 413×531 px, and Passport requires 600×600 px.',
      },
      {
        question: 'Do I need to resize my signature separately for ID documents?',
        answer:
          'For PAN card and some state IDs, yes — a separate signature upload (typically 140×60 px, under 10–20 KB) is required alongside the photo.',
      },
      {
        question: 'Will my photo be uploaded to any server when I use these tools?',
        answer:
          'No. All processing happens in your browser using the Canvas API. Your photo never leaves your device.',
      },
    ],
    subcategories: [
      {
        slug: 'central-ids',
        name: 'Central Government IDs',
        description: 'Photo tools for Aadhaar, PAN card, Passport, and Voter ID',
        parentCategory: 'id-documents',
        goalSlugs: [
          'aadhaar-photo-resizer',
          'pan-card-photo-resizer',
          'passport-photo-maker',
          'voter-id-photo-resizer',
        ],
      },
    ],
    priority: 0.9,
    updatedAt: '2026-06-01',
  },
  {
    slug: 'compress',
    name: 'Compress Image',
    description: 'Compress images to a specific file size target — 20 KB, 50 KB, or 100 KB',
    metaDescription:
      'Compress any image to 20 KB, 50 KB, or 100 KB instantly in your browser. No quality settings — just upload, compress, and download.',
    keywords: [
      'compress image',
      'reduce image size',
      'image compressor',
      'compress jpg',
      'compress png',
      'reduce file size',
    ],
    faqs: [
      {
        question: 'Which compression target should I choose?',
        answer:
          'Use 20 KB for signature uploads and strict government portals, 50 KB for Aadhaar / PAN / Voter ID, and 100 KB for passport applications and most scholarship portals.',
      },
      {
        question: 'Does compressing to a small file size damage image quality?',
        answer:
          'Some quality reduction is unavoidable at low file sizes. The algorithm always finds the highest quality that fits within the target — so the result is as good as it can be.',
      },
      {
        question: 'Can I compress a PNG without converting it to JPEG?',
        answer:
          'For the 50 KB and 100 KB targets, the format is preserved. For the 20 KB target, conversion to JPEG may be required if the PNG cannot reach the target at minimum quality.',
      },
    ],
    subcategories: [
      {
        slug: 'file-size-targets',
        name: 'By File Size Target',
        description: 'Compress images to common government-portal file size limits',
        parentCategory: 'compress',
        goalSlugs: [
          'compress-image-to-20kb',
          'compress-image-to-50kb',
          'compress-image-to-100kb',
        ],
      },
    ],
    priority: 0.8,
    updatedAt: '2026-06-01',
  },
  {
    slug: 'signature',
    name: 'Signature Tools',
    description: 'Resize and compress digital signature images for exam and ID document applications',
    metaDescription:
      'Resize your digital signature to 140×60 px and compress it under 20 KB for UPSC, GPSC, NDA, and bank exam online applications.',
    keywords: [
      'signature resize',
      'digital signature size',
      'signature 20kb',
      'upsc signature',
      'exam signature size',
    ],
    faqs: [
      {
        question: 'What is the standard signature size for Indian exam portals?',
        answer:
          'Most competitive exam portals (UPSC, GPSC, NDA, SSC, IBPS) require a signature of 140×60 pixels in JPEG format, under 20 KB.',
      },
      {
        question: 'How should I scan my signature for digital upload?',
        answer:
          'Sign on plain white paper, scan at 300 DPI, and crop tightly around the signature. This tool handles the resizing and compression after that.',
      },
      {
        question: 'Can I use this tool for my PAN card signature upload?',
        answer:
          'Yes. PAN card applications also require a 140×60 px digital signature under a small file size limit — this tool produces a compatible file.',
      },
    ],
    subcategories: [
      {
        slug: 'exam-signatures',
        name: 'Exam Signatures',
        description: 'Signature resizing tools for competitive exam applications',
        parentCategory: 'signature',
        goalSlugs: ['signature-resize-20kb'],
      },
    ],
    priority: 0.7,
    updatedAt: '2026-06-01',
  },
] satisfies CategoryDefinition[])
