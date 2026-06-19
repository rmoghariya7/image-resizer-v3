import type { CommonError } from '@/content/types'

export const compressErrors: readonly CommonError[] = [
  {
    id: 'still-too-large',
    title: 'File still too large after compression',
    symptom: 'Even after downloading the compressed file, the portal still rejects it as too large.',
    fix: 'Check that you are uploading the downloaded file and not your original. If the file is still too large, your source image may be extremely high resolution — crop it to just the subject area before re-processing.',
  },
  {
    id: 'quality-too-low',
    title: 'Output looks blurry or pixelated',
    symptom: 'The downloaded file has visible JPEG artefacts or looks significantly worse than the original.',
    fix: 'Start with a higher-quality source image. Screenshots and heavily compressed photos degrade further under compression. Use the original camera file if available.',
  },
  {
    id: 'wrong-format-output',
    title: 'Output format changed unexpectedly',
    symptom: 'You uploaded a PNG but downloaded a JPEG, and the portal only accepts PNG.',
    fix: 'The "Compress to 20 KB" preset converts to JPEG when PNG cannot reach the target size. Use a different compression target, or use a smaller PNG source.',
  },
  {
    id: 'webp-not-accepted',
    title: 'Portal does not accept the output format',
    symptom: 'Portal shows "Unsupported file type" even though the download looks correct.',
    fix: 'Some portals do not accept WebP. If your original was WebP, the output preserves that format. Use the "Compress to 20 KB" target which always outputs JPEG, or convert your source to JPEG first.',
  },
]
