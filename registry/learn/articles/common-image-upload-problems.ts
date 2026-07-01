import type { LearnArticle } from '@/registry/learn/schema'

export const commonImageUploadProblemsArticle: LearnArticle = {
  slug:       'common-image-upload-problems',
  title:      'Common image upload problems and how to fix them',
  shortTitle: 'Image upload problems',

  seoTitle:          'Image upload errors on govt portals: causes and fixes',
  description:       'Why is your image being rejected by a government portal? File too large, wrong dimensions, wrong format, or poor image quality. Here is what each error means and how to fix it.',
  ogDescription:     'Government portal photo upload errors explained. File too large, wrong format, invalid dimensions, blurry image. Every common error and what to do to fix it.',
  twitterDescription: 'Govt portal rejecting your photo? File too large, wrong size, wrong format. Here is what each error means and how to fix it.',
  keywords: [
    'image upload error government portal',
    'photo rejected portal India',
    'file too large upload',
    'wrong image format portal',
    'photo dimensions error',
    'upsc photo upload error',
    'aadhaar photo upload problem',
    'compress photo for government portal',
  ],

  category: 'best-practices',
  tags: ['upload errors', 'government portals', 'troubleshooting', 'file size', 'dimensions'],

  introduction: [
    'You have your photo ready, you filled the entire form, and then the portal says "Invalid image" or "File size exceeds limit" and you have no idea what is wrong. This happens to a lot of people, and it usually comes down to one of five specific issues.',
    'Government portals often give very minimal error messages. "Invalid format" could mean the file extension is wrong, or the actual image encoding is wrong, or the image metadata is flagged. Not helpful.',
    'This guide covers every common image upload problem with clear causes and step-by-step fixes. Bookmark it for exam application season.',
  ],

  sections: [
    {
      id:      'file-too-large',
      heading: 'Problem: File is too large',
      content: [
        {
          type: 'paragraph',
          text: 'The most common problem. Your image is 500 KB and the portal allows 200 KB. Or it is 2 MB and the portal allows 50 KB.',
        },
        {
          type: 'subsection',
          id:      'fix-file-too-large',
          heading: 'How to fix it',
          content: [
            {
              type: 'paragraph',
              text: 'Use a target-size compressor. Set the target to 90% of the portal\'s stated limit (so for a 200 KB limit, target 180 KB). This gives you a small safety margin in case the portal measures file size differently.',
            },
            {
              type: 'paragraph',
              text: 'If the photo has very large dimensions (like 4000x3000), resize it to the portal\'s required dimensions first. Resizing alone may get you under the limit. If not, compress further.',
            },
          ],
        },
      ],
    },
    {
      id:      'wrong-dimensions',
      heading: 'Problem: Wrong image dimensions',
      content: [
        {
          type: 'paragraph',
          text: 'The portal requires 413x531 pixels but your image is 600x400, or 1200x1600, or any other size. Portals check pixel count directly and reject anything that does not match.',
        },
        {
          type: 'subsection',
          id:      'fix-wrong-dimensions',
          heading: 'How to fix it',
          content: [
            {
              type: 'paragraph',
              text: 'Use the portal-specific preset tool for your exam or document. It knows the exact required dimensions and resizes automatically. If using a general resize tool, set both width and height exactly to the portal\'s requirement.',
            },
            {
              type: 'paragraph',
              text: 'Be careful about aspect ratio. If your photo is portrait and the portal needs a specific portrait ratio, simple stretching will look bad. Crop first to the right proportions, then resize.',
            },
          ],
        },
      ],
    },
    {
      id:      'wrong-format',
      heading: 'Problem: Wrong file format',
      content: [
        {
          type: 'paragraph',
          text: 'Portal requires JPEG, you uploaded PNG. Or you renamed a PNG to ".jpg" thinking that would work. It does not. The portal reads the actual file structure, not just the extension.',
        },
        {
          type: 'subsection',
          id:      'fix-wrong-format',
          heading: 'How to fix it',
          content: [
            {
              type: 'paragraph',
              text: 'Open the image in any image editor (even Windows Photos or Preview on Mac) and use "Export" or "Save As" to save it as JPEG. Or use any online converter. Renaming the file extension does not change the actual format.',
            },
            {
              type: 'paragraph',
              text: 'Presetly tools always output JPEG regardless of the input format. If your source is a PNG or WebP, upload it and the output will be the correct JPEG.',
            },
          ],
        },
      ],
    },
    {
      id:      'blurry-or-low-quality',
      heading: 'Problem: Photo marked as blurry or low quality',
      content: [
        {
          type: 'paragraph',
          text: 'Some portals run automated checks for sharpness. If your photo is blurry, taken in low light, or heavily compressed, it may be flagged.',
        },
        {
          type: 'subsection',
          id:      'fix-blurry',
          heading: 'How to fix it',
          content: [
            {
              type: 'paragraph',
              text: 'Start from a better original. A sharp, well-lit photo compressed to 100 KB will look much better than a blurry photo at any size. If you are using a phone camera, make sure you are in good light, holding the phone steady, and tapping the screen to focus on your face before taking the shot.',
            },
            {
              type: 'paragraph',
              text: 'Also, never over-compress. Going to 10 KB when the limit is 50 KB means unnecessary quality loss. Target the limit, not the minimum.',
            },
          ],
        },
      ],
    },
    {
      id:      'face-detection-failures',
      heading: 'Problem: Face not detected',
      content: [
        {
          type: 'paragraph',
          text: 'Some portals (Aadhaar, Passport Seva) run automated face detection. Your photo may be rejected if the face is too small in the frame, obscured, facing sideways, or if there are strong shadows across the face.',
        },
        {
          type: 'list',
          items: [
            'Face should fill 60 to 80% of the image height',
            'Look directly at the camera, not to the side',
            'No shadows crossing the face',
            'Both eyes fully visible and open',
            'No sunglasses or dark lenses',
          ],
        },
      ],
    },
    {
      id:      'photo-from-existing-id',
      heading: 'Problem: Using a photo scanned from an existing ID',
      content: [
        {
          type: 'paragraph',
          text: 'Some people photograph their existing ID card and try to use that photo. This almost never works. The photo is too small (IDs are 35x45mm), the scan introduces noise and colour shifts, and the face takes up less than 50% of the frame due to ID border space.',
        },
        {
          type: 'paragraph',
          text: 'Always use an original photograph. If you do not have a recent photo in digital form, take a new one with a phone camera. It takes 5 minutes and produces a much better result.',
        },
      ],
    },
  ],

  faqs: [
    {
      question: 'My file size and dimensions are both correct but the portal still rejects the photo. What else could be wrong?',
      answer:   'Check the colour mode. Some portals reject CMYK images or greyscale. The image should be RGB colour. Also check if there are any unusual metadata issues. Saving a fresh JPEG from an image editor usually clears metadata problems.',
    },
    {
      question: 'The portal error says "invalid image" with no other details. What does that mean?',
      answer:   'Try re-exporting the image as a fresh JPEG from any image editor. Sometimes files have corruption, unusual metadata, or embedding that triggers generic validation errors. A freshly exported JPEG almost always fixes this.',
    },
    {
      question: 'The photo looks fine on my screen but the portal says the quality is insufficient.',
      answer:   'The portal may be checking for minimum resolution relative to the required print size, or it may be using an automated blur detection. Try taking a new, sharper photo in better light rather than compressing an existing one further.',
    },
    {
      question: 'I am using the correct size JPEG but the portal shows a size mismatch error.',
      answer:   'Some portals check exact pixel dimensions. A 413x532 image will fail a 413x531 check. Make sure you are using a tool that outputs exactly the required dimensions, not "approximately" those dimensions.',
    },
    {
      question: 'Can I use a photo from my Aadhaar card for other government portals?',
      answer:   'The Aadhaar photo is 200x200 pixels. Most exam portals require 413x531. The dimensions are different so the same image cannot be used. Even if you upscale a 200x200 image to 413x531, the quality will be poor and may be rejected.',
    },
  ],

  conclusion: 'Most portal rejections come down to one of three issues: wrong file size, wrong dimensions, or wrong format. Fix all three and 95% of upload problems disappear. Use a preset tool for your specific portal and you usually do not have to think about any of this.',

  relatedArticles: [
    'image-dimensions-vs-file-size',
    'jpeg-vs-png',
    'how-to-compress-images-to-exact-file-sizes',
    'photo-requirements-for-online-applications',
  ],
  relatedTools: [
    'upsc-photo-resizer',
    'aadhaar-photo-resizer',
    'compress-image-under-50kb',
    'passport-photo-maker',
  ],

  readingTime: 7,
  publishedAt: '2026-06-01',
  updatedAt:   '2026-07-01',
  search: {
    primaryQuery: 'common image upload problems fix',
    relatedQueries: [
      'image upload error on portal',
      'image too large to upload fix',
      'why is my image not uploading',
      'portal rejecting image fix',
      'image upload troubleshooting',
    ],
    intent: 'informational',
    topicCluster: 'image-compression',
  },
  status:   'published',
  priority: 'high',
}
