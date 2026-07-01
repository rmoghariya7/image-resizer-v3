import type { LearnArticle } from '@/registry/learn/schema'

export const howBrowserBasedImageProcessingWorksArticle: LearnArticle = {
  slug:       'how-browser-based-image-processing-works',
  title:      'How browser-based image processing works',
  shortTitle: 'Browser image processing',

  seoTitle:          'How browser-based image processing works: Canvas API explained',
  description:       'When a tool processes your image in the browser without uploading it, what is actually happening? A plain-language explanation of the Canvas API, Web Workers, and client-side image processing.',
  ogDescription:     'Browser-based image tools use the Canvas API and JavaScript to resize, compress, and convert images locally on your device. Your photo never leaves your computer. Here is how that works.',
  twitterDescription: 'How does a browser process images without uploading them? Canvas API, Web Workers, client-side JPEG encoding explained simply.',
  keywords: [
    'browser based image processing',
    'client side image compression',
    'canvas api image resize',
    'javascript image compression',
    'image processing without upload',
    'privacy photo tool browser',
    'web worker image processing',
    'client side jpeg encoding',
  ],

  category: 'technical',
  tags: ['technical', 'browser', 'canvas api', 'privacy', 'javascript', 'web workers'],

  introduction: [
    'When you use an image tool that says "your photo never leaves your device", you might wonder: how does that actually work? The tool clearly does something with the image. It resizes it, compresses it, converts the format. But it claims not to upload anything.',
    'This is not marketing language. It is technically accurate. Modern browsers include a full set of image processing APIs that run locally on your device without sending anything to a server. The tool just uses those APIs.',
    'Understanding how this works is useful both for trusting these tools with sensitive documents and for knowing when they might have limitations.',
  ],

  sections: [
    {
      id:      'canvas-api',
      heading: 'The Canvas API: browser\'s built-in image processor',
      content: [
        {
          type: 'paragraph',
          text: 'The Canvas API is a browser feature that lets JavaScript draw and manipulate graphics. Think of it as a programmable drawing surface in the browser. Every modern browser (Chrome, Firefox, Safari, Edge) includes it.',
        },
        {
          type: 'paragraph',
          text: 'When you upload an image to a browser-based tool, the JavaScript code creates an invisible canvas element, draws your image onto it at the desired dimensions, then extracts the result as a compressed JPEG or PNG.',
        },
        {
          type: 'list',
          items: [
            'drawImage(): draws an image onto the canvas, with optional scaling',
            'toBlob(): exports the canvas contents as a compressed image file',
            'toDataURL(): exports as a base64-encoded string',
            'getImageData(): reads raw pixel values from the canvas',
          ],
        },
        {
          type: 'paragraph',
          text: 'These four functions handle almost all image processing use cases: resize, compress, convert format, crop. No server required.',
        },
      ],
    },
    {
      id:      'how-resize-works',
      heading: 'How resizing works in the browser',
      content: [
        {
          type: 'paragraph',
          text: 'Resizing is straightforward. The tool creates a canvas with the target dimensions (say, 413x531 pixels). It then draws your original image onto this smaller canvas. The browser scales the image down to fit. The result is a 413x531 canvas with a resized version of your photo.',
        },
        {
          type: 'paragraph',
          text: 'The quality of the downscale depends on the algorithm. Simple canvas.drawImage() uses bilinear interpolation, which is decent but not perfect. Better tools use multi-step downscaling (scaling down in 50% steps) or dedicated algorithms for sharper results.',
        },
      ],
    },
    {
      id:      'how-compression-works',
      heading: 'How compression works in the browser',
      content: [
        {
          type: 'paragraph',
          text: 'The canvas toBlob() function accepts a quality parameter from 0 to 1. This maps to JPEG quality. canvas.toBlob(callback, "image/jpeg", 0.8) produces a JPEG at 80% quality.',
        },
        {
          type: 'paragraph',
          text: 'For target-size compression, the tool runs a binary search. Try quality 0.8. If the output is too large, try 0.6. Too small? Try 0.7. Each step takes about 10 to 50 milliseconds on a modern device. The whole binary search typically runs in under 500ms.',
        },
        {
          type: 'paragraph',
          text: 'The browser\'s built-in JPEG encoder is used. This is the same encoder your phone uses when saving photos, so quality is good.',
        },
      ],
    },
    {
      id:      'web-workers',
      heading: 'Web Workers: keeping the interface responsive',
      content: [
        {
          type: 'paragraph',
          text: 'Image processing can be slow for large images. If it runs on the main browser thread, the page freezes while it works. Web Workers solve this by running JavaScript code on a background thread.',
        },
        {
          type: 'paragraph',
          text: 'When a browser-based image tool uses a Web Worker, the UI stays responsive while processing happens. You can still scroll, click buttons, or open other tabs. The worker sends a message back when processing is complete.',
        },
        {
          type: 'paragraph',
          text: 'Not all browser tools use Web Workers. Simple tools may do processing on the main thread for small images where it is fast enough. For large images, Web Workers make a noticeable difference.',
        },
      ],
    },
    {
      id:      'privacy-implications',
      heading: 'What this means for privacy',
      content: [
        {
          type: 'paragraph',
          text: 'When image processing happens entirely in the browser, your photo never leaves your device. There is no server receiving, storing, or processing it. Your Aadhaar photo, passport photo, or any sensitive document is processed locally by code running in your browser tab.',
        },
        {
          type: 'paragraph',
          text: 'You can verify this yourself. Open your browser\'s network inspector (press F12 in Chrome, then click the Network tab) while using a browser-based image tool. If no requests are made when you upload and process an image, the tool is genuinely client-side.',
        },
        {
          type: 'paragraph',
          text: 'Presetly processes all images in the browser. No uploads. The network inspector will show no image transfer.',
        },
      ],
    },
    {
      id:      'limitations',
      heading: 'Limitations of browser-based processing',
      content: [
        {
          type: 'paragraph',
          text: 'Browser-based tools are excellent for most use cases but have some limitations compared to server-side processing.',
        },
        {
          type: 'list',
          items: [
            'Very large images (over 20 MP) can be slow or cause browser memory issues on older devices',
            'Advanced noise reduction and AI upscaling require server-side processing',
            'RAW camera formats (CR2, NEF, ARW) are not supported by the Canvas API',
            'Processing speed depends on the user\'s device, not a server',
          ],
        },
        {
          type: 'paragraph',
          text: 'For government portal photo preparation, browser-based tools are perfect. The images are not large, the operations are standard, and privacy is important.',
        },
      ],
    },
  ],

  faqs: [
    {
      question: 'Can I use a browser-based image tool without an internet connection?',
      answer:   'Once the tool is loaded in your browser, yes. The initial page load requires internet. But the processing itself uses local browser APIs. You could disconnect your internet after loading the page and still process images.',
    },
    {
      question: 'Is browser-based processing slower than server-based?',
      answer:   'For typical photo sizes (under 5 MP), it is about the same or faster because there is no upload/download latency. For very large images, a good server would be faster. But for government portal photos at 413x531 or 600x600 pixels, browser processing is nearly instant.',
    },
    {
      question: 'Does the tool store my image in the browser?',
      answer:   'Tools should not permanently store your image. Images are held in memory during processing and released after. Presetly does not persist any image data. The image exists only during the active session.',
    },
    {
      question: 'Is client-side image compression as good as Photoshop?',
      answer:   'For JPEG at 75 to 90% quality, the results are very close. Modern browsers use well-optimised JPEG encoders. For advanced editing like noise reduction or HDR processing, Photoshop is better. For simple resize and compress, the browser is sufficient.',
    },
    {
      question: 'Can browser-based tools process multiple images at once?',
      answer:   'Yes. Web Workers allow parallel processing of multiple images. Some batch tools use this to process several images simultaneously. The speed depends on device resources.',
    },
  ],

  conclusion: 'Browser-based image processing is a mature technology. The Canvas API and Web Workers handle everything from basic resize to target-size JPEG compression entirely on your device. For government portal photo preparation, this approach is fast, private, and reliable.',

  relatedArticles: [
    'image-compression-explained',
    'image-dimensions-vs-file-size',
    'image-optimization-best-practices',
  ],
  relatedTools: [
    'compress-image-under-50kb',
    'upsc-photo-resizer',
    'passport-photo-maker',
  ],

  readingTime: 7,
  publishedAt: '2026-06-01',
  updatedAt:   '2026-07-01',
  search: {
    primaryQuery: 'browser based image processing',
    relatedQueries: [
      'how browser processes images',
      'client side image compression',
      'javascript image resize browser',
      'canvas api image compression',
      'privacy safe image processing',
    ],
    intent: 'informational',
    topicCluster: 'image-compression',
  },
  status:   'published',
  priority: 'medium',
}
