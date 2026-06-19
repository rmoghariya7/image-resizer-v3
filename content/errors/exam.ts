import type { CommonError } from '@/content/types'

export const examErrors: readonly CommonError[] = [
  {
    id: 'file-too-large',
    title: 'Upload rejected — file size too large',
    symptom: 'The portal displays "File size exceeds the allowed limit" or the upload button spins indefinitely.',
    fix: 'This tool automatically compresses your photo to the exact size limit. Re-process your photo and download again — the output will be within the allowed limit.',
  },
  {
    id: 'wrong-dimensions',
    title: 'Photo rejected — wrong dimensions',
    symptom: 'The portal shows "Invalid photo dimensions" or "Photo does not meet size requirements".',
    fix: 'Use the correct preset for your exam. This tool resizes your photo to the exact pixel dimensions required — no manual resizing needed.',
  },
  {
    id: 'wrong-format',
    title: 'Format not accepted — only JPEG allowed',
    symptom: 'Portal shows "Only JPEG/JPG format accepted" even though your photo looks fine.',
    fix: 'This tool automatically converts PNG, WebP, and other formats to JPEG on download. Ensure you are uploading the file you just downloaded, not your original.',
  },
  {
    id: 'dark-background',
    title: 'Background rejected — not white',
    symptom: 'The portal flags the photo for "incorrect background colour" or the automated check fails.',
    fix: 'This tool cannot change the background of your photo. Retake your photo in front of a plain white or off-white wall in good lighting. Then re-process through this tool.',
  },
  {
    id: 'photo-too-old',
    title: 'Photo rejected — too old',
    symptom: 'Form submission blocked with "Please upload a recent photograph (within 6 months)".',
    fix: 'Government portals require a recent photo. Use a photo taken within the last 6 months, then process it here.',
  },
]
