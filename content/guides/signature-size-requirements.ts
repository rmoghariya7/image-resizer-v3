import type { GuideContent } from '@/content/types'

export const signatureSizeRequirementsGuide: GuideContent = {
  slug: 'signature-size-requirements',
  title: 'Digital Signature Size Requirements for Indian Government Portals',
  introduction:
    'Most Indian government exam and document portals require a scanned signature upload alongside your photo. The dimensions are the same across almost all portals — 140 × 60 pixels — but the maximum file size varies from 10 KB to 50 KB. This guide covers the exact signature requirements for every major portal.',
  sections: [
    {
      heading: 'Standard Signature Dimensions',
      body: 'The standard digital signature size used by all Indian government portals is 140 × 60 pixels (approximately 3.7 × 1.6 cm). This ratio matches the landscape signature strip printed on most exam forms. JPEG is the required format — PNG or WebP are not accepted.',
    },
    {
      heading: 'File Size Limits by Portal',
      body: 'UPSC: 4–30 KB (target under 20 KB) | SSC: under 20 KB | IBPS/NTA: under 30 KB | SBI: under 20 KB | RRB Railways: under 30 KB | Aadhaar: under 50 KB | PAN card: under 10 KB | Sarathi DL: under 20 KB. Always use the most conservative limit applicable to your portal.',
    },
    {
      heading: 'How to Scan Your Signature',
      body: 'Use a blue or black ballpoint pen on plain white A4 paper. Sign your name in one smooth stroke — avoid going over the signature multiple times. Scan at 200–300 DPI with bright, even lighting. Crop the image tightly to the signature, leaving 10 mm of white space on all sides. Avoid ruled or lined paper.',
    },
    {
      heading: 'Mobile Photography as an Alternative',
      body: 'If you do not have a scanner, place the signed paper on a flat white surface in daylight. Photograph from directly above — avoid any angle or shadow. Use your phone\'s "document mode" or crop the image in the gallery app before uploading it to this tool.',
    },
    {
      heading: 'Common Mistakes That Cause Rejections',
      body: '1. Wrong dimensions — some users upload a full A4 scan without cropping. 2. File too large — JPEG default quality settings produce files over 100 KB; use this tool to compress. 3. Wrong format — PNG transparency is not accepted by most portals. 4. Pencil or faint ink — too little contrast at small file sizes. 5. Coloured paper — portals require a white background behind the signature.',
    },
    {
      heading: 'Does the Signature Need to Match the Application Form?',
      body: 'Yes — exam hall authorities and document verification teams compare the digital signature to your physical form signature. Use your standard, consistent signature rather than a stylised variant. Inconsistency is grounds for rejection at document verification.',
    },
  ],
  relatedGoals: [
    'signature-resize-10kb',
    'signature-resize-20kb',
    'signature-resize-30kb',
    'signature-resize-50kb',
    'upsc-photo-resizer',
    'ibps-photo-resizer',
  ],
  updatedAt: '2026-06-23',
}
