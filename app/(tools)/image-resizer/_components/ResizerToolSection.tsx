'use client'

import dynamic from 'next/dynamic'
import { useSyncExternalStore } from 'react'
import type { ResultScreenRecommendations } from '@/lib/recommendations/engine'

// `ssr: false` — the tool uses browser-only APIs (Worker, createImageBitmap,
// OffscreenCanvas). A skeleton renders while the module chunk loads; import
// failures surface an actionable error instead of a perpetual skeleton.
const CustomResizeToolComponent = dynamic(
  () =>
    import('@/features/image-resizer/components/resize/CustomResizeTool').then(
      m => ({ default: m.CustomResizeTool }),
    ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { loading: (props: any) => (props?.error ? <ToolError /> : <ToolSkeleton />), ssr: false },
)

interface Props {
  /** Server-computed recommendations shown after a successful resize. */
  recommendations?: ResultScreenRecommendations
}

// Hydration-safe mount gate. The server HTML always shows the skeleton; the
// dynamic import starts only after hydration completes, so react-loadable's
// subscription can never fire before React is listening (see ToolSection.tsx
// in the goal pages for the full failure-mode explanation).
const emptySubscribe = () => () => {}
function useMounted(): boolean {
  return useSyncExternalStore(emptySubscribe, () => true, () => false)
}

export function ResizerToolSection({ recommendations }: Props) {
  const mounted = useMounted()
  if (!mounted) return <ToolSkeleton />
  return <CustomResizeToolComponent recommendations={recommendations} />
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
