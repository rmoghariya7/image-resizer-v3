'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

const SizeFirstToolComponent = dynamic(
  () => import('@/features/image-resizer/components/SizeFirstTool').then(m => ({ default: m.SizeFirstTool })),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { loading: (props: any) => (props?.error ? <ToolError /> : <ToolSkeleton />), ssr: false },
)

export function CompressImageSection() {
  const [mounted, setMounted] = useState(false)
  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional one-shot mount gate; see ToolSection.tsx for the hydration rationale
  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return <ToolSkeleton />

  // Defaults to the most-searched 50 KB target (Aadhaar / PAN / Voter ID) —
  // the size picker lets the user change it instantly, before or after upload.
  return <SizeFirstToolComponent defaultPresetKey="compress-50kb" />
}

function ToolSkeleton() {
  return (
    <section aria-label="Loading tool" className="bg-gray-50 px-4 py-4 sm:px-6 md:py-10">
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white px-6 py-8 text-center shadow-sm md:py-12">
          <div className="mb-3 h-12 w-12 animate-pulse rounded-full bg-gray-200" />
          <div className="h-5 w-44 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-4 w-56 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 md:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-gray-200" />
          ))}
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
