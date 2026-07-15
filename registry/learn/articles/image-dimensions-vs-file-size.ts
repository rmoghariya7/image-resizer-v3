import type { LearnArticle } from '@/registry/learn/schema'

export const imageDimensionsVsFileSizeArticle: LearnArticle = {
  slug:       'image-dimensions-vs-file-size',
  title:      'Image dimensions vs file size: what is the difference',
  shortTitle: 'Dimensions vs file size',

  seoTitle:          'Image dimensions vs file size: pixels vs KB explained simply',
  description:       'Pixels and KB are not the same thing. Understand the difference between image dimensions (width x height) and file size (KB or MB) and how to control both.',
  ogDescription:     'Most people confuse image dimensions (pixels) and file size (KB). They are different. This guide explains both, how they relate, and why you need to control them separately for portal uploads.',
  twitterDescription: 'Pixels vs KB: image dimensions and file size are not the same. Here is how they are different and why it matters for govt portal uploads.',
  keywords: [
    'image dimensions vs file size',
    'pixels vs kb image',
    'what is image resolution',
    'image size in pixels',
    'reduce image dimensions online',
    'image width height vs file size',
    'photo size kb pixels difference',
    'resize image reduce file size',
  ],

  category: 'image-basics',
  tags: ['dimensions', 'resolution', 'pixels', 'file size', 'kb', 'image basics'],

  introduction: [
    'If you have ever tried to upload a photo to a government portal and got confused by two different errors, one saying the image is too large and another saying the dimensions are wrong, you are not alone. These are two completely different things.',
    'Image dimensions are the width and height in pixels. A photo that is 4000x3000 pixels has those dimensions. File size is how many bytes it takes to store the image, measured in KB or MB.',
    'A 4000x3000 photo might be 5 MB. After compression, it might be 400 KB. Same dimensions, much smaller file. Resize it to 413x531 and it becomes small in both dimensions and file size. Both are separate controls, and Indian government portals often require both to be within specific ranges.',
  ],

  sections: [
    {
      id:      'what-are-dimensions',
      heading: 'What image dimensions actually mean',
      content: [
        {
          type: 'paragraph',
          text: 'Dimensions are the number of pixels in each direction. A 600x600 image is 600 pixels wide and 600 pixels tall. A 413x531 image is 413 wide and 531 tall. These numbers do not change when you compress or uncompress an image. They only change when you resize.',
        },
        {
          type: 'paragraph',
          text: 'Pixels are the individual dots that make up an image. More pixels means more detail. A 4000x3000 photo has 12 million pixels. A 413x531 photo has about 220,000 pixels. The portal-specified dimensions tell you exactly how many pixels the portal expects.',
        },
        {
          type: 'paragraph',
          text: 'If you upload an image with the wrong dimensions, the portal will reject it even if the file size is correct. Both must be right.',
        },
      ],
    },
    {
      id:      'what-is-file-size',
      heading: 'What file size means',
      content: [
        {
          type: 'paragraph',
          text: 'File size is how much space the image takes up on disk. It is measured in KB (kilobytes) or MB (megabytes). An uncompressed image at 600x600 pixels in 24-bit colour takes about 1.03 MB (600 x 600 x 3 bytes). A well-compressed JPEG of the same image is 50 to 100 KB.',
        },
        {
          type: 'paragraph',
          text: 'Compression reduces file size without changing dimensions. You can have a 600x600 image at 80 KB or a 600x600 image at 500 KB. Same pixels, different file size.',
        },
      ],
    },
    {
      id:      'how-they-relate',
      heading: 'How dimensions and file size relate to each other',
      content: [
        {
          type: 'paragraph',
          text: 'Dimensions and file size both affect each other but are controlled separately. Making an image smaller in dimensions (fewer pixels) naturally reduces the maximum file size because there is less data to store. But the relationship is not linear.',
        },
        {
          type: 'paragraph',
          text: 'A 4000x3000 photo shrunk to 413x531 drops from 12 million pixels to 220,000. That is a 98% reduction in pixel count. The file size drops significantly, but not always 98% because the JPEG algorithm handles different content differently.',
        },
        {
          type: 'list',
          items: [
            'Reducing dimensions reduces maximum possible file size',
            'Compression reduces file size without affecting dimensions',
            'To meet portal requirements, you usually need to do both: resize to dimensions, then compress to target KB',
            'Order matters: resize first, then compress. Compressing a large image then resizing is inefficient.',
          ],
        },
      ],
    },
    {
      id:      'dpi-resolution',
      heading: 'What about DPI and resolution?',
      content: [
        {
          type: 'paragraph',
          text: 'DPI (dots per inch) is a print concept. It describes how densely pixels are packed when printing. A 300 DPI print looks sharper than a 72 DPI print at the same physical size because 300 dots are packed into each inch instead of 72.',
        },
        {
          type: 'paragraph',
          text: 'For digital uploads (government portals, websites), DPI does not matter. The portal only cares about pixel count, not print density. A 413x531 image is a 413x531 image regardless of whether it says 72 DPI or 300 DPI in its metadata.',
        },
        {
          type: 'paragraph',
          text: 'Some portal instructions mention "300 DPI" or "200 DPI" because they were written with print in mind. For digital upload, focus on the pixel dimensions. DPI is irrelevant for screen display and form uploads.',
        },
      ],
    },
    {
      id:      'portal-requirements-practical',
      heading: 'Practical guide to meeting portal requirements',
      content: [
        {
          type: 'paragraph',
          text: 'When a portal says "photo must be 413x531 pixels and under 200 KB", you need to satisfy both conditions. Here is the order of operations:',
        },
        {
          type: 'list',
          items: [
            'Start with the best quality original photo you have',
            'Resize to exactly 413x531 pixels (or whatever the portal requires)',
            'Compress to under the KB limit (usually 80 to 90% of the stated limit to be safe)',
            'Save as JPEG unless the portal specifies otherwise',
            'Check the output file: right dimensions, right format, under the size limit',
          ],
        },
        {
          type: 'paragraph',
          text: 'Portal-specific tools like Presetly do all of this in one step. The preset already knows the required dimensions and size limit for each portal.',
        },
      ],
    },
  ],

  faqs: [
    {
      question: 'If I make an image smaller in dimensions, does the file size automatically decrease?',
      answer:   'Yes, reducing dimensions always reduces file size, but not always as much as you might expect. The JPEG compression level also affects file size. Resizing to smaller dimensions AND compressing gives you the most control over the final KB.',
    },
    {
      question: 'My photo is 2 MB. If I resize it to 413x531, will it automatically be under 300 KB?',
      answer:   'Usually yes, for photographs. A 2 MB photo resized to 413x531 pixels is typically well under 300 KB at standard JPEG quality. But it depends on the compression applied during the resize. Check the output size after resizing to be sure.',
    },
    {
      question: 'What if the portal shows an error about both size and dimensions?',
      answer:   'Fix dimensions first, then check file size. Most tools can do both in one step. Use the portal-specific preset if available, as it handles both automatically.',
    },
    {
      question: 'Is a 413x531 image the same as a "passport size" photo?',
      answer:   'In Indian government portal terms, 413x531 pixels at 300 DPI represents a 3.5x4.5 cm photo. That is the standard "passport size" used for exam applications. True passport photos for the passport itself are 600x600 pixels (square).',
    },
    {
      question: 'Can I increase the dimensions of a small image to meet portal requirements?',
      answer:   'Technically yes, but the quality will be poor. Enlarging a small image beyond its original size stretches pixels and creates a blurry result. The portal may reject it or it may pass technical validation but look bad. Always start from a high-quality original.',
    },
  ],

  conclusion: 'Dimensions and file size are separate. Control them separately. Resize to the pixel dimensions the portal requires. Compress to the KB limit the portal requires. Use the right tool for each step, or use a preset tool that handles both automatically.',

  relatedArticles: [
    'image-compression-explained',
    'jpeg-vs-png',
    'how-to-compress-images-to-exact-file-sizes',
  ],
  relatedTools: [
    'upsc-photo-resizer',
    'aadhaar-photo-resizer',
    'compress-image-to-100kb',
  ],

  readingTime: 6,
  publishedAt: '2026-06-01',
  updatedAt:   '2026-07-01',
  search: {
    primaryQuery: 'image dimensions vs file size',
    relatedQueries: [
      'does image size affect file size',
      'pixels vs file size',
      'how image dimensions affect kb',
      'resize image reduce file size',
      'image resolution vs file size',
    ],
    intent: 'informational',
    topicCluster: 'image-compression',
  },
  status:   'published',
  priority: 'medium',
}
