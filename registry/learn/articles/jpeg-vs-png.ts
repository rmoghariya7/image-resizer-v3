import type { LearnArticle } from '@/registry/learn/schema'

export const jpegVsPngArticle: LearnArticle = {
  slug:       'jpeg-vs-png',
  title:      'JPEG vs PNG: which format should you use',
  shortTitle: 'JPEG vs PNG',

  seoTitle:          'JPEG vs PNG: which image format to use and when',
  description:       'JPEG and PNG are both image formats but they work very differently. Here is when to use JPEG, when to use PNG, and which one Indian government portals actually accept.',
  ogDescription:     'JPEG uses lossy compression and is small. PNG is lossless and larger. This guide explains the real differences and tells you which to use for photos, government forms, and web uploads.',
  twitterDescription: 'JPEG vs PNG: real differences explained simply. Which one to use for govt portal photos, web images, and screenshots.',
  keywords: [
    'jpeg vs png',
    'jpeg or png for photos',
    'difference between jpeg and png',
    'when to use jpeg vs png',
    'jpeg vs png quality',
    'jpeg vs png file size',
    'best image format india government portal',
    'jpeg png webp comparison',
  ],

  category: 'image-basics',
  tags: ['jpeg', 'png', 'image formats', 'compression', 'file size'],

  introduction: [
    'JPEG and PNG are the two formats you will encounter almost everywhere. Phones save photos as JPEG by default. Screenshots are usually PNG. Government portals mostly ask for JPEG. Designers prefer PNG for logos.',
    'But most people do not actually know why one is better than the other for any given situation. They just use whatever their phone or tool gives them and hope for the best.',
    'Understanding the difference is practical, not theoretical. The wrong format for the wrong use case means a larger file than necessary, quality loss you did not want, or a portal rejection because the format is wrong.',
  ],

  sections: [
    {
      id:      'the-core-difference',
      heading: 'The core difference: lossy vs lossless',
      content: [
        {
          type: 'paragraph',
          text: 'JPEG uses lossy compression. Every time you save a JPEG, some image data is permanently discarded. The result is a small file. A good JPEG at 80% quality is usually 5 to 10 times smaller than the equivalent uncompressed image.',
        },
        {
          type: 'paragraph',
          text: 'PNG uses lossless compression. The file is compressed but no data is discarded. You can open and resave a PNG 100 times and the quality is exactly the same as the original. The trade-off: PNG files are larger, sometimes much larger for photographs.',
        },
      ],
    },
    {
      id:      'when-to-use-jpeg',
      heading: 'When JPEG is the right choice',
      content: [
        {
          type: 'paragraph',
          text: 'Use JPEG for photographs. Photos of people, landscapes, buildings, any real-world scene with continuous colour gradients. JPEG compression is specifically designed for this type of image and handles it extremely well. The quality loss at typical settings (75 to 85%) is basically invisible.',
        },
        {
          type: 'list',
          items: [
            'Passport photos, ID document photos, exam application photos',
            'Any photo upload for government portals (JPEG is the accepted format for nearly all)',
            'Product photos, portrait photos, website images',
            'Any situation where file size matters and the image is a photograph',
          ],
        },
      ],
    },
    {
      id:      'when-to-use-png',
      heading: 'When PNG is the right choice',
      content: [
        {
          type: 'paragraph',
          text: 'Use PNG for images with text, sharp edges, logos, or transparency. PNG lossless compression actually works well for these because such images have large areas of identical colour that compress efficiently. JPEG handles them poorly because sharp colour transitions create visible artefacts.',
        },
        {
          type: 'list',
          items: [
            'Screenshots (text in screenshots becomes blurry and unreadable in JPEG)',
            'Logos, icons, illustrations with flat colours',
            'Images that need a transparent background (PNG supports transparency, JPEG does not)',
            'Diagrams, charts, infographics with text labels',
            'Signature images where the fine lines need to be sharp',
          ],
        },
        {
          type: 'paragraph',
          text: 'Interestingly, even though PNG is lossless, a PNG of a simple logo or signature is often smaller than an equivalent JPEG because the lossless algorithm handles flat-colour images so efficiently.',
        },
      ],
    },
    {
      id:      'government-portal-requirements',
      heading: 'What Indian government portals require',
      content: [
        {
          type: 'paragraph',
          text: 'Almost every Indian government portal specifies JPEG only. UPSC, GPSC, Aadhaar, PAN, Passport Seva, SSC, IBPS, NDA. The reason is that JPEG is universal and its lossy compression makes files small enough to upload on slower connections.',
        },
        {
          type: 'paragraph',
          text: 'If you have a PNG photo that you want to upload to a portal, you need to convert it to JPEG first. Most image tools can do this. Presetly goal tools all output JPEG automatically regardless of your input format.',
        },
        {
          type: 'paragraph',
          text: 'One nuance: for signature uploads, some portals actually accept PNG. But JPEG is safe everywhere. When in doubt, use JPEG.',
        },
      ],
    },
    {
      id:      'file-size-comparison',
      heading: 'File size comparison: JPEG vs PNG for photos',
      content: [
        {
          type: 'paragraph',
          text: 'Here is a rough comparison for a typical passport photo at 600x600 pixels:',
        },
        {
          type: 'list',
          items: [
            'JPEG at 90% quality: approximately 80 to 120 KB',
            'JPEG at 75% quality: approximately 40 to 70 KB',
            'JPEG at 60% quality: approximately 25 to 45 KB',
            'PNG (lossless): approximately 400 to 700 KB',
          ],
        },
        {
          type: 'paragraph',
          text: 'For photos, PNG is simply impractical for portal uploads. A 500 KB PNG is fine as a design file. It is not fine for an Aadhaar portal that has a 50 KB limit.',
        },
      ],
    },
  ],

  faqs: [
    {
      question: 'Can I convert a PNG to JPEG without quality loss?',
      answer:   'Converting PNG to JPEG inherently involves JPEG compression, which is lossy. But if you use a quality setting of 85 to 90%, the loss is minimal and invisible in photos. The resulting JPEG will look nearly identical to the PNG but be much smaller.',
    },
    {
      question: 'Does converting JPEG to PNG improve quality?',
      answer:   'No. Converting a JPEG to PNG does not recover the quality lost during original JPEG compression. You get a larger file of the same quality. The only benefit is that the PNG version will not lose any more quality if you need to edit and save it again.',
    },
    {
      question: 'Is WebP better than both JPEG and PNG?',
      answer:   'For web use, yes. WebP offers smaller file sizes than JPEG at equivalent quality, and smaller than PNG for lossless. But Indian government portals do not accept WebP. For personal use or websites, WebP is excellent. For portal uploads, stick to JPEG.',
    },
    {
      question: 'My photo is a PNG. Do I need to convert it before uploading to a portal?',
      answer:   'Yes, if the portal specifies JPEG. Most do. Most portal-specific tools like Presetly handle this automatically: you upload a PNG or any format and the tool outputs a JPEG.',
    },
    {
      question: 'Can I use JPEG for my signature upload?',
      answer:   'Yes. JPEG works for signatures even though PNG is often better for fine line art. At 140x60 pixels and a good quality setting, a JPEG signature looks fine on portal review screens. If the portal specifically says PNG only, use PNG. Otherwise JPEG is acceptable and safer.',
    },
  ],

  conclusion: 'JPEG for photos, PNG for screenshots and logos. That is 95% of decisions covered. For Indian government portals, use JPEG for both your photo and your signature unless the portal specifically states otherwise. When in doubt about file size, run the image through a target-size compressor.',

  relatedArticles: [
    'image-compression-explained',
    'image-dimensions-vs-file-size',
    'how-to-compress-images-to-exact-file-sizes',
  ],
  relatedTools: [
    'compress-image-to-50kb',
    'passport-photo-maker',
  ],

  readingTime: 5,
  publishedAt: '2026-06-01',
  updatedAt:   '2026-07-01',
  search: {
    primaryQuery: 'jpeg vs png which is better',
    relatedQueries: [
      'jpeg or png for photos',
      'png vs jpeg file size',
      'when to use jpeg vs png',
      'jpeg vs png quality',
      'best image format for web',
    ],
    intent: 'informational',
    topicCluster: 'image-formats',
  },
  status:   'published',
  priority: 'medium',
}
