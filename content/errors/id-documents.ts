import type { CommonError } from '@/content/types'

export const idDocumentErrors: readonly CommonError[] = [
  {
    id: 'file-size-exceeded',
    title: 'Upload failed — file size exceeded',
    symptom: 'Portal shows "File size should not exceed X KB" and rejects the upload.',
    fix: 'This tool compresses your photo to exactly the required limit. Download the processed file and upload that instead of your original.',
  },
  {
    id: 'wrong-format',
    title: 'Format not accepted',
    symptom: 'Portal displays "Please upload JPEG/JPG image only" after you select your photo.',
    fix: 'Download the file produced by this tool — it is always exported as JPEG, regardless of your original format.',
  },
  {
    id: 'wrong-dimensions',
    title: 'Photo dimensions rejected',
    symptom: 'Portal shows "Photo dimensions do not match requirements" on upload.',
    fix: 'Each ID document has specific pixel dimensions. Use the correct preset (Aadhaar, PAN card, Passport, or Voter ID) — the tool sets the exact pixels required.',
  },
  {
    id: 'face-not-visible',
    title: 'Face not clearly visible',
    symptom: 'Automated check flags "Face not detected" or "Photo quality too low".',
    fix: 'Use a well-lit, high-contrast original photo with your face clearly centred and filling most of the frame. Avoid low-light or blurry source photos.',
  },
  {
    id: 'background-colour',
    title: 'Background not accepted',
    symptom: 'Form shows "Plain white background required" after upload.',
    fix: 'Take the photo in front of a plain white or off-white surface in good even lighting. This tool cannot change the background of an existing photo.',
  },
]
