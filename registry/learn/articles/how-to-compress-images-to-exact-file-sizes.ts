import type { LearnArticle } from '@/registry/learn/schema'

export const howToCompressImagesToExactFileSizesArticle: LearnArticle = {
  slug:       'how-to-compress-images-to-exact-file-sizes',
  title:      'How to compress images to exact file sizes',
  shortTitle: 'Compress to exact file sizes',

  seoTitle:          'How to compress images to exact file sizes (15 KB, 50 KB, 100 KB)',
  description:       'Indian government portals set hard file size limits. Here is how to compress any image to exactly 15 KB, 20 KB, 50 KB, or 100 KB without trial and error.',
  ogDescription:     'Most portals reject images over a specific KB limit. This guide shows you how to compress images to exact file size targets for UPSC, Aadhaar, PAN, and other Indian portals.',
  twitterDescription: 'Compress images to exactly 15 KB, 50 KB, or 100 KB for Indian govt portals. No trial and error.',
  keywords: [
    'compress image to exact file size',
    'compress image to 50kb',
    'compress image to 100kb',
    'compress image to 20kb',
    'reduce image size to kb',
    'image size limit government portal',
    'compress photo for upsc',
    'compress image without losing quality',
  ],

  category: 'compression',
  tags: ['compression', 'file size', 'kb', 'government portals', 'upsc', 'aadhaar', 'pan card'],

  introduction: [
    'Every Indian government portal has a file size limit for photo uploads. UPSC says under 300 KB. Aadhaar says under 50 KB. Some older state portals say under 20 KB. These are hard limits. Submit a file even 1 KB over and the form rejects it.',
    'The problem is that most image tools do not work this way. They give you a quality slider from 1 to 100. You pick 80, check the output, it is 120 KB, try again at 65, it is 85 KB, try 70, it is 100 KB. That is 20 minutes of trial and error for a 2-minute task.',
    'The right approach is to use a tool that targets a specific file size directly. You tell it "I need this under 50 KB" and it figures out the quality setting automatically. This guide explains how that works and which portals require which limits.',
  ],

  sections: [
    {
      id:      'why-portals-have-size-limits',
      heading: 'Why portals set strict file size limits',
      content: [
        {
          type: 'paragraph',
          text: 'Government portals process millions of applications. Storage is finite. Bandwidth matters, especially for older server infrastructure. File size limits keep the system manageable and ensure applicants submit photos that are properly compressed.',
        },
        {
          type: 'paragraph',
          text: 'The limits are not arbitrary. They are calibrated to the dimension requirements. UPSC requires 413x531 pixels and allows up to 300 KB because that dimension at a reasonable JPEG quality gives a file well under 300 KB. Aadhaar uses 200x200 pixels and 50 KB. Both make sense once you know the sizes.',
        },
      ],
    },
    {
      id:      'common-portal-limits',
      heading: 'File size limits for major Indian portals',
      content: [
        {
          type: 'list',
          items: [
            'UPSC (Civil Services, NDA, CDS): Photo under 300 KB, Signature under 20 KB',
            'GPSC: Photo under 200 KB, Signature under 20 KB',
            'Aadhaar (UIDAI): Photo under 50 KB',
            'PAN card (NSDL): Photo under 50 KB, Signature under 20 KB',
            'Passport Seva: Photo under 500 KB (very lenient, but correct dimensions needed)',
            'SSC (Staff Selection Commission): Photo under 100 KB, Signature under 50 KB',
            'IBPS and Bank exams: Photo usually under 100 KB, Signature under 30 KB',
            'NDA: Photo under 300 KB',
            'Voter ID (NVSP): Photo under 100 KB',
          ],
        },
        {
          type: 'paragraph',
          text: "These can change. Always check the current year's notification for the specific exam or portal you are applying to. The numbers above are common but not guaranteed to be current for every cycle.",
        },
      ],
    },
    {
      id:      'how-target-size-compression-works',
      heading: 'How target-size compression works',
      content: [
        {
          type: 'paragraph',
          text: 'A target-size compressor works by running a binary search over JPEG quality settings. It tries quality 80, checks the output size. Too big? Try quality 65. Still too big? Try 55. Just right? That is the output. This loop usually converges in 5 to 8 steps and happens in under a second.',
        },
        {
          type: 'paragraph',
          text: 'The result is always the highest possible quality that still fits under the target. Instead of you guessing at quality values, the algorithm finds the exact setting automatically.',
        },
        {
          type: 'paragraph',
          text: 'Presetly tools all work this way. You pick the size target (or the portal-specific preset), upload your image, and download the output. No quality slider to guess at.',
        },
      ],
    },
    {
      id:      'what-size-to-target',
      heading: 'Choosing the right file size target',
      content: [
        {
          type: 'paragraph',
          text: "Use the portal's stated limit as your target. Do not try to go much lower than the limit because that means sacrificing quality unnecessarily. If the limit is 100 KB, target around 80 to 95 KB. If the limit is 50 KB, target 40 to 48 KB. The tool should get you as close to the limit as possible while staying under.",
        },
        {
          type: 'paragraph',
          text: 'One practical tip: if you are using a general compressor rather than a preset tool, target about 90% of the stated limit to give yourself a small safety margin. A "50 KB" portal may actually measure 51.2 KB as over limit due to how different systems round file sizes.',
        },
      ],
    },
    {
      id:      'dimensions-vs-file-size',
      heading: 'Remember: dimensions and file size are separate',
      content: [
        {
          type: 'paragraph',
          text: 'Compressing to a file size target only changes the byte count of the file. It does not change pixel dimensions. If the portal requires 413x531 pixels, you still need to resize to those dimensions separately.',
        },
        {
          type: 'paragraph',
          text: 'Most portal-specific tools handle both in one step. The preset knows the required dimensions and file size limit. Upload, download, done. If you are using a general compression tool, make sure you resize first, then compress.',
        },
      ],
    },
  ],

  faqs: [
    {
      question: 'Can I compress an image below 20 KB without it looking bad?',
      answer:   'Depends on the dimensions. A 413x531 pixel image at 20 KB will show noticeable quality loss. But a 140x60 pixel signature image at 20 KB looks completely fine because there is less data to begin with. For photos going below 20 KB, try to keep dimensions small too.',
    },
    {
      question: 'Why is my compressed image still getting rejected by the portal?',
      answer:   'Check three things: file size is under the limit, pixel dimensions match the requirement, and the format is JPEG (not PNG or WebP). Most portals require all three. A file that is the right size but wrong dimensions will still be rejected.',
    },
    {
      question: 'Does reducing file size affect the photo when it is printed?',
      answer:   'For government application forms, the photo is viewed on a screen or printed very small. Quality loss from compression to portal-acceptable sizes is not visible at those sizes. For large prints, you would want a higher-quality original.',
    },
    {
      question: 'How many times can I compress a photo?',
      answer:   'Each JPEG compression removes some data permanently. Compress a JPEG again and it loses a bit more. For best results, always start from the original uncompressed photo or the highest-quality version you have. Never compress an already-compressed JPEG multiple times.',
    },
    {
      question: 'What if my photo is already smaller than the required limit?',
      answer:   'No need to compress it further. If your photo is 150 KB and the limit is 300 KB, upload directly. Compressing an already-small image can only reduce quality. Only compress when you need to.',
    },
  ],

  conclusion: 'Compressing to exact file sizes is not about picking the right quality number. It is about using the right tool. Use a portal-specific preset when available. Use a target-size compressor when you know the KB limit. Always resize to the required dimensions before or alongside compression. And always start from the best-quality source file you have.',

  relatedArticles: [
    'image-compression-explained',
    'image-dimensions-vs-file-size',
    'common-image-upload-problems',
    'photo-requirements-for-online-applications',
  ],
  relatedTools: [
    'compress-image-under-20kb',
    'compress-image-under-50kb',
    'compress-image-under-100kb',
    'upsc-photo-resizer',
    'aadhaar-photo-resizer',
  ],

  readingTime: 6,
  publishedAt: '2026-06-01',
  updatedAt:   '2026-07-01',
  search: {
    primaryQuery: 'how to compress image to exact file size',
    relatedQueries: [
      'compress image to specific size',
      'reduce image to exact kb',
      'image size compressor exact',
      'how to make image exactly 50kb',
      'compress photo to specific size',
    ],
    intent: 'informational',
    topicCluster: 'image-compression',
  },
  status:   'published',
  priority: 'high',
}
