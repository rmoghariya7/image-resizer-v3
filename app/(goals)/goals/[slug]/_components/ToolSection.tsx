'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import type { Preset, ToolKey } from '@/types/registry'
import type { ResultScreenRecommendations } from '@/lib/recommendations/engine'

// `ssr: false` — tool uses browser-only APIs (Worker, createImageBitmap, OffscreenCanvas).
// The loading skeleton is shown client-side while the module chunk loads.
const ImageResizerToolComponent = dynamic(
  () =>
    import('@/features/image-resizer').then(m => ({ default: m.ImageResizerTool })),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { loading: (props: any) => props?.error ? <ToolError /> : <ToolSkeleton />, ssr: false },
)

// Compress presets use SizeFirstTool — shows a size picker so users can
// switch target sizes without navigating away.
const SizeFirstToolComponent = dynamic(
  () =>
    import('@/features/image-resizer/components/SizeFirstTool').then(m => ({
      default: m.SizeFirstTool,
    })),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { loading: (props: any) => props?.error ? <ToolError /> : <ToolSkeleton />, ssr: false },
)

interface Props {
  toolKey: ToolKey
  preset: Preset
  /** Server-computed recommendations shown after a successful compression. */
  recommendations?: ResultScreenRecommendations
}

export function ToolSection({ toolKey, preset, recommendations }: Props) {
  // Gate behind client mount — see app/(goals)/[slug]/_components/ToolSection.tsx
  // for the full explanation of why this is needed.
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return <ToolSkeleton />

  switch (toolKey) {
    case 'image-resizer':
      if (preset.kind === 'compress') {
        return <SizeFirstToolComponent defaultPresetKey={preset.key} />
      }
      return <ImageResizerToolComponent preset={preset} recommendations={recommendations} />
    default:
      return <ToolComingSoon />
  }
}

function ToolSkeleton() {
  return (
    <section aria-label="Loading tool" className="bg-gray-50 px-4 py-6 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white px-8 py-16 text-center shadow-sm">
          <div className="mb-5 h-14 w-14 animate-pulse rounded-full bg-gray-200" />
          <div className="h-5 w-48 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-4 w-56 animate-pulse rounded bg-gray-200" />
          <div className="mt-6 flex gap-3">
            <div className="h-10 w-28 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>
    </section>
  )
}

function ToolError() {
  return (
    <section aria-label="Tool failed to load" className="bg-gray-50 px-4 py-6 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-red-200 bg-white px-8 py-16 text-center shadow-sm">
          <p className="text-sm font-medium text-red-600">Failed to load the tool.</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
          >
            Reload page
          </button>
        </div>
      </div>
    </section>
  )
}

function ToolComingSoon() {
  return (
    <section aria-label="Tool not yet available" className="bg-gray-50 px-4 py-6 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white px-8 py-16 text-center shadow-sm">
          <p className="text-sm font-medium text-gray-500">This tool is coming soon.</p>
        </div>
      </div>
    </section>
  )
}
