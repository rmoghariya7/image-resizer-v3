import type { ToolDefinition } from '@/registry/tools/schema'

// Renamed from `photo-date-stamp` for SEO: the top-ranking competitors for
// this tool (Pi7, WebUtility.io, Pixellize.io, Pokecut) all use the
// exact-match URL slug `add-name-and-date-on-photo` for the query
// "add name and date to photo" — see app/(goals)/add-name-and-date-on-photo/content.ts.
export const addNameAndDateOnPhotoTool = {
  key: 'add-name-and-date-on-photo',
  name: 'Add Name & Date to Photo',
  description:
    "Add your name and today's date to any photo online, free and instantly — perfect for " +
    'passport photos, ID cards and exam uploads. All processing runs in the browser, nothing is uploaded.',
  route: '/add-name-and-date-on-photo',
  featurePath: 'features/photo-text-overlay',
  componentName: 'PhotoTextOverlayTool',
  processor: 'canvas',
  acceptedFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
  maxFileSizeMB: 20,
  maxBatchSize: 1,
  capabilities: ['annotate', 'convert'],
  platformCategory: 'image',
  status: 'active',
  addedDate: '2026-07-14',
} satisfies ToolDefinition
