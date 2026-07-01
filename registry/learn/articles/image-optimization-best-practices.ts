import type { LearnArticle } from '@/registry/learn/schema'

export const imageOptimizationBestPracticesArticle: LearnArticle = {
  slug:       'image-optimization-best-practices',
  title:      'Image optimisation best practices',
  shortTitle: 'Image optimisation tips',

  seoTitle:          'Image optimisation best practices: reduce size, keep quality',
  description:       'Practical image optimisation tips for government portal uploads, web images, and everyday use. How to reduce file size while keeping images sharp and meeting portal requirements.',
  ogDescription:     'Image optimisation is about reducing file size without visible quality loss. These practical tips cover format choice, compression levels, dimension decisions, and portal-specific advice.',
  twitterDescription: 'Practical image optimisation tips: right format, right dimensions, right compression level. For portals, web, and everyday use.',
  keywords: [
    'image optimisation best practices',
    'how to optimise images',
    'reduce image size without quality loss',
    'image compression tips',
    'best image format for web',
    'optimise photos for government portal',
    'reduce photo file size tips',
    'image quality vs file size',
  ],

  category: 'best-practices',
  tags: ['optimisation', 'compression', 'best practices', 'tips', 'file size', 'quality'],

  introduction: [
    'Good image optimisation means getting the smallest file size without visible quality loss. Not the smallest possible file. Not maximum quality. The sweet spot between the two.',
    'Most people either over-compress (bad quality, rejected by portals) or do not compress at all (too large, also rejected). Getting it right is not difficult once you understand a few basic principles.',
    'These tips apply whether you are preparing government portal photos, optimising website images, or just managing storage space on your phone.',
  ],

  sections: [
    {
      id:      'start-from-best-original',
      heading: 'Always start from the best original you have',
      content: [
        {
          type: 'paragraph',
          text: 'Compression removes data permanently. If you start from a low-quality image, compressing it further only makes it worse. Always start from the best version you have.',
        },
        {
          type: 'paragraph',
          text: 'For government portal photos, this means taking a new photo or having one taken professionally rather than digging up an old, already-compressed photo from WhatsApp. WhatsApp compresses images aggressively. A photo received on WhatsApp has already lost significant quality.',
        },
        {
          type: 'list',
          items: [
            'Use the original photo from your camera, not a forwarded WhatsApp image',
            'For scanned signatures, scan at 200 DPI or higher',
            'If you have both a JPEG and a RAW from your camera, work from the RAW',
            'Never re-compress an already-compressed image if you can avoid it',
          ],
        },
      ],
    },
    {
      id:      'choose-right-format',
      heading: 'Choose the right format for the content type',
      content: [
        {
          type: 'paragraph',
          text: 'JPEG for photographs. PNG for screenshots, logos, and signatures. WebP for web use if the platform supports it.',
        },
        {
          type: 'paragraph',
          text: 'Using PNG for a photograph adds no quality benefit and creates a much larger file. Using JPEG for a screenshot with text makes the text blurry and unreadable. Format choice matters.',
        },
        {
          type: 'paragraph',
          text: 'For government portals, use JPEG for photos and (usually) JPEG for signatures too, even though PNG would technically be better for signatures. The portal specifies the format. Follow the specification.',
        },
      ],
    },
    {
      id:      'right-quality-level',
      heading: 'Finding the right JPEG quality level',
      content: [
        {
          type: 'paragraph',
          text: 'The rule of thumb for JPEG quality: use the lowest setting where the image is indistinguishable from the original to most people. For photographs, this is usually around 75 to 85.',
        },
        {
          type: 'list',
          items: [
            'Quality 85 to 95: Excellent, suitable for archival. Larger files.',
            'Quality 75 to 85: Good, suitable for web and portal uploads. Recommended range.',
            'Quality 60 to 75: Acceptable, visible quality reduction on close inspection.',
            'Quality below 60: Noticeable artefacts. Only for very strict file size targets.',
          ],
        },
        {
          type: 'paragraph',
          text: 'For target-size compression (like "compress to under 100 KB"), you do not need to pick a quality level. The tool finds the optimal quality automatically. This is better than guessing.',
        },
      ],
    },
    {
      id:      'resize-before-compress',
      heading: 'Resize before you compress',
      content: [
        {
          type: 'paragraph',
          text: 'If you need to both resize and compress an image, always resize first. Compressing a large image and then resizing it is wasteful. You are processing more data than necessary.',
        },
        {
          type: 'paragraph',
          text: 'Resizing a 4000x3000 photo to 413x531 drops the pixel count by 98%. The file size drops dramatically just from resizing. You may not need much additional compression after that.',
        },
      ],
    },
    {
      id:      'avoid-over-compression',
      heading: 'Avoid over-compressing',
      content: [
        {
          type: 'paragraph',
          text: 'If a portal allows 300 KB, do not compress to 20 KB. That is over-compression. You are throwing away quality that the portal would have accepted.',
        },
        {
          type: 'paragraph',
          text: 'Target about 80 to 90% of the stated limit. For a 300 KB limit, aim for 250 to 270 KB. For a 50 KB limit, aim for 40 to 48 KB. This keeps quality high while staying safely under the limit.',
        },
        {
          type: 'paragraph',
          text: 'People often over-compress because they think smaller is always better. For portal uploads, the quality threshold matters. A passport photo that is too compressed looks bad on your actual passport.',
        },
      ],
    },
    {
      id:      'batch-processing-tips',
      heading: 'Preparing multiple photos efficiently',
      content: [
        {
          type: 'paragraph',
          text: 'During exam application season, you might need to prepare photos for 5 to 10 different portals. A few practical approaches:',
        },
        {
          type: 'list',
          items: [
            'Take one good high-resolution photo and use it as your master source for all applications',
            'Keep the master at full resolution and export a properly prepared version for each portal',
            'Label your exported files clearly: upsc-photo.jpg, gpsc-photo.jpg, aadhaar-photo.jpg',
            'Check dimensions and file size of each export before uploading',
            'Do the same for your signature: one good scan, multiple portal-specific exports',
          ],
        },
      ],
    },
  ],

  faqs: [
    {
      question: 'How do I know if my image is over-compressed?',
      answer:   'Open it at 100% zoom (not fitted to screen) and look for blocky patterns, especially in smooth areas like sky or walls. JPEG artefacts appear as rectangular blocks or banding in gradients. If you see these, the quality setting was too low.',
    },
    {
      question: 'Does a larger file size always mean better quality?',
      answer:   'Not always. A larger PNG of a photograph and a smaller JPEG at 80% quality often look identical. File format and compression efficiency matter as much as raw file size.',
    },
    {
      question: 'Should I strip EXIF metadata from images before uploading?',
      answer:   'For government portal uploads, metadata removal is not necessary. The portal checks pixel content, not metadata. Some privacy advocates recommend stripping EXIF from photos shared publicly because it can contain GPS location. For portal uploads, this is not a concern.',
    },
    {
      question: 'Is 72 DPI fine for portal uploads?',
      answer:   'Yes. DPI metadata does not affect how a portal processes your image. The portal only counts pixels. A 413x531 image at 72 DPI and a 413x531 image at 300 DPI have exactly the same pixel dimensions and will be treated identically by the portal.',
    },
    {
      question: 'What is the best way to check my photo meets portal requirements before uploading?',
      answer:   'Right-click the image file on your computer and check Properties or Get Info. It will show dimensions and file size. Alternatively, use a free EXIF viewer online to see full technical details. Make sure dimensions match the portal requirement and file size is under the stated limit.',
    },
  ],

  conclusion: 'Good image optimisation follows a simple order: start from the best original, choose the right format, resize to the correct dimensions, then compress to the target file size. Use preset tools when available. They handle the decision-making for you.',

  relatedArticles: [
    'image-compression-explained',
    'jpeg-vs-png',
    'how-to-compress-images-to-exact-file-sizes',
    'common-image-upload-problems',
  ],
  relatedTools: [
    'compress-image-under-100kb',
    'compress-image-under-50kb',
    'upsc-photo-resizer',
  ],

  readingTime: 6,
  publishedAt: '2026-06-01',
  updatedAt:   '2026-07-01',
  search: {
    primaryQuery: 'image optimisation best practices',
    relatedQueries: [
      'how to optimise images for web',
      'image compression tips',
      'reduce image size without losing quality',
      'web image optimisation guide',
      'best image format for website',
    ],
    intent: 'informational',
    topicCluster: 'image-compression',
  },
  status:   'published',
  priority: 'medium',
}
