'use client'

interface Props {
  progress: number
}

export function ProcessingOverlay({ progress }: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Processing image: ${progress}%`}
      className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-white/90 backdrop-blur-sm"
    >
      {/* Spinner */}
      <svg
        className="mb-4 h-10 w-10 animate-spin text-indigo-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>

      <p className="text-sm font-medium text-gray-700">Processing your image…</p>

      {/* Progress bar */}
      <div
        className="mt-3 h-1.5 w-48 overflow-hidden rounded-full bg-gray-200"
        aria-hidden="true"
      >
        <div
          className="h-full rounded-full bg-indigo-500 transition-all duration-300 ease-out"
          style={{ width: `${Math.max(2, progress)}%` }}
        />
      </div>

      <p className="mt-2 text-xs tabular-nums text-gray-400">{progress}%</p>
    </div>
  )
}
