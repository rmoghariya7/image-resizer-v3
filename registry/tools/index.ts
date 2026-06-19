import { type ToolDefinition, type ToolKey } from '@/registry/tools/schema'
import { imageResizerTool } from './image-resizer'
import { pdfCompressorTool } from './pdf-compressor'
import { passportPhotoTool } from './passport-photo'

// ─── Registry map ─────────────────────────────────────────────────────────────

const ALL_TOOLS: readonly ToolDefinition[] = Object.freeze([
  imageResizerTool,
  pdfCompressorTool,
  passportPhotoTool,
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
