import type { GuideContent } from '@/content/types'

export const passportPhotoGuidelinesGuide: GuideContent = {
  slug: 'passport-photo-guidelines',
  title: 'Indian Passport Photo Guidelines — Complete Requirements for 2026',
  introduction:
    'Getting your Indian passport photo right is critical — the Ministry of External Affairs rejects applications with non-compliant photos. This guide covers the exact size, background, expression, attire, and file format requirements for new passport applications, renewals, and Tatkal applications through the Passport Seva portal.',
  sections: [
    {
      heading: 'Digital Photo Specifications (Passport Seva Portal)',
      body: 'For online applications at passportindia.gov.in: 600 × 600 pixels, JPEG format, under 1 MB (ideally under 500 KB). The photo must have a plain white background with no shadows on the face or background. This tool resizes and compresses your photo to these exact specifications.',
    },
    {
      heading: 'Physical Print Specifications',
      body: 'For physical passport application forms: 51 × 51 mm (2 × 2 inches), colour photo, plain white background. The face should occupy 70–80% of the frame. Take the print to a photo studio — do not use this tool for physical print sizing.',
    },
    {
      heading: 'Background Requirements',
      body: 'The background must be plain white — not cream, ivory, or light grey. There must be no shadows on the background behind the head or shoulders. Do not photograph against a wall if it causes shadows. Use a white A4 paper sheet taped to a wall in good natural light as a DIY backdrop.',
    },
    {
      heading: 'Facial Expression and Pose',
      body: 'Neutral expression with mouth closed — no smiling, frowning, or raised eyebrows. Eyes must be open, clearly visible, looking directly at the camera. Head must be straight — no tilting or turning. The face must occupy the centre of the frame.',
    },
    {
      heading: 'Glasses Policy (Updated 2023)',
      body: 'As of 2023, the Ministry of External Affairs follows ICAO standards: no glasses in passport photos. This includes clear glasses, prescription glasses, sunglasses, and tinted lenses. Exceptions are not permitted even for medical reasons.',
    },
    {
      heading: 'Attire and Head Coverings',
      body: 'Wear everyday clothing — formal or casual. Avoid white clothing as it blends with the background. Head coverings are permitted only for verified religious reasons, and must not cast shadows on the face. Hair must not cover the eyes or any part of the face.',
    },
    {
      heading: 'Common Rejection Reasons',
      body: '1. Shadows on the face or background. 2. Glasses in the photo (updated rule). 3. Photo older than 6 months. 4. Coloured or patterned background. 5. Face not centred or too small. 6. Red-eye or flash reflection. 7. File too large or wrong format (not JPEG). 8. Photo edited or digitally altered (studios sometimes add backgrounds — these are detected and rejected).',
    },
    {
      heading: 'Tatkal vs Normal Application',
      body: 'The photo requirements are identical for Normal and Tatkal applications. Tatkal only affects processing time, not the photo specification. Ensure your photo meets all the above requirements regardless of the application type.',
    },
  ],
  relatedGoals: [
    'passport-photo-maker',
    'visa-photo-maker',
    'aadhaar-photo-resizer',
    'compress-image-to-200kb',
  ],
  updatedAt: '2026-06-23',
}
