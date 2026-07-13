import type { FAQ, HowItWorksStep } from '@/types/registry'

// Page content for /video-to-audio. Standalone tools live outside the goal
// registry, so their copy is co-located with the route instead of a goal file.

export const PAGE_TITLE = 'Video to Audio Extractor'
export const SEO_TITLE = 'Video to Audio Converter Online Free | Presetly'
export const DESCRIPTION =
  'Extract MP3, WAV, AAC and other audio formats from videos directly in your browser. ' +
  'Free, private and fast — your video never leaves your device.'

export const HOW_IT_WORKS: HowItWorksStep[] = [
  {
    title: 'Upload your video',
    body: 'Drop in any MP4, MOV, AVI, MKV, WEBM or M4V file. It is opened locally — nothing is uploaded to a server.',
  },
  {
    title: 'Choose an audio format',
    body: 'MP3 is pre-selected as the best all-rounder. Pick WAV or FLAC for lossless quality, AAC for Apple devices, or OGG for the web.',
  },
  {
    title: 'Extract',
    body: 'A WebAssembly build of FFmpeg runs in a background worker inside your browser and copies the audio out of the video.',
  },
  {
    title: 'Download',
    body: 'Preview the audio right on the page, then save it. Tap "Process another video" to convert the next file instantly.',
  },
]

export const SUPPORTED_INPUTS = [
  { format: 'MP4', note: 'The most common video format — phones, cameras, WhatsApp' },
  { format: 'MOV', note: 'iPhone and Mac recordings' },
  { format: 'AVI', note: 'Older Windows recordings' },
  { format: 'MKV', note: 'Screen recordings, downloads' },
  { format: 'WEBM', note: 'Browser and screen-capture recordings' },
  { format: 'M4V', note: 'Apple video files' },
]

export const SUPPORTED_OUTPUTS = [
  { format: 'MP3', note: 'Smallest files, plays everywhere — the default choice' },
  { format: 'WAV', note: 'Uncompressed, highest quality, large files' },
  { format: 'AAC (M4A)', note: 'Great quality at small sizes, native on Apple devices' },
  { format: 'OGG', note: 'Open format, ideal for web projects and games' },
  { format: 'FLAC', note: 'Lossless compression for archiving and editing' },
]

export const FAQS: FAQ[] = [
  {
    question: 'Is my video uploaded to a server?',
    answer:
      'No. The extraction runs entirely inside your browser using a WebAssembly build of FFmpeg. Your video is opened from your device, processed in memory, and never transmitted anywhere — it works even if you go offline after the page loads.',
  },
  {
    question: 'Which audio format should I choose?',
    answer:
      'MP3 is the safe default — it gives the smallest files and plays on every device and app. Choose WAV or FLAC if you plan to edit the audio afterwards, AAC for Apple devices and video editing, or OGG for websites and games.',
  },
  {
    question: 'Is this video to audio converter really free?',
    answer:
      'Yes, completely free with no sign-up, no watermarks and no limits on the number of videos. Because the processing happens on your device, it costs us nothing to run each conversion.',
  },
  {
    question: 'Why does the first extraction take a moment to start?',
    answer:
      'The first time you extract audio, your browser downloads the FFmpeg audio engine (about 31 MB) once. It is cached after that, so every later extraction starts instantly.',
  },
  {
    question: 'How long can my video be?',
    answer:
      'There is no duration limit — the limit is file size, up to 512 MB per video. Longer videos simply take a little more time to process, since everything runs on your own device.',
  },
  {
    question: 'Does this work on mobile phones?',
    answer:
      'Yes. The extractor is designed mobile-first and works in Chrome, Safari, Firefox and Edge on both Android and iOS. On very old phones with limited memory, prefer smaller video files.',
  },
]
