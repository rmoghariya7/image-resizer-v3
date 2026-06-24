import type { CompressPresetKey } from '@/registry/presets/schema'

// ─── SizeTarget type ──────────────────────────────────────────────────────────

export type SizeTarget = {
  readonly id: CompressPresetKey
  readonly sizeParam: string       // URL segment: "15kb", "1mb"
  readonly slug: string            // Full slug: "compress-image-under-15kb"
  readonly targetKB: number
  readonly displaySize: string     // "15 KB"
  readonly title: string           // "Compress Image Under 15KB"
  readonly shortTitle: string      // "Under 15KB"
  readonly metaTitle: string
  readonly description: string     // SEO meta description
  readonly useCase: string         // One-line usage context
  readonly keywords: readonly string[]
  // Extended SEO — optional, falls back to title/description when absent
  readonly ogTitle?: string
  readonly ogDescription?: string
  readonly twitterTitle?: string
  readonly twitterDescription?: string
}

// ─── Size target definitions ──────────────────────────────────────────────────

const SIZE_TARGETS_LIST: SizeTarget[] = [
  {
    id: 'compress-15kb',
    sizeParam: '15kb',
    slug: 'compress-image-under-15kb',
    targetKB: 15,
    displaySize: '15 KB',
    title: 'Compress Image Under 15KB',
    shortTitle: 'Under 15KB',
    metaTitle: 'Compress image to 15 KB for strict exam portals | Presetly',
    description:
      'UPSC, NDA, and GPSC portals cap photo uploads at 15 KB. This tool compresses any JPEG or PNG to fit under 15 KB in your browser. Nothing uploaded, nothing stored.',
    useCase: 'UPSC, NDA, GPSC strict government portals',
    ogDescription:
      'UPSC, NDA, and GPSC portals often cap uploads at 15 KB. Compress any image under 15 KB in your browser. No upload, no server, completely free.',
    twitterDescription: 'Compress image to 15 KB for UPSC, NDA, GPSC portals. Browser-only. Free.',
    keywords: [
      'compress image to 15kb',
      'reduce image size to 15kb',
      'image compressor 15kb',
      'resize image 15kb',
      'compress jpg to 15kb',
      'compress png to 15kb',
    ],
  },
  {
    id: 'compress-20kb',
    sizeParam: '20kb',
    slug: 'compress-image-under-20kb',
    targetKB: 20,
    displaySize: '20 KB',
    title: 'Compress Image Under 20KB',
    shortTitle: 'Under 20KB',
    metaTitle: 'Compress image to 20 KB for UPSC, GPSC portals | Presetly',
    description:
      'Government exam portals including UPSC and GPSC set a 20 KB limit on some photo and signature uploads. Drop your image here and it compresses under 20 KB. Free, browser-only.',
    useCase: 'UPSC, GPSC, signature portals, older govt systems',
    ogDescription:
      'UPSC and GPSC portals cap some uploads at 20 KB. This tool hits that limit automatically. Runs in your browser, nothing sent to any server. Free.',
    twitterDescription: 'Compress image to 20 KB for UPSC, GPSC government portals. Free.',
    keywords: [
      'compress image to 20kb',
      'reduce image size to 20kb',
      'image compressor 20kb',
      'resize image 20kb',
      'compress jpg to 20kb',
      'compress png to 20kb',
      'upsc photo size',
    ],
  },
  {
    id: 'compress-25kb',
    sizeParam: '25kb',
    slug: 'compress-image-under-25kb',
    targetKB: 25,
    displaySize: '25 KB',
    title: 'Compress Image Under 25KB',
    shortTitle: 'Under 25KB',
    metaTitle: 'Compress image to 25 KB for signatures and forms | Presetly',
    description:
      'Signature uploads and small profile photos on government forms often cap at 25 KB. This tool compresses your image under 25 KB. Works on JPEG, PNG, and WebP. Nothing leaves your device.',
    useCase: 'Signature files, small profile photo uploads, govt forms',
    ogDescription:
      'Signature fields and government form uploads often cap at 25 KB. Compress your image under 25 KB. Browser-based, no upload, no account. Free.',
    twitterDescription: 'Compress image to 25 KB for signatures and govt forms. Free.',
    keywords: [
      'compress image to 25kb',
      'reduce image size to 25kb',
      'image compressor 25kb',
      'resize image 25kb',
      'compress jpg to 25kb',
    ],
  },
  {
    id: 'compress-30kb',
    sizeParam: '30kb',
    slug: 'compress-image-under-30kb',
    targetKB: 30,
    displaySize: '30 KB',
    title: 'Compress Image Under 30KB',
    shortTitle: 'Under 30KB',
    metaTitle: 'Compress image to 30 KB for IBPS, scholarship portals | Presetly',
    description:
      'IBPS and many scholarship portals cap signature images at 30 KB. Upload your image and this tool finds the best quality that still fits under 30 KB. Browser-based, no sign-up. Free.',
    useCase: 'IBPS signature, scholarship portals, restricted fields',
    ogDescription:
      'IBPS and scholarship portals set a 30 KB cap. This tool compresses your image to fit under 30 KB at the best quality possible. Browser-only. Free.',
    twitterDescription: 'Compress image to 30 KB for IBPS, NTA, scholarship portals. Free.',
    keywords: [
      'compress image to 30kb',
      'reduce image size to 30kb',
      'image compressor 30kb',
      'resize image 30kb',
      'compress jpg to 30kb',
    ],
  },
  {
    id: 'compress-40kb',
    sizeParam: '40kb',
    slug: 'compress-image-under-40kb',
    targetKB: 40,
    displaySize: '40 KB',
    title: 'Compress Image Under 40KB',
    shortTitle: 'Under 40KB',
    metaTitle: 'Compress image to 40 KB for form submissions | Presetly',
    description:
      'Many state government forms and department portals set a 40 KB upload limit. This tool compresses your image to stay under 40 KB while keeping it as clear as possible. Free.',
    useCase: 'State government forms, department portals, document fields',
    ogDescription:
      'State government forms and department portals often set a 40 KB cap. Compress your image to fit under 40 KB. Runs in your browser. Free.',
    twitterDescription: 'Compress image to 40 KB for state govt forms and portals. Free.',
    keywords: [
      'compress image to 40kb',
      'reduce image size to 40kb',
      'image compressor 40kb',
      'resize image 40kb',
    ],
  },
  {
    id: 'compress-50kb',
    sizeParam: '50kb',
    slug: 'compress-image-under-50kb',
    targetKB: 50,
    displaySize: '50 KB',
    title: 'Compress Image Under 50KB',
    shortTitle: 'Under 50KB',
    metaTitle: 'Compress image to 50 KB: Aadhaar, PAN card, Voter ID | Presetly',
    description:
      'Aadhaar (UIDAI), PAN card (NSDL), and Voter ID portals all require photos under 50 KB. This tool finds the best quality that still fits under 50 KB. Free, browser-only, instant.',
    useCase: 'Aadhaar UIDAI, PAN card NSDL, Voter ID NVSP',
    ogDescription:
      'Aadhaar, PAN card, and Voter ID all cap photo uploads at 50 KB. Hit that limit automatically. Runs in your browser, nothing uploaded. Free.',
    twitterDescription: 'Compress image to 50 KB for Aadhaar, PAN card, Voter ID. Free.',
    keywords: [
      'compress image to 50kb',
      'reduce image size to 50kb',
      'image compressor 50kb',
      'resize image 50kb',
      'compress jpg to 50kb',
      'compress png to 50kb',
      'aadhaar photo size',
      'pan card photo size',
    ],
  },
  {
    id: 'compress-75kb',
    sizeParam: '75kb',
    slug: 'compress-image-under-75kb',
    targetKB: 75,
    displaySize: '75 KB',
    title: 'Compress Image Under 75KB',
    shortTitle: 'Under 75KB',
    metaTitle: 'Compress image to 75 KB for college admissions | Presetly',
    description:
      'College admission portals and institutional photo uploads usually cap at 75 KB. This tool compresses your photo to fit under 75 KB. JPEG stays JPEG. No server, no account.',
    useCase: 'College admissions, institutional uploads, university portals',
    ogDescription:
      'College admissions and institutional portals cap uploads at 75 KB. Compress your photo to fit. Browser-based, no server, no account. Free.',
    twitterDescription: 'Compress image to 75 KB for college admissions. Browser-only. Free.',
    keywords: [
      'compress image to 75kb',
      'reduce image size to 75kb',
      'image compressor 75kb',
      'resize image 75kb',
    ],
  },
  {
    id: 'compress-100kb',
    sizeParam: '100kb',
    slug: 'compress-image-under-100kb',
    targetKB: 100,
    displaySize: '100 KB',
    title: 'Compress Image Under 100KB',
    shortTitle: 'Under 100KB',
    metaTitle: 'Compress image to 100 KB: Passport Seva, NTA | Presetly',
    description:
      'Passport Seva and NTA exam portals cap photo uploads at 100 KB. This tool compresses your image under 100 KB at the best quality possible. Runs locally in your browser. Free.',
    useCase: 'Passport Seva, NTA exams, scholarship portals',
    ogDescription:
      'Passport Seva and NTA exams cap photos at 100 KB. Compress yours to fit under that limit. Browser-only, no upload, no server. Free.',
    twitterDescription: 'Compress image to 100 KB for Passport Seva, NTA exams. Free.',
    keywords: [
      'compress image to 100kb',
      'reduce image size to 100kb',
      'image compressor 100kb',
      'resize image 100kb',
      'compress jpg to 100kb',
      'compress png to 100kb',
      'passport photo size',
    ],
  },
  {
    id: 'compress-150kb',
    sizeParam: '150kb',
    slug: 'compress-image-under-150kb',
    targetKB: 150,
    displaySize: '150 KB',
    title: 'Compress Image Under 150KB',
    shortTitle: 'Under 150KB',
    metaTitle: 'Compress image to 150 KB for email and web upload | Presetly',
    description:
      'Sharing photos over email or uploading to websites works best under 150 KB. This tool compresses any image to fit under that limit. No quality slider needed. Free.',
    useCase: 'Email attachments, web uploads, general use',
    ogDescription:
      'Large photos for email or websites compress down to 150 KB here. No quality slider, no settings. Upload and download. Free.',
    twitterDescription: 'Compress image to 150 KB for email attachments and web use. Free.',
    keywords: [
      'compress image to 150kb',
      'reduce image size to 150kb',
      'image compressor 150kb',
      'resize image 150kb',
    ],
  },
  {
    id: 'compress-200kb',
    sizeParam: '200kb',
    slug: 'compress-image-under-200kb',
    targetKB: 200,
    displaySize: '200 KB',
    title: 'Compress Image Under 200KB',
    shortTitle: 'Under 200KB',
    metaTitle: 'Compress image to 200 KB for job portals | Presetly',
    description:
      'Job portals, LinkedIn photos, and CMS platforms often allow up to 200 KB. Compress your image to meet that limit without visible quality loss. Browser-based, free.',
    useCase: 'Job portals, LinkedIn, social media, CMS uploads',
    ogDescription:
      'Job portals and LinkedIn cap profile photo uploads at 200 KB. Compress yours under that limit. No quality loss at this size. Browser-only. Free.',
    twitterDescription: 'Compress image to 200 KB for job portals and LinkedIn. Free.',
    keywords: [
      'compress image to 200kb',
      'reduce image size to 200kb',
      'image compressor 200kb',
      'resize image 200kb',
      'compress jpg to 200kb',
    ],
  },
  {
    id: 'compress-500kb',
    sizeParam: '500kb',
    slug: 'compress-image-under-500kb',
    targetKB: 500,
    displaySize: '500 KB',
    title: 'Compress Image Under 500KB',
    shortTitle: 'Under 500KB',
    metaTitle: 'Compress image to 500 KB for blogs and product photos | Presetly',
    description:
      'Blog posts and e-commerce product images need to stay under 500 KB for fast page loads. This tool compresses your photo to fit. Works on JPEG, PNG, and WebP. Free.',
    useCase: 'Blog posts, e-commerce, product photos, web galleries',
    ogDescription:
      'Blog and e-commerce images that are too large slow down your site. Compress to 500 KB here. Browser-based, no upload, no server. Free.',
    twitterDescription: 'Compress image to 500 KB for blogs and e-commerce. Free.',
    keywords: [
      'compress image to 500kb',
      'reduce image size to 500kb',
      'image compressor 500kb',
      'resize image 500kb',
      'compress jpg online',
    ],
  },
  {
    id: 'compress-1mb',
    sizeParam: '1mb',
    slug: 'compress-image-under-1mb',
    targetKB: 1024,
    displaySize: '1 MB',
    title: 'Compress Image Under 1MB',
    shortTitle: 'Under 1MB',
    metaTitle: 'Compress image under 1 MB: reduce large photos free | Presetly',
    description:
      'Large RAW exports and high-resolution photos from DSLR cameras can be reduced to under 1 MB for easy sharing. Upload any size image and download a compressed version. Free.',
    useCase: 'DSLR exports, high-resolution photos, sharing',
    ogDescription:
      'DSLR exports and high-res photos can be huge. Compress them under 1 MB here without significant quality loss. Browser-only, no upload. Free.',
    twitterDescription: 'Compress large photos under 1 MB. DSLR, high-res, browser-only. Free.',
    keywords: [
      'compress image to 1mb',
      'reduce image size to 1mb',
      'compress large image',
      'reduce photo size',
      'compress jpg online free',
      'compress png online free',
    ],
  },
]

// ─── O(1) lookups ─────────────────────────────────────────────────────────────

const BY_PARAM = new Map<string, SizeTarget>(
  SIZE_TARGETS_LIST.map(t => [t.sizeParam, t]),
)

const BY_PRESET_KEY = new Map<CompressPresetKey, SizeTarget>(
  SIZE_TARGETS_LIST.map(t => [t.id, t]),
)

export const SIZE_TARGETS = SIZE_TARGETS_LIST as readonly SizeTarget[]

export function getSizeTarget(sizeParam: string): SizeTarget | undefined {
  return BY_PARAM.get(sizeParam)
}

export function getSizeTargetByPresetKey(key: CompressPresetKey): SizeTarget | undefined {
  return BY_PRESET_KEY.get(key)
}

export function getAllSizeParams(): string[] {
  return SIZE_TARGETS_LIST.map(t => t.sizeParam)
}

// ─── Related sizes ────────────────────────────────────────────────────────────

export function getRelatedSizes(current: SizeTarget, count = 4): SizeTarget[] {
  const idx = SIZE_TARGETS_LIST.indexOf(current)
  if (idx === -1) return SIZE_TARGETS_LIST.slice(0, count)

  const result: SizeTarget[] = []

  // Prefer 2 smaller + 2 larger, falling back to fill from the other direction
  for (let i = idx - 1; i >= 0 && result.length < 2; i--) {
    result.unshift(SIZE_TARGETS_LIST[i])
  }
  for (let i = idx + 1; i < SIZE_TARGETS_LIST.length && result.length < count; i++) {
    result.push(SIZE_TARGETS_LIST[i])
  }
  // If still short, fill from smaller end
  for (let i = idx - 1; i >= 0 && result.length < count; i--) {
    if (!result.includes(SIZE_TARGETS_LIST[i])) result.unshift(SIZE_TARGETS_LIST[i])
  }

  return result.slice(0, count)
}

// ─── Quick action sizes (shown after upload) ──────────────────────────────────
// The 6 most commonly searched sizes for the quick-action buttons.
// Resolved by stable sizeParam keys so re-ordering SIZE_TARGETS_LIST is safe.

const QUICK_PARAMS = ['15kb', '20kb', '25kb', '50kb', '100kb', '200kb'] as const

export const QUICK_ACTION_SIZES: readonly SizeTarget[] = QUICK_PARAMS
  .map(p => BY_PARAM.get(p))
  .filter((t): t is SizeTarget => t !== undefined)

// ─── Content generation ───────────────────────────────────────────────────────

export type SizeFaq = { question: string; answer: string }

export function generateFaqs(target: SizeTarget): SizeFaq[] {
  return [
    {
      question: `What is the best way to compress an image to ${target.displaySize}?`,
      answer: `Upload your image to Presetly's ${target.title} tool. It automatically finds the optimal JPEG quality setting using a binary search algorithm. No manual adjustment needed. Most images reach ${target.displaySize} while keeping detail crisp.`,
    },
    {
      question: `Will my image look blurry after compressing to ${target.displaySize}?`,
      answer: `It depends on your original image size. A 2 MB photo compressed to ${target.displaySize} will lose some detail, inevitable at a ${Math.round((1 - target.targetKB / 2048) * 100)}% reduction. A 200 KB photo compressed to ${target.displaySize} looks nearly identical. The tool maximises quality within the size limit.`,
    },
    {
      question: 'Which image formats are supported?',
      answer:
        'JPEG, PNG, and WebP. For very small targets like under 30 KB, PNG images are automatically converted to JPEG since JPEG compression is more efficient for photos.',
    },
    {
      question: 'Is this tool completely free?',
      answer:
        'Yes. 100% free, no sign-up, no watermarks, no daily limits. The tool runs entirely in your browser and nothing is uploaded to any server.',
    },
    {
      question: 'Can I compress multiple images at once?',
      answer:
        'Currently the tool processes one image at a time. After downloading, click "Process another image" to compress the next one. Batch processing is on the roadmap.',
    },
  ]
}

export type SizeHowItWorksStep = { title: string; body: string }

export function generateHowItWorks(target: SizeTarget): SizeHowItWorksStep[] {
  return [
    {
      title: 'Upload your image',
      body: 'Drop your JPEG, PNG, or WebP image onto the upload area, or click to browse files. Camera capture is also supported on mobile.',
    },
    {
      title: `Compressed to under ${target.displaySize}`,
      body: `The tool automatically finds the highest quality setting that keeps the file under ${target.displaySize}. No sliders, no manual settings, done in seconds.`,
    },
    {
      title: 'Download your compressed image',
      body: `Your compressed image downloads automatically. The file is under ${target.displaySize} and ready for any portal that requires it.`,
    },
  ]
}
