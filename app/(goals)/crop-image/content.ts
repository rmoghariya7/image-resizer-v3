import type { FAQ, HowItWorksStep } from '@/types/registry'

// Page content for /crop-image. Standalone tools live outside the goal
// registry, so their copy is co-located with the route (see /video-to-audio).

export const PAGE_TITLE = 'Image Cropper'
export const SEO_TITLE = 'Free Image Cropper Online — Passport, Instagram, YouTube | Presetly'
export const DESCRIPTION =
  'Crop images for passport photos, Aadhaar, Instagram, YouTube thumbnails and dozens of other goals — ' +
  'right in your browser. Choose a preset, drag to frame your shot, and download. Nothing is uploaded.'

export const HOW_IT_WORKS: HowItWorksStep[] = [
  {
    title: 'Upload your image',
    body: 'Drop in a JPEG, PNG or WebP file, paste from your clipboard, or take a photo on mobile. It never leaves your device.',
  },
  {
    title: 'Choose a preset',
    body: 'Pick from Government, Social Media, Developer or Custom categories — Presetly applies the exact crop and dimensions automatically.',
  },
  {
    title: 'Adjust the crop',
    body: 'Drag to reposition, pinch or scroll to zoom, and rotate if needed. The crop box always keeps your chosen ratio.',
  },
  {
    title: 'Crop and download',
    body: 'Tap Crop and your image is ready instantly, sized exactly for your goal — no manual pixel maths required.',
  },
]

export const GOVERNMENT_GUIDE = {
  heading: 'Government photo crop guide',
  paragraphs: [
    'Indian exam and ID portals are strict about photo framing: UPSC, GPSC and SSC all expect a 3.5×4.5 cm portrait with the face centred and shoulders visible, while Aadhaar and PAN card uploads use smaller square or near-square crops built around the UIDAI and NSDL specifications.',
    'The Government presets in this tool are pulled from the same specification data Presetly\'s photo resizer uses, so a Passport crop always exports at exactly 600×600 px and a PAN Card crop at exactly 200×230 px — whatever portion of the photo you actually drag and zoom into.',
    'For the best result, start with a well-lit photo taken against a plain background, centre the face inside the crop box, and leave a little headroom above the hairline before cropping.',
  ],
}

export const SOCIAL_GUIDE = {
  heading: 'Social media crop guide',
  paragraphs: [
    'Every social network expects a different frame: Instagram posts are square, Stories and Reel covers are tall 9:16, and cover photos on Facebook, LinkedIn and Twitter/X are wide horizontal banners. Uploading the wrong ratio usually means the platform crops it again for you — often worse than if you had framed it yourself.',
    'The Social Media presets here match each platform\'s current recommended dimensions, so a LinkedIn Banner crop exports at 1584×396 px and a YouTube Thumbnail at 1280×720 px, ready to upload without any further resizing.',
    'For banners and covers, keep any text or logos away from the edges — platforms often overlay profile pictures or UI elements on top of the outer portion of the image.',
  ],
}

export const WHY_CROP_BEFORE_UPLOADING = {
  heading: 'Why crop before uploading',
  paragraphs: [
    'Most exam portals, ID document uploaders and social platforms reject images that don\'t match their expected frame — or silently crop them from the centre, which often cuts off a face or a logo. Cropping to the right ratio yourself means what you see is exactly what gets uploaded.',
    'Cropping locally also means faster uploads: a photo cropped down to 600×600 px or 1280×720 px is a fraction of the size of the original camera file, and no image ever has to leave your device to be resized by a server.',
  ],
}

export const FAQS: FAQ[] = [
  {
    question: 'Is my image uploaded to a server when I crop it?',
    answer:
      'No. Every crop runs on your device using the browser\'s Canvas API. The image is read from your file system into memory, cropped, and offered back to you as a download — it is never transmitted anywhere.',
  },
  {
    question: 'Will my cropped photo be the exact size a portal requires?',
    answer:
      'Yes, for every preset in the Government, Social Media and Developer categories. Presetly automatically resizes the final crop to the exact pixel dimensions of that preset (for example 600×600 px for Passport, or 1280×720 px for a YouTube Thumbnail), regardless of how much of the original photo you selected.',
  },
  {
    question: 'What is the difference between a preset crop and the Custom category?',
    answer:
      'Presets lock the crop box to a fixed ratio and resize the output to an exact pixel size automatically. Custom crops let you pick a common ratio (square, 4:3, 16:9…), type your own ratio, or crop completely free-form — the output keeps whatever resolution you selected, with no forced resize.',
  },
  {
    question: 'Can I rotate or flip an image before cropping?',
    answer:
      'Yes. Open "Advanced options" below the crop area to rotate in either direction, flip horizontally or vertically, or drag the rotation slider for fine adjustments — all before you tap Crop.',
  },
  {
    question: 'Which file formats are supported?',
    answer:
      'You can upload JPEG, PNG or WebP images up to 20 MB. The cropped result can be downloaded as JPEG, PNG or WEBP — choose the output format under "Advanced options".',
  },
  {
    question: 'Does this image cropper work on mobile phones?',
    answer:
      'Yes. It is built mobile-first with large touch targets, pinch-to-zoom, and drag-to-pan, and works in Chrome, Safari, Firefox and Edge on both Android and iOS.',
  },
  {
    question: 'Is the Image Cropper free to use?',
    answer:
      'Completely free, with no sign-up, no watermark, and no limit on the number of images you crop. Because processing happens on your device, it costs nothing to run.',
  },
]
