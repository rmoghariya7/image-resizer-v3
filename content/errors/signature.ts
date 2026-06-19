import type { CommonError } from '@/content/types'

export const signatureErrors: readonly CommonError[] = [
  {
    id: 'file-too-large',
    title: 'Signature file exceeds size limit',
    symptom: 'Portal shows "Signature file size must be under 20 KB" or similar.',
    fix: 'This tool automatically compresses your signature to under 20 KB. Re-process and download again.',
  },
  {
    id: 'background-not-white',
    title: 'Background not white or off-white',
    symptom: 'Portal rejects the signature or the preview shows a coloured/dark background.',
    fix: 'Sign on a clean sheet of plain white paper. Avoid ruled notebooks or coloured paper. Photograph in bright, even lighting (no shadows over the signature).',
  },
  {
    id: 'signature-too-faint',
    title: 'Signature is too faint or not legible',
    symptom: 'Automated check flags "Signature not detected" or the scanned signature is barely visible.',
    fix: 'Use a black or dark blue ball-point or gel pen. Avoid felt-tip pens that bleed. Make sure lighting is even and there are no shadows across the signature.',
  },
  {
    id: 'wrong-dimensions',
    title: 'Signature dimensions rejected',
    symptom: 'Portal shows "Signature must be 140 × 60 pixels" or similar dimension error.',
    fix: 'This tool resizes your signature image to exactly 140 × 60 pixels. Use the processed download, not your original scanned file.',
  },
  {
    id: 'marks-around-signature',
    title: 'Lines or marks around the signature',
    symptom: 'The portal or verifier flags "Signature contains ruled lines or marks".',
    fix: 'Sign on blank white paper, not on a ruled or printed page. Leave at least 1 cm of blank white space on all sides of your signature before scanning or photographing.',
  },
]
