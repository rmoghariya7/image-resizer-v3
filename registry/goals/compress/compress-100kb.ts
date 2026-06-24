import type { GoalDefinition } from '@/registry/goals/schema'

export const compress100kbGoal = {
  slug: 'compress-image-100kb',
  title: 'Compress Image to 100KB',
  shortTitle: 'Compress to 100KB',
  description:
    'Compress any image under 100 KB for Passport Seva, scholarships, and government portals. Free, browser-based.',
  seoTitle: 'Compress image to 100 KB: Passport Seva, NTA | Presetly',
  ogDescription:
    'Passport Seva and NTA exam portals cap photos at 100 KB. This tool compresses your image under 100 KB at the best quality possible. Browser-only. Free.',
  twitterDescription: 'Compress image to 100 KB for Passport Seva, NTA exams. Free.',
  longDescription:
    'Passport Seva, NTA exam portals, state scholarship forms, and many central government services cap photo uploads at 100 KB. ' +
    'This tool finds the highest quality level that still keeps the file under 100 KB. ' +
    'JPEG stays JPEG. PNG stays PNG where possible. ' +
    'Everything runs locally in your browser. No upload, no waiting, no account.',
  category: 'compress',
  subcategory: 'passport-scholarship',
  tags: ['compress image', '100kb', 'image compressor', 'passport seva', 'scholarship', 'nta', 'reduce file size'],
  tool: 'image-resizer',
  preset: 'compress-100kb',
  keywords: [
    'compress image to 100kb',
    'reduce image size to 100kb online',
    'compress photo under 100kb',
    'image compressor 100kb',
    'passport seva photo 100kb',
    'compress jpg to 100kb free',
    'nta photo 100kb',
    'scholarship photo size kb',
  ],
  howItWorks: [
    {
      title: 'Upload your image',
      body: 'Drag your image onto the page or click to browse. JPEG, PNG, and WebP are all accepted. The file can be any starting size.',
    },
    {
      title: 'Quality optimised to stay under 100 KB',
      body: 'The tool finds the highest quality level that keeps the file under 100 KB. JPEG stays JPEG, PNG stays PNG. Everything runs locally. No upload, no waiting.',
    },
    {
      title: 'Download and attach to your form',
      body: 'Save the compressed file and attach it to your Passport Seva form, scholarship portal, or any government service that caps photo uploads at 100 KB.',
    },
  ],
  faqs: [
    {
      question: 'Does Passport Seva require a photo under 100 KB?',
      answer:
        'Yes. The Passport Seva Online portal caps photo uploads at 100 KB, JPEG format. The photo also needs to be 35x45 mm with a white background. Use {{goal:passport-photo-maker}} if you need both resizing and compression.',
    },
    {
      question: 'Will my photo lose quality at 100 KB?',
      answer:
        'Very little. A passport-size photo (413x531 pixels) at 100 KB is visually sharp. The difference from the original is not visible to the naked eye for most photos taken in good light.',
    },
    {
      question: 'What happens to PNG files?',
      answer:
        'PNG files are converted to JPEG if needed to hit the 100 KB target. Passport Seva and most government portals only accept JPEG anyway. If the PNG is already under 100 KB, it stays as PNG.',
    },
    {
      question: 'My photo is 413x531 but still over 100 KB. What should I do?',
      answer:
        'Use this tool directly on the 413x531 image. The compressor will bring the file under 100 KB while keeping the same dimensions. Do not resize the photo again.',
    },
    {
      question: 'Can I use this for NTA exam portal photos?',
      answer:
        'Yes. NTA caps photos at 100 KB across UGC NET, CSIR NET, and CUET. But for a properly resized and compressed NTA photo, {{goal:ugc-net-photo-resizer}} handles both in one step.',
    },
  ],
  relatedGoals: [
    'compress-image-50kb',
    'compress-image-20kb',
    'passport-photo-maker',
    'ugc-net-photo-resizer',
  ],
  complementaryGoals: [
    'passport-photo-maker',
    'ugc-net-photo-resizer',
  ],
  status: 'active',
  priority: 'high',
  updatedAt: '2026-06-24',
} satisfies GoalDefinition
