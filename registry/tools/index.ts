import { type ToolDefinition, type ToolKey, type PlatformCategory } from '@/registry/tools/schema'
import { imageResizerTool } from './image-resizer'
import { pdfCompressorTool } from './pdf-compressor'
import { passportPhotoTool } from './passport-photo'
import { videoToAudioTool } from './video-to-audio'
import { imageCropperTool } from './image-cropper'

// ─── Registry map ─────────────────────────────────────────────────────────────

const ALL_TOOLS: readonly ToolDefinition[] = Object.freeze([
  imageResizerTool,
  pdfCompressorTool,
  passportPhotoTool,
  videoToAudioTool,
  imageCropperTool,
])

const TOOL_MAP = new Map<ToolKey, ToolDefinition>(
  ALL_TOOLS.map(t => [t.key, t]),
)

// ─── Registry functions ───────────────────────────────────────────────────────

export function getTool(key: ToolKey): ToolDefinition {
  const tool = TOOL_MAP.get(key)
  if (!tool) {
    throw new Error(`[ToolRegistry] Tool not found: "${key}"`)
  }
  return tool
}

export function getAllTools(): ToolDefinition[] {
  return [...ALL_TOOLS]
}

/** Tools with a working features/<featurePath> implementation — safe to showcase on the homepage. */
export function getActiveTools(): ToolDefinition[] {
  return ALL_TOOLS.filter(t => t.status === 'active')
}

export function getToolsByPlatformCategory(category: PlatformCategory): ToolDefinition[] {
  return ALL_TOOLS.filter(t => t.platformCategory === category)
}

/** Active tools sorted by addedDate, newest first — powers the homepage "Recently Added" section. */
export function getRecentlyAddedTools(count = 6): ToolDefinition[] {
  return getActiveTools()
    .slice()
    .sort((a, b) => (a.addedDate < b.addedDate ? 1 : a.addedDate > b.addedDate ? -1 : 0))
    .slice(0, count)
}
