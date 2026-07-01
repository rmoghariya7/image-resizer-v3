import type { LearnArticle } from '@/registry/learn/schema'

export const imageCompressionExplainedArticle: LearnArticle = {
  slug:       'image-compression-explained',
  title:      'Image compression explained',
  shortTitle: 'Image compression explained',

  seoTitle:          'Image compression explained: how it actually works',
  description:       'What is image compression, how does it work, and why does it reduce file size? Plain-language explanation of lossy vs lossless, JPEG, PNG, and WebP compression.',
  ogDescription:     'Image compression removes redundant data from photos to shrink file size. This guide explains lossy vs lossless compression, how JPEG and PNG work, and when to use each format.',
  twitterDescription: 'What actually happens when an image is compressed? Lossy vs lossless, JPEG vs PNG, WebP — all explained simply.',
  keywords: [
    'image compression explained',
    'how image compression works',
    'lossy vs lossless compression',
    'jpeg compression explained',
    'png compression how it works',
    'reduce image file size',
    'image compression algorithm',
    'webp compression',
  ],

  category: 'image-basics',
  tags: ['compression', 'jpeg', 'png', 'webp', 'lossy', 'lossless', 'file size'],

  introduction: [
    'You have probably spent time reducing image size without really knowing what is happening underneath. You drag a slider, pick a quality percentage, and the file gets smaller. But why? What is the computer actually doing?',
    'Image compression is the process of reducing how much data an image needs to be stored or sent. A high-resolution JPEG straight from a phone camera can be 5 to 8 MB. The same image compressed for a government portal is often under 100 KB. The pixel dimensions are the same. The quality looks similar. But the file is 50 to 80 times smaller.',
    'This article explains how that happens. No maths, no jargon. Just a clear explanation of what compression does, why some methods lose quality and some do not, and how to choose the right approach for your situation.',
  ],

  sections: [
    {
      id:      'what-is-image-compression',
      heading: 'What image compression actually does',
      content: [
        {
          type: 'paragraph',
          text: 'Every image is a grid of pixels. Each pixel has a colour value, and that colour value is stored as data. An uncompressed image stores every single pixel value exactly. For a 3000x2000 image, that is 6 million pixels, each with red, green, and blue values. That adds up fast.',
        },
        {
          type: 'paragraph',
          text: 'Compression looks for patterns and redundancies in that data and finds smarter ways to store the same information. A white wall in a photo, for example, might have thousands of pixels that are all basically the same shade. Instead of storing each pixel individually, compression says: "these 4000 pixels are all white, store that once."',
        },
        {
          type: 'paragraph',
          text: 'That is the basic idea. The actual algorithms are more complex, but the goal is always the same: say the same thing with fewer bytes.',
        },
      ],
    },
    {
      id:      'lossy-vs-lossless',
      heading: 'Lossy vs lossless: what is the difference',
      content: [
        {
          type: 'paragraph',
          text: 'This is the most important distinction in image compression. Lossless compression reduces file size without throwing away any image data. You can decompress a lossless file and get back the exact original. Lossy compression achieves much smaller file sizes by permanently discarding some image data.',
        },
        {
          type: 'subsection',
          id:      'lossless-compression',
          heading: 'Lossless compression',
          content: [
            {
              type: 'paragraph',
              text: 'PNG is the most common lossless format for images. When you save a PNG, the file is compressed using algorithms like DEFLATE, which find patterns and store them efficiently. But every pixel value is preserved exactly. Open the file 100 times, edit it, re-save it. The quality never degrades.',
            },
            {
              type: 'paragraph',
              text: 'Lossless is good for logos, screenshots, diagrams, and anything with text or sharp edges. It is not efficient for photographs because photos have too much natural variation to compress well losslessly.',
            },
          ],
        },
        {
          type: 'subsection',
          id:      'lossy-compression',
          heading: 'Lossy compression',
          content: [
            {
              type: 'paragraph',
              text: 'JPEG is the classic lossy format. When you save a JPEG at 80% quality, the algorithm analyses the image and permanently removes colour information that the human eye is unlikely to notice. High-frequency detail in flat areas. Subtle colour gradients. Things that look "close enough" even when missing.',
            },
            {
              type: 'paragraph',
              text: 'This is why JPEG files are so small. A photograph saved as PNG might be 10 MB. The same photograph as a JPEG at 85% quality is 1 MB. The JPEG looks nearly identical to most people. But that data is gone. You cannot recover it.',
            },
            {
              type: 'paragraph',
              text: 'The practical consequence: never use JPEG as an archival format. Edit and re-save a JPEG 10 times and each save throws away a bit more data. Always keep an original. Export JPEG only as a final step.',
            },
          ],
        },
      ],
    },
    {
      id:      'how-jpeg-compression-works',
      heading: 'How JPEG compression actually works',
      content: [
        {
          type: 'paragraph',
          text: 'JPEG compression uses a technique called DCT (Discrete Cosine Transform). The image is divided into 8x8 pixel blocks. Each block is transformed mathematically into frequency components, basically separating "coarse" detail from "fine" detail. Then the fine detail is reduced or removed based on the quality setting.',
        },
        {
          type: 'paragraph',
          text: 'This is why JPEG artefacts look blocky. When you compress a JPEG too aggressively, those 8x8 blocks become visible as squares. Smooth colour gradients get banding. Fine text becomes blurry.',
        },
        {
          type: 'paragraph',
          text: 'For most photos at 75 to 85% quality, none of this is visible. The algorithm is remarkably good at choosing what to remove. It is only at very low quality settings (under 50%) that visible degradation starts.',
        },
      ],
    },
    {
      id:      'webp-format',
      heading: 'WebP: the newer alternative',
      content: [
        {
          type: 'paragraph',
          text: 'WebP is a format developed by Google that supports both lossy and lossless compression. For the same visual quality, WebP lossy files are typically 25 to 35% smaller than equivalent JPEG files. WebP lossless files are about 26% smaller than PNG.',
        },
        {
          type: 'paragraph',
          text: 'All modern browsers support WebP. But government portals in India often only accept JPEG. If you are preparing a photo for UPSC, Aadhaar, or any Indian government portal, check the accepted format first. When in doubt, use JPEG.',
        },
      ],
    },
    {
      id:      'quality-vs-file-size',
      heading: 'Quality settings and what they mean',
      content: [
        {
          type: 'paragraph',
          text: 'Most JPEG compressors offer a quality slider from 1 to 100. This is not a percentage of the original quality. It is a scale that controls how aggressively the algorithm discards fine detail.',
        },
        {
          type: 'list',
          items: [
            '90 to 100: Very high quality, large file. Good for printing. Not needed for web or portals.',
            '75 to 85: Good quality, reasonable size. Best range for most online uses.',
            '60 to 74: Noticeable quality reduction on close inspection, much smaller files.',
            'Below 50: Visible artefacts, blockiness. Avoid for photos of people.',
          ],
        },
        {
          type: 'paragraph',
          text: 'For Indian government portals, most require files under 100 KB or 200 KB. A good-quality passport photo at 600x600 pixels can usually hit 50 to 80 KB at quality 75 to 80. That is the sweet spot for both quality and portal acceptance.',
        },
      ],
    },
  ],

  faqs: [
    {
      question: 'Does compression reduce image dimensions (pixels)?',
      answer:   'No. Compression changes file size, not pixel dimensions. An image that is 413x531 pixels stays 413x531 after compression. Only resizing changes dimensions. Most portal requirements specify both dimensions AND file size, so you usually need to do both.',
    },
    {
      question: 'Can I decompress a JPEG back to the original?',
      answer:   'No. JPEG compression is lossy and irreversible. Once data is discarded during JPEG compression, it is gone. Opening a JPEG and resaving it as PNG gives you a lossless file, but the quality is whatever the JPEG already lost. Always keep original uncompressed files.',
    },
    {
      question: 'Why does my image look fine on screen but the portal says the file is too large?',
      answer:   'Screen display and file size are separate things. A browser or viewer may scale an image to fit your screen but the underlying file is still large. The portal checks actual file size in bytes, not how it looks on your display.',
    },
    {
      question: 'What is the best format for government portal photos in India?',
      answer:   'JPEG is almost universally required by Indian government portals including UPSC, GPSC, Aadhaar, PAN card, and Passport Seva. PNG is sometimes accepted but JPEG is safer. Check the specific requirements before uploading.',
    },
    {
      question: 'How small can I compress a photo without it looking bad?',
      answer:   'For a 413x531 px passport-style photo, you can usually get to 20 to 50 KB and still have it look perfectly fine on a portal. Going below 15 KB at that size may show visible quality loss. Use the target size required by the specific portal rather than going as small as possible.',
    },
  ],

  conclusion: 'Image compression is not magic. It is a set of practical tradeoffs between file size and quality. JPEG throws away some data to get very small files. PNG keeps everything but stays larger. For most Indian government portal use cases, JPEG at the right quality setting hits the exact file size target you need. Use a tool that targets a specific KB value rather than guessing at quality sliders.',

  relatedArticles: [
    'jpeg-vs-png',
    'how-to-compress-images-to-exact-file-sizes',
    'image-dimensions-vs-file-size',
  ],
  relatedTools: [
    'compress-image-under-50kb',
    'compress-image-under-100kb',
    'compress-image-under-20kb',
  ],

  readingTime: 7,
  publishedAt: '2026-06-01',
  updatedAt:   '2026-07-01',
  search: {
    primaryQuery: 'image compression explained',
    relatedQueries: [
      'what is image compression',
      'how image compression works',
      'lossy vs lossless compression',
      'jpeg compression explained',
      'image file size reduction',
    ],
    intent: 'informational',
    topicCluster: 'image-compression',
  },
  status:   'published',
  priority: 'high',
}
