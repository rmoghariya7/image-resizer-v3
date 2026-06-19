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
    metaTitle: 'Compress Image to 15KB Free Online | Presetly',
    description:
      'Compress any image to under 15KB instantly — free, browser-based, no upload required. Perfect for strict government portals, NDA, and UPSC applications.',
    useCase: 'Strict government portals, NDA exam applications',
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
    metaTitle: 'Compress Image to 20KB Free Online | Presetly',
    description:
      'Compress any image to under 20KB instantly — free, browser-based, no upload required. Ideal for UPSC, GPSC, and government exam photo requirements.',
    useCase: 'UPSC, GPSC, and government exam portals',
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
    metaTitle: 'Compress Image to 25KB Free Online | Presetly',
    description:
      'Compress any image to under 25KB instantly — free, browser-based, no upload required. Great for signature files and small profile photo uploads.',
    useCase: 'Signature files, small profile photo uploads',
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
    metaTitle: 'Compress Image to 30KB Free Online | Presetly',
    description:
      'Compress any image to under 30KB instantly — free, browser-based, no upload required. Useful for scholarship portals and restricted upload fields.',
    useCase: 'Scholarship portals, restricted upload fields',
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
    metaTitle: 'Compress Image to 40KB Free Online | Presetly',
    description:
      'Compress any image to under 40KB instantly — free, browser-based, no upload required. Suitable for online forms and document submission portals.',
    useCase: 'Online forms and document submission portals',
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
    metaTitle: 'Compress Image to 50KB Free Online | Presetly',
    description:
      'Compress any image to under 50KB instantly — free, browser-based, no upload required. Required by Aadhaar (UIDAI), PAN card (NSDL), and Voter ID portals.',
    useCase: 'Aadhaar UIDAI, PAN card NSDL, Voter ID NVSP',
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
    metaTitle: 'Compress Image to 75KB Free Online | Presetly',
    description:
      'Compress any image to under 75KB instantly — free, browser-based, no upload required. Good for college admissions and institutional photo uploads.',
    useCase: 'College admissions, institutional photo uploads',
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
    metaTitle: 'Compress Image to 100KB Free Online | Presetly',
    description:
      'Compress any image to under 100KB instantly — free, browser-based, no upload required. Accepted by passport applications, scholarship portals, and general websites.',
    useCase: 'Passport applications, scholarship portals, websites',
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
    metaTitle: 'Compress Image to 150KB Free Online | Presetly',
    description:
      'Compress any image to under 150KB instantly — free, browser-based, no upload required. Suitable for email attachments and general web use.',
    useCase: 'Email attachments, general web use',
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
    metaTitle: 'Compress Image to 200KB Free Online | Presetly',
    description:
      'Compress any image to under 200KB instantly — free, browser-based, no upload required. Common requirement for job portals, social media, and CMS uploads.',
    useCase: 'Job portals, social media profile photos',
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
    metaTitle: 'Compress Image to 500KB Free Online | Presetly',
    description:
      'Compress any image to under 500KB instantly — free, browser-based, no upload required. Perfect for blog posts, e-commerce listings, and web galleries.',
    useCase: 'Blog posts, e-commerce listings, web galleries',
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
    metaTitle: 'Compress Image to 1MB Free Online | Presetly',
    description:
      'Compress any image to under 1MB instantly — free, browser-based, no upload required. Great for reducing large RAW or high-resolution photos for sharing.',
    useCase: 'Sharing high-resolution photos, reducing RAW exports',
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
      answer: `Upload your image to Presetly's ${target.title} tool. It automatically finds the optimal JPEG quality setting using a binary search algorithm — no manual adjustment needed. Most images reach ${target.displaySize} while keeping detail crisp.`,
    },
    {
      question: `Will my image look blurry after compressing to ${target.displaySize}?`,
      answer: `It depends on your original image size. A 2 MB photo compressed to ${target.displaySize} will lose some detail — inevitable at a ${Math.round((1 - target.targetKB / 2048) * 100)}% reduction. A 200 KB photo compressed to ${target.displaySize} looks nearly identical. The tool maximises quality within the size limit.`,
    },
    {
      question: 'Which image formats are supported?',
      answer:
        'JPEG, PNG, and WebP. For very small targets like under 30 KB, PNG images are automatically converted to JPEG since JPEG compression is more efficient for photos.',
    },
    {
      question: 'Is this tool completely free?',
      answer:
        'Yes — 100% free, no sign-up, no watermarks, no daily limits. The tool runs entirely in your browser and nothing is uploaded to any server.',
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
      body: `The tool automatically finds the highest quality setting that keeps the file under ${target.displaySize}. No sliders, no manual settings — done in seconds.`,
    },
    {
      title: 'Download your image',
      body: 'Click the download button to save your compressed image. Everything runs in your browser — nothing is uploaded to any server.',
    },
  ]
}
