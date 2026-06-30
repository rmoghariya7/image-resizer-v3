'use client'

import dynamic from 'next/dynamic'
import type { CompressPresetKey } from '@/registry/presets/schema'

const SizeFirstToolComponent = dynamic(
  () =>
    import('@/features/image-resizer/components/SizeFirstTool').then(m => ({
      default: m.SizeFirstTool,
    })),
  { loading: () => <ToolSkeleton />, ssr: false },
)

interface Props {
  defaultPresetKey: CompressPresetKey
}

export function SizeToolSection({ defaultPresetKey }: Props) {
  return <SizeFirstToolComponent defaultPresetKey={defaultPresetKey} />
}

function ToolSkeleton() {
  return (
    <section aria-label="Loading tool" className="bg-gray-50 px-4 py-12 sm:px-6 sm:py-16">
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
