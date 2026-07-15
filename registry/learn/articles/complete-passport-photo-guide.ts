import type { LearnArticle } from '@/registry/learn/schema'

export const completePassportPhotoGuideArticle: LearnArticle = {
  slug:       'complete-passport-photo-guide',
  title:      'Complete passport photo guide for Indian applicants',
  shortTitle: 'Passport photo guide',

  seoTitle:          'Indian passport photo requirements 2025: size, format, rules',
  description:       'Everything about Indian passport photo requirements: correct dimensions, background, expression, file size, and what gets your application rejected. Updated for Passport Seva portal.',
  ogDescription:     'Indian passport application photo requirements: 600x600 pixels, white background, specific lighting. Full guide with common mistakes and how to get it right the first time.',
  twitterDescription: 'Indian passport photo requirements 2025: dimensions, background, format, file size. Full guide for Passport Seva portal.',
  keywords: [
    'passport photo requirements India',
    'indian passport photo size',
    'passport photo size pixels',
    'passport seva photo requirements',
    'passport photo 600x600',
    'passport photo background',
    'passport photo online India',
    'fresh passport photo requirements',
  ],

  category: 'government-portals',
  tags: ['passport', 'id-documents', 'photo requirements', 'passport seva', 'government portal'],

  introduction: [
    'Getting a passport photo rejected is one of the more frustrating experiences in the already long passport application process. The requirements are specific, the portal gives minimal feedback on why it rejected your photo, and going back to a photo studio means another trip.',
    'The Indian Passport Seva portal requires a very specific type of photo. Not just the right file size. The background must be white. The lighting must be even with no shadows. The face must take up 70 to 80% of the frame. Your expression must be neutral.',
    'This guide covers every requirement in detail so you can get it right the first time, whether you are taking a new photo at a studio, using a phone camera, or working with an existing photo.',
  ],

  sections: [
    {
      id:      'technical-requirements',
      heading: 'Technical photo requirements',
      content: [
        {
          type: 'list',
          items: [
            'Dimensions: 600x600 pixels (square format)',
            'File format: JPEG only',
            'File size: under 500 KB (Passport Seva is lenient here compared to other portals)',
            'Resolution: at least 300 DPI for print quality',
            'Colour mode: RGB (not greyscale, not CMYK)',
          ],
        },
        {
          type: 'paragraph',
          text: 'The 600x600 square format is non-negotiable. Many people submit rectangular portrait photos and get confused when the portal crops or rejects them. Your photo must already be square. When using a tool like Presetly, the passport preset handles this cropping and resizing automatically.',
        },
      ],
    },
    {
      id:      'photo-content-requirements',
      heading: 'What the photo itself must look like',
      content: [
        {
          type: 'subsection',
          id:      'background-requirements',
          heading: 'Background',
          content: [
            {
              type: 'paragraph',
              text: 'Plain white background is required. Not off-white, not cream, not light grey. White. No patterns, no gradients, no furniture or walls visible. Many studios now use a dedicated white backdrop for passport photos. If you are taking a DIY photo, a white wall or a large white sheet works.',
            },
          ],
        },
        {
          type: 'subsection',
          id:      'lighting-requirements',
          heading: 'Lighting',
          content: [
            {
              type: 'paragraph',
              text: 'Even, front-facing light is required. No shadows on the face. No shadow falling behind the head onto the background. This is the part most DIY passport photos fail. Natural light from a window facing you (not behind you) works well. Avoid harsh overhead light which creates shadows under the nose and chin.',
            },
          ],
        },
        {
          type: 'subsection',
          id:      'face-position',
          heading: 'Face position and expression',
          content: [
            {
              type: 'paragraph',
              text: 'Face must be centred, looking directly at the camera. Neutral expression, mouth closed. Eyes fully open, looking straight ahead. No sunglasses, no tinted lenses. Regular prescription glasses are allowed but reflections on lenses are not.',
            },
            {
              type: 'paragraph',
              text: 'The face (from top of head to chin) must occupy 70 to 80% of the photo height. In a 600x600 photo, that means the face fills roughly 420 to 480 pixels. If your face is smaller than this, the photo will likely be rejected.',
            },
          ],
        },
      ],
    },
    {
      id:      'common-rejection-reasons',
      heading: 'Most common reasons passport photos get rejected',
      content: [
        {
          type: 'list',
          items: [
            'Shadow on the face or background from poor lighting',
            'Background not pure white (walls often look off-white in photos)',
            'Face too small in the frame',
            'Photo not square (600x600 required, not 413x531 or any portrait ratio)',
            'Glasses with reflections or tinted lenses',
            'Photo older than 6 months',
            'Smiling or non-neutral expression',
            'Head tilted or turned',
            'File too large or wrong format',
          ],
        },
        {
          type: 'paragraph',
          text: 'Background issues and face size cause the most rejections. If you are having a studio take the photo, specifically ask for Passport Seva digital format: 600x600 pixels, white background, under 500 KB JPEG.',
        },
      ],
    },
    {
      id:      'digital-photo-tips',
      heading: 'Tips for taking a good passport photo yourself',
      content: [
        {
          type: 'paragraph',
          text: 'Honestly, a phone camera with decent lighting can produce a perfectly acceptable passport photo. You do not need a professional studio.',
        },
        {
          type: 'list',
          items: [
            'Stand or sit about 1 metre from the camera, facing a window (natural light, not harsh sun)',
            'Use a white wall or tape a large white paper/sheet as background',
            'Have someone else take the photo rather than using a front camera (rear cameras are better quality)',
            'Take 10 to 15 shots and pick the best one',
            'Check the photo before processing: face fills most of the frame, background is white, no shadows',
          ],
        },
        {
          type: 'paragraph',
          text: 'After taking the photo, use a passport photo tool to crop it to exactly 600x600 pixels and compress it under the file size limit. Presetly\'s passport photo maker handles both automatically.',
        },
      ],
    },
  ],

  faqs: [
    {
      question: 'Can I use a selfie for a passport photo?',
      answer:   'Technically, you can use a selfie as long as the photo meets all requirements. But front cameras have lower quality and selfie angle (looking slightly down at phone) often distorts face proportions. A rear camera photo taken by someone else is much better.',
    },
    {
      question: 'How recent does the passport photo need to be?',
      answer:   'Passport Seva requires the photo to be recent, taken within the last 6 months. For renewals, the photo should reflect your current appearance. If you have significantly changed your appearance (major hair change, gained or lost weight), use a new photo.',
    },
    {
      question: 'Can I wear jewellery in a passport photo?',
      answer:   'Simple jewellery like earrings is generally acceptable. Necklaces, large or statement jewellery, and anything that touches the face or casts shadows should be avoided. When in doubt, keep it minimal.',
    },
    {
      question: 'Can women wear headscarves or hijabs in passport photos?',
      answer:   'Yes. Religious and traditional head coverings are permitted. The face from forehead to chin must still be fully visible. Coverings that obscure the face or cast significant shadow are not accepted.',
    },
    {
      question: 'Is the passport photo size the same as UPSC or other exam photos?',
      answer:   'No. Passport uses 600x600 pixels (square). Most exam portals (UPSC, GPSC, SSC) use 413x531 pixels (portrait rectangle). These are different sizes and the same photo cannot be used for both without cropping.',
    },
  ],

  conclusion: 'A good passport photo takes 5 minutes to get right if you know what to look for. White background, even lighting, face filling most of the frame, neutral expression, square format. Take a few shots with a phone on a bright day, pick the best, run it through a passport photo tool to get the exact 600x600 dimensions and file size, and you are done.',

  relatedArticles: [
    'photo-requirements-for-online-applications',
    'common-image-upload-problems',
    'image-compression-explained',
  ],
  relatedTools: [
    'passport-photo-maker',
    'aadhaar-photo-resizer',
    'compress-image-to-100kb',
  ],

  readingTime: 7,
  publishedAt: '2026-06-01',
  updatedAt:   '2026-07-01',
  search: {
    primaryQuery: 'passport photo requirements india',
    relatedQueries: [
      'indian passport photo size',
      'passport photo specifications india',
      'how to take passport photo at home',
      'passport photo background requirements',
      'passport photo size mm india',
    ],
    intent: 'informational',
    topicCluster: 'id-documents',
  },
  status:   'published',
  priority: 'high',
}
