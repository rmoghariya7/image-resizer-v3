import type { ToolKey, PresetKey } from '@/types/registry'

interface Props {
  toolKey: ToolKey
  presetKey: PresetKey
}

export function ToolPlaceholder({ toolKey, presetKey }: Props) {
  return (
    <section aria-label="Upload tool" className="bg-gray-50 px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <div
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white px-8 py-16 text-center shadow-sm"
          data-tool={toolKey}
          data-preset={presetKey}
        >
          {/* Upload icon */}
          <div
            aria-hidden="true"
            className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-7 w-7 text-indigo-500"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>

          <p className="text-base font-medium text-gray-900">Drop your file here</p>
          <p className="mt-1 text-sm text-gray-500">or click to select from your device</p>

          <p className="mt-3 text-xs text-gray-400">JPEG, PNG, WebP &bull; Max 20 MB</p>

          <button
            type="button"
            disabled
            className="mt-6 inline-flex items-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white opacity-60 cursor-not-allowed"
            aria-label="Select file to upload"
          >
            Select file
          </button>

          <p className="mt-4 text-xs text-gray-400">
            Your file is processed entirely in your browser — nothing is uploaded to any server.
          </p>
        </div>
      </div>
    </section>
  )
}
