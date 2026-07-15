'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

// `ssr: false` — the tool uses browser-only APIs (Web Worker, WebAssembly,
// OffscreenCanvas, URL.createObjectURL). The skeleton renders while the
// module chunk loads. onnxruntime-web and the AI model are NOT in this
// chunk — they're fetched only when a photo is uploaded (see
// features/background-remover/lib/model-loader.ts).
const BackgroundRemoverToolComponent = dynamic(
  () =>
    import('@/features/background-remover').then(m => ({ default: m.BackgroundRemoverTool })),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { loading: (props: any) => props?.error ? <ToolError /> : <ToolSkeleton />, ssr: false },
)

export function BackgroundRemoverSection() {
  // Gate the dynamic import behind client mount — same React 19 hydration
  // workaround as ToolSection.tsx / VideoToAudioSection.tsx: rendering the
  // skeleton until useEffect fires keeps server HTML and hydration in sync,
  // then starts the import from a committed client render.
  const [mounted, setMounted] = useState(false)
  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional one-shot mount gate; see ToolSection.tsx for the hydration rationale
  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return <ToolSkeleton />

  return <BackgroundRemoverToolComponent />
}

function ToolSkeleton() {
  return (
    <section aria-label="Loading tool" className="bg-gray-50 px-4 py-4 sm:px-6 md:py-10">
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white px-6 py-8 text-center shadow-sm md:py-12">
          <div className="mb-3 h-12 w-12 animate-pulse rounded-full bg-gray-200" />
          <div className="h-5 w-44 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-4 w-56 animate-pulse rounded bg-gray-200" />
          <div className="mt-5 h-10 w-32 animate-pulse rounded-lg bg-gray-200" />
        </div>
      </div>
    </section>
  )
}

function ToolError() {
  return (
    <section aria-label="Tool failed to load" className="bg-gray-50 px-4 py-4 sm:px-6 md:py-10">
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
