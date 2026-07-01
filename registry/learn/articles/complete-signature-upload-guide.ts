import type { LearnArticle } from '@/registry/learn/schema'

export const completeSignatureUploadGuideArticle: LearnArticle = {
  slug:       'complete-signature-upload-guide',
  title:      'Complete guide to signature upload for exam and ID portals',
  shortTitle: 'Signature upload guide',

  seoTitle:          'Signature upload guide: size, format, how to scan for exam portals',
  description:       'How to prepare your digital signature for UPSC, IBPS, Aadhaar, PAN card, and other Indian portals. Correct dimensions, file size, and scanning tips.',
  ogDescription:     'Most Indian exam portals require a 140x60 pixel signature image under 10 to 30 KB. This guide covers how to scan, crop, and compress your signature correctly for every major portal.',
  twitterDescription: 'Prepare your digital signature for UPSC, IBPS, Aadhaar, PAN. Exact size, scanning tips, common mistakes.',
  keywords: [
    'signature upload exam portal',
    'digital signature size exam',
    'upsc signature size',
    'ibps signature upload',
    'how to scan signature for exam',
    'signature 140x60 pixels',
    'signature under 20kb',
    'pan card signature size',
  ],

  category: 'government-portals',
  tags: ['signature', 'government portals', 'exam', 'upsc', 'ibps', 'pan card', 'aadhaar'],

  introduction: [
    'Indian government exam portals have two image uploads: one for the photo, one for the signature. Most people focus all their attention on the photo and then quickly realise the signature is also rejected. Different size, different KB limit, and a completely different set of problems.',
    'A signature upload is not just a scan of your signature. It has to be cropped tightly, resized to exactly the right dimensions, compressed to a specific file size, and saved as JPEG. Most scanners and phones produce files that are too large and have the wrong aspect ratio.',
    'This guide walks through everything from scanning to uploading.',
  ],

  sections: [
    {
      id:      'signature-requirements-by-portal',
      heading: 'Signature requirements for major Indian portals',
      content: [
        {
          type: 'list',
          items: [
            'UPSC: 140x60 pixels, under 20 KB, JPEG',
            'GPSC: 140x60 pixels, under 20 KB, JPEG',
            'SSC: 140x60 pixels, under 20 KB, JPEG',
            'IBPS and bank exams: 140x60 pixels, under 30 KB, JPEG',
            'NTA (UGC NET, JEE, NEET): 140x60 pixels, under 30 KB, JPEG',
            'PAN card (NSDL): 140x60 pixels, under 10 KB, JPEG',
            'Aadhaar: signature is not required separately for most updates',
            'Driving Licence: varies by state RTO portal',
          ],
        },
        {
          type: 'paragraph',
          text: 'The 140x60 pixel dimension is the standard across almost all national-level portals. The file size limit varies. PAN card at 10 KB is the strictest. At 140x60 pixels, 10 KB is achievable with good quality. But you need to start from a clean, high-contrast scan.',
        },
      ],
    },
    {
      id:      'how-to-scan-signature',
      heading: 'How to scan your signature properly',
      content: [
        {
          type: 'paragraph',
          text: 'Sign on plain white unlined paper. Not a notebook page, not a form, not tissue paper. Plain white A4. Use a black or dark blue pen with a consistent ink flow. Ballpoint pens work well. Avoid pencil.',
        },
        {
          type: 'subsection',
          id:      'using-a-scanner',
          heading: 'Using a flatbed scanner',
          content: [
            {
              type: 'paragraph',
              text: 'Set the scanner to 200 DPI minimum. Colour mode is fine. After scanning, you get a large image of the whole page. You then need to crop it to just the signature with a small white margin.',
            },
          ],
        },
        {
          type: 'subsection',
          id:      'using-phone-camera',
          heading: 'Using a phone camera instead',
          content: [
            {
              type: 'paragraph',
              text: 'Most people in India use their phone camera. This works fine. Place the paper flat on a dark surface. Take the photo in bright daylight near a window. Avoid flash because it creates glare and washes out the ink. Hold the phone directly overhead, not at an angle.',
            },
            {
              type: 'paragraph',
              text: 'After taking the photo, crop it tightly to just the signature. The signature should fill most of the cropped image with a small white margin on all sides. No dark surface or background should be visible.',
            },
          ],
        },
      ],
    },
    {
      id:      'resizing-and-compressing',
      heading: 'Resizing and compressing to portal requirements',
      content: [
        {
          type: 'paragraph',
          text: 'After scanning and cropping, your signature image is probably 500x200 pixels or larger. You need to resize it to 140x60 pixels exactly. This is important. Some portals specifically check dimensions, not just file size.',
        },
        {
          type: 'paragraph',
          text: 'Once resized, the file size will drop naturally because there are fewer pixels. A 140x60 JPEG at good quality is typically 8 to 25 KB depending on how complex the signature looks. If you need to get it under 10 KB (for PAN), you may need to compress it further.',
        },
        {
          type: 'paragraph',
          text: 'Presetly signature tools apply both the resize and compression in one step. Pick the target size (10 KB, 20 KB, or 30 KB depending on your portal), upload your cropped signature image, download the result.',
        },
      ],
    },
    {
      id:      'common-signature-problems',
      heading: 'Common problems and how to fix them',
      content: [
        {
          type: 'list',
          items: [
            'Background not white: rescanning on plain paper usually fixes this. Avoid scanning on notebooks or coloured paper.',
            'Signature too small in the frame: recrop tighter. The signature should fill about 60 to 70% of the image width.',
            'File too large even after resize: use a target-size compression tool. At 140x60 pixels, 10 KB is achievable.',
            'Image blurry after resize: this happens when the original scan was low resolution. Rescan at higher quality or get closer with the phone camera.',
            'Portal says wrong dimensions: double-check the output file dimensions after processing. Some tools resize but preserve metadata with original dimensions.',
          ],
        },
      ],
    },
  ],

  faqs: [
    {
      question: 'My signature looks different each time I sign. Which signature should I use?',
      answer:   'Use your standard signature, the one you use on official documents like cheques and ID cards. If you have multiple styles, pick the most consistent and recognisable one. Government portals use the signature for identity verification, so it should match your banking and official signatures.',
    },
    {
      question: 'Can I type my name and use it as a signature?',
      answer:   'No. Government portals require a handwritten signature image. A typed name in any font is not accepted. You must sign on paper and photograph or scan it.',
    },
    {
      question: 'Does the signature have to be the same as my passport signature?',
      answer:   'Ideally yes, especially for exam portals that may compare your application signature against your admit card. Use your most commonly used signature. Consistency matters more than style.',
    },
    {
      question: 'What if my signature has very thin lines and loses quality at 140x60 pixels?',
      answer:   'Start from the highest resolution scan you can get. 300 DPI or higher gives the algorithm more to work with during downscale. Also try signing with a slightly thicker pen. Fine ballpoint signatures can look very faint at small sizes.',
    },
    {
      question: 'Can I use the same signature image for multiple exams?',
      answer:   'Yes, as long as it meets each exam\'s specific requirements. Most national portals use the same standard (140x60 px, under 20 or 30 KB, JPEG). Prepare one good version and save it. It will work for UPSC, GPSC, SSC, IBPS, and most others.',
    },
  ],

  conclusion: 'Getting a clean signature upload takes about 10 minutes the first time. Good lighting, plain white paper, tight crop, resize to 140x60, compress to the target KB. Once you have done it once and saved the file, you can reuse the same signature image across multiple applications as long as the requirements match.',

  relatedArticles: [
    'photo-requirements-for-online-applications',
    'how-to-compress-images-to-exact-file-sizes',
    'common-image-upload-problems',
  ],
  relatedTools: [
    'signature-resize-20kb',
    'signature-resize-10kb',
    'signature-resize-30kb',
    'upsc-photo-resizer',
  ],

  readingTime: 6,
  publishedAt: '2026-06-01',
  updatedAt:   '2026-07-01',
  search: {
    primaryQuery: 'signature upload guide exam portals',
    relatedQueries: [
      'how to upload signature for exam',
      'signature image requirements upsc',
      'signature size for online application',
      'compress signature for portal',
      'signature upload tips india',
    ],
    intent: 'informational',
    topicCluster: 'signature-tools',
  },
  status:   'published',
  priority: 'high',
}
