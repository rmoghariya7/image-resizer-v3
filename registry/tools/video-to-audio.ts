import type { ToolDefinition } from '@/registry/tools/schema'

export const videoToAudioTool = {
  key: 'video-to-audio',
  name: 'Video to Audio Extractor',
  description:
    'Extracts MP3, WAV, AAC, OGG or FLAC audio from any video. ' +
    'FFmpeg runs in a Web Worker inside your browser — the video never leaves your device.',
  route: '/video-to-audio',
  featurePath: 'features/video-to-audio',
  componentName: 'VideoToAudioTool',
  processor: 'wasm',
  acceptedFormats: [
    'video/mp4',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-matroska',
    'video/webm',
    'video/x-m4v',
  ],
  maxFileSizeMB: 512,
  maxBatchSize: 1,
  capabilities: ['extract-audio', 'convert'],
} satisfies ToolDefinition
