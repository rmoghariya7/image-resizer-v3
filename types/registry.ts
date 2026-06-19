// ─── Registry type barrel ─────────────────────────────────────────────────────
// Single import point for all registry types.
// Import from this file in app/ and features/ code.
//
// Data-layer helpers (getGoal, getAllGoals, etc.) are imported directly from
// the registry index files, not re-exported here, to keep bundle-splitting clean.

// Preset types
export type {
  ImagePresetKey,
  CompressPresetKey,
  PresetKey,
  ImagePreset,
  CompressPreset,
  Preset,
} from '@/registry/presets/schema'

export {
  IMAGE_PRESET_KEYS,
  COMPRESS_PRESET_KEYS,
  isImagePreset,
  isCompressPreset,
} from '@/registry/presets/schema'

// Tool types
export type {
  ToolKey,
  ProcessorType,
  ToolCapability,
  MimeType,
  ToolDefinition,
} from '@/registry/tools/schema'

export { TOOL_KEYS } from '@/registry/tools/schema'

// Goal types
export type {
  GoalCategory,
  GoalPriority,
  GoalStatus,
  FAQ,
  HowItWorksStep,
  GoalDefinition,
} from '@/registry/goals/schema'

export { GOAL_CATEGORIES } from '@/registry/goals/schema'

// Category types
export type {
  SubcategoryDefinition,
  CategoryDefinition,
} from '@/registry/categories/schema'
