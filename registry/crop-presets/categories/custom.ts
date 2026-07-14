import type { CropPreset } from '../schema'

// Custom category — the only place users see raw aspect-ratio controls.
// `aspect: null` on 'custom-free' means the crop box is fully free-form.
// No preset here forces an outputWidth/outputHeight: the crop is exported at
// whatever resolution the user's selection naturally covers, since "exact
// pixels" isn't a meaningful goal for a free-form crop.

export const customCropPresets: CropPreset[] = [
  {
    id: 'custom-free',
    category: 'custom',
    name: 'Free crop',
    description: 'Drag any shape — no aspect ratio lock',
    aspect: null,
    format: 'jpeg',
  },
  {
    id: 'custom-square',
    category: 'custom',
    name: 'Square',
    description: '1:1 ratio',
    aspect: 1,
    format: 'jpeg',
  },
  {
    id: 'custom-4-3',
    category: 'custom',
    name: 'Standard',
    description: '4:3 ratio',
    aspect: 4 / 3,
    format: 'jpeg',
  },
  {
    id: 'custom-3-2',
    category: 'custom',
    name: 'Photo',
    description: '3:2 ratio',
    aspect: 3 / 2,
    format: 'jpeg',
  },
  {
    id: 'custom-16-9',
    category: 'custom',
    name: 'Widescreen',
    description: '16:9 ratio',
    aspect: 16 / 9,
    format: 'jpeg',
  },
  {
    id: 'custom-9-16',
    category: 'custom',
    name: 'Portrait',
    description: '9:16 ratio',
    aspect: 9 / 16,
    format: 'jpeg',
  },
]

// Sentinel id — selecting this preset switches the UI into "type your own
// ratio" mode (two number inputs), handled entirely client-side since a
// user-typed ratio isn't a fixed registry value.
export const CUSTOM_RATIO_SENTINEL_ID = 'custom-ratio-input'
