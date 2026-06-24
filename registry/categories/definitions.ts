import type { CategoryDefinition } from './schema'

export const categoryDefinitions: readonly CategoryDefinition[] = Object.freeze([
  {
    slug: 'exam',
    name: 'Exam Photos',
    description: 'Photo resizer tools for Indian competitive exam applications',
    metaDescription:
      'Resize your photo to the exact size required for UPSC, GPSC, NDA, SSC, Railway, IBPS, and other Indian competitive exam online applications.',
    ogTitle: 'Exam photo tools for UPSC, SSC, IBPS, and more | Presetly',
    ogDescription:
      'Resize your exam application photo to the exact portal specifications. UPSC, GPSC, SSC, IBPS, NDA, Railway, and UGC NET. Browser-only, free.',
    keywords: [
      'exam photo',
      'upsc photo size',
      'gpsc photo size',
      'ssc photo size',
      'bank exam photo size',
      'competitive exam photo',
    ],
    faqs: [
      {
        question: 'Are exam photo requirements the same for UPSC and GPSC?',
        answer:
          'The pixel dimensions are the same (413x531 px) but the maximum file size differs. UPSC allows up to 300 KB while GPSC limits to 200 KB. Use the goal-specific tool for each exam.',
      },
      {
        question: 'What background colour is required for competitive exam photos?',
        answer:
          'Most competitive exams require a plain white or off-white background. Patterned, coloured, or dark backgrounds are rejected.',
      },
      {
        question: 'Can I use the same photo for multiple exams?',
        answer:
          'If the photo meets all dimensions (413x531 px, JPEG), you can use it for multiple exams. Always re-process it through the correct goal tool to ensure the file size limit is met for each exam.',
      },
    ],
    subcategories: [
      {
        slug: 'civil-services',
        name: 'Civil Services',
        description: 'Photo tools for civil services exams: UPSC, GPSC, and state PSC applications',
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
      {
        slug: 'banking-ssc',
        name: 'Banking & SSC',
        description: 'Photo tools for SSC, IBPS, SBI, and other banking and staff selection exams',
        parentCategory: 'exam',
        goalSlugs: ['ssc-photo-resizer', 'ibps-photo-resizer', 'bank-exam-photo-resizer'],
      },
      {
        slug: 'railway-education',
        name: 'Railway & Education',
        description: 'Photo tools for Indian Railways recruitment and NTA education exams',
        parentCategory: 'exam',
        goalSlugs: ['railway-photo-resizer', 'ugc-net-photo-resizer'],
      },
    ],
    priority: 0.9,
    updatedAt: '2026-06-23',
  },
  {
    slug: 'id-documents',
    name: 'ID Documents',
    description: 'Photo resizer tools for Aadhaar, PAN card, Passport, Voter ID, and other ID document applications',
    metaDescription:
      'Resize your photo for Aadhaar (UIDAI), PAN card (NSDL), Indian Passport, Voter ID (NVSP), Driving Licence, and Visa applications instantly in your browser.',
    ogTitle: 'Photo tools for Aadhaar, PAN, Passport, Voter ID | Presetly',
    ogDescription:
      'Resize your photo for Aadhaar update, PAN card, Passport Seva, Voter ID, and Driving Licence. Exact portal dimensions. Browser-only, free.',
    keywords: [
      'aadhaar photo size',
      'pan card photo size',
      'passport photo size',
      'voter id photo size',
      'driving licence photo size',
      'id document photo',
    ],
    faqs: [
      {
        question: 'Is the photo size the same for Aadhaar, PAN, and Voter ID?',
        answer:
          'No. Each document has different requirements. Aadhaar requires 200x200 px, PAN card requires 200x230 px, Voter ID requires 413x531 px, and Passport requires 600x600 px.',
      },
      {
        question: 'Do I need to resize my signature separately for ID documents?',
        answer:
          'For PAN card and some state IDs, yes. A separate signature upload (typically 140x60 px, under 10 to 20 KB) is required alongside the photo.',
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
      {
        slug: 'employment-travel',
        name: 'Employment & Travel',
        description: 'Photo tools for Driving Licence, Visa, job portals, and resume applications',
        parentCategory: 'id-documents',
        goalSlugs: [
          'driving-licence-photo-resizer',
          'visa-photo-maker',
          'job-application-photo-resizer',
          'resume-photo-resizer',
        ],
      },
    ],
    priority: 0.9,
    updatedAt: '2026-06-23',
  },
  {
    slug: 'compress',
    name: 'Compress Image',
    description: 'Compress any image to a specific file size, from 15 KB to 1 MB, instantly in your browser',
    metaDescription:
      'Compress any image to an exact file size target: 15 KB, 20 KB, 50 KB, 100 KB, and more. Free, browser-based, no uploads, no sign-up.',
    ogTitle: 'Compress any image to exact file size | Presetly',
    ogDescription:
      'Compress images to 15 KB, 20 KB, 50 KB, 100 KB, and more. Portal-specific use cases covered. Auto quality optimisation. Browser-only, free.',
    keywords: [
      'compress image',
      'reduce image size',
      'image compressor',
      'compress jpg',
      'compress png',
      'reduce file size',
      'compress image online free',
    ],
    faqs: [
      {
        question: 'Which file size target should I choose?',
        answer:
          'Use 15 to 20 KB for strict government exam portals (UPSC, NDA), 50 KB for Aadhaar / PAN / Voter ID, 100 KB for passport applications, and 200 KB or more for job portals and social media profile photos.',
      },
      {
        question: 'Does compressing to a small file size damage image quality?',
        answer:
          'Some quality reduction is unavoidable at very small sizes. The tool always finds the highest quality that still fits within the target, so the result is as sharp as it can be.',
      },
      {
        question: 'Can I compress a PNG without converting it to JPEG?',
        answer:
          'For targets of 75 KB and above, PNG format is preserved. For smaller targets, conversion to JPEG may be needed since JPEG compression is far more efficient for photographs.',
      },
    ],
    subcategories: [
      {
        slug: 'file-size-targets',
        name: 'By File Size Target',
        description: 'Compress images to any common file size limit, from 15 KB to 1 MB',
        parentCategory: 'compress',
        goalSlugs: [
          'compress-image-to-15kb',
          'compress-image-to-20kb',
          'compress-image-to-25kb',
          'compress-image-to-50kb',
          'compress-image-to-100kb',
          'compress-image-to-200kb',
        ],
      },
    ],
    priority: 0.8,
    updatedAt: '2026-06-23',
  },
  {
    slug: 'signature',
    name: 'Signature Tools',
    description: 'Resize and compress digital signature images for exam and ID document applications',
    metaDescription:
      'Resize your digital signature to 140x60 px and compress it under 10 to 50 KB for UPSC, GPSC, SSC, IBPS, and other exam and ID document online applications.',
    ogTitle: 'Signature resize tools: 140x60 px for exam portals | Presetly',
    ogDescription:
      'Resize your scanned signature to 140x60 pixels and compress to 10, 20, 30, or 50 KB. UPSC, IBPS, Aadhaar, PAN. Browser-only, free.',
    keywords: [
      'signature resize',
      'digital signature size',
      'signature 20kb',
      'upsc signature',
      'ibps signature size',
      'exam signature size',
    ],
    faqs: [
      {
        question: 'What is the standard signature size for Indian exam portals?',
        answer:
          'Most competitive exam portals (UPSC, GPSC, NDA, SSC, IBPS) require a signature of 140x60 pixels in JPEG format. The file size limit varies: 10 KB for some portals, 20 KB for UPSC/GPSC, and 30 KB for IBPS/NTA.',
      },
      {
        question: 'How should I scan my signature for digital upload?',
        answer:
          'Sign on plain white paper, scan at 200 to 300 DPI, and crop tightly around the signature. This tool handles the resizing and compression after that.',
      },
      {
        question: 'Can I use this tool for my PAN card signature upload?',
        answer:
          'Yes. PAN card applications also require a 140x60 px digital signature under a small file size limit. This tool produces a compatible file.',
      },
    ],
    subcategories: [
      {
        slug: 'exam-signatures',
        name: 'Exam Signatures',
        description: 'Signature resizing tools for competitive exam and document applications',
        parentCategory: 'signature',
        goalSlugs: [
          'signature-resize-10kb',
          'signature-resize-20kb',
          'signature-resize-30kb',
          'signature-resize-50kb',
        ],
      },
    ],
    priority: 0.7,
    updatedAt: '2026-06-23',
  },
] satisfies CategoryDefinition[])
