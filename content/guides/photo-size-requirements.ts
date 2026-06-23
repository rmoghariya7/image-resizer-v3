import type { GuideContent } from '@/content/types'

export const photoSizeRequirementsGuide: GuideContent = {
  slug: 'photo-size-requirements',
  title: 'Photo Size Requirements for Indian Government Applications',
  introduction:
    'Every Indian government portal has different photo size requirements — and submitting the wrong size is the number one reason applications get rejected. This guide covers the exact photo dimensions, file size limits, and format requirements for UPSC, SSC, Aadhaar, PAN card, Passport, Driving Licence, and bank exam portals.',
  sections: [
    {
      heading: 'UPSC Civil Services (IAS/IPS)',
      body: 'UPSC requires a passport-size photograph of 3.5 × 4.5 cm (413 × 531 pixels at 300 DPI). The file must be in JPEG format and under 300 KB (minimum 4 KB). The background must be plain white or off-white. The photograph must have been taken within the last six months.',
    },
    {
      heading: 'SSC (Staff Selection Commission)',
      body: 'SSC CGL, CHSL, MTS, CPO, and GD Constable all use the same photo specification: 3.5 × 4.5 cm (413 × 531 pixels), JPEG format, between 20 KB and 100 KB. Plain white background, recent photograph, face clearly visible with no sunglasses.',
    },
    {
      heading: 'IBPS and SBI Bank Exams',
      body: 'IBPS PO, Clerk, and SO require 413 × 531 px, JPEG, under 200 KB. SBI PO and SBI Clerk have a stricter limit of under 50 KB at the same dimensions. Using 50 KB ensures your photo is accepted by all bank portals.',
    },
    {
      heading: 'Indian Railways (RRB/RRC)',
      body: 'Railway recruitment exams (RRB NTPC, Group D, RPF) require 413 × 531 px, JPEG, under 100 KB. Plain white background, no head coverings, face clearly visible looking straight at the camera.',
    },
    {
      heading: 'Aadhaar Card (UIDAI)',
      body: 'Aadhaar online update requires 200 × 200 px (minimum), JPEG format, under 1 MB. A plain light background with a natural-looking photograph is preferred. This is the most lenient specification among all government portals.',
    },
    {
      heading: 'PAN Card (NSDL/UTIITSL)',
      body: 'PAN card applications require a 200 × 230 px photograph, JPEG format, under 100 KB. Plain white background. Additionally, a signature image (140 × 60 px, under 10 KB) is required in a separate upload slot.',
    },
    {
      heading: 'Indian Passport (Passportindia)',
      body: 'The passport photo for online application is 600 × 600 px, JPEG format, under 1 MB. The photo must comply with ICAO standards: plain white background, neutral expression, eyes open looking straight ahead, no glasses (as of the 2023 update).',
    },
    {
      heading: 'Driving Licence (Sarathi)',
      body: 'The Sarathi portal for Learner Licence (LL) and Driving Licence (DL) applications requires 413 × 531 px, JPEG, under 200 KB. Plain white background, no helmet or cap.',
    },
    {
      heading: 'Visa Applications',
      body: 'Online visa portals (Indian e-Visa, US DS-160, Schengen applications) require a square 600 × 600 px photo, JPEG, under 500 KB. Plain white background, neutral expression, no sunglasses. Physical print requirements (35 × 45 mm) apply only to printed applications.',
    },
    {
      heading: 'Quick Reference Table',
      body: 'UPSC: 413×531 px, 300 KB | SSC: 413×531 px, 100 KB | IBPS: 413×531 px, 200 KB | SBI: 413×531 px, 50 KB | RRB: 413×531 px, 100 KB | Aadhaar: 200×200 px, 1 MB | PAN: 200×230 px, 100 KB | Passport: 600×600 px, 1 MB | Sarathi DL: 413×531 px, 200 KB | Visa: 600×600 px, 500 KB',
    },
  ],
  relatedGoals: [
    'upsc-photo-resizer',
    'ssc-photo-resizer',
    'ibps-photo-resizer',
    'bank-exam-photo-resizer',
    'aadhaar-photo-resizer',
    'pan-card-photo-resizer',
    'passport-photo-maker',
    'driving-licence-photo-resizer',
    'visa-photo-maker',
  ],
  updatedAt: '2026-06-23',
}
