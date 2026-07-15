'use client'

import { useId, useState } from 'react'

interface Props {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
}

/**
 * Before/After comparison slider. A native `<input type="range">` drives the
 * divider position — dragging, arrow-key nudging, Home/End, and touch all
 * come for free from the browser, and it reads out correctly to screen
 * readers as a standard slider control (no custom pointer-event reinvention).
 *
 * The "after" image sits behind at full size; the "before" image sits on top,
 * clipped to the slider position so it only reveals the left portion.
 */
export function CompareSlider({ beforeSrc, afterSrc, beforeAlt, afterAlt }: Props) {
  const [position, setPosition] = useState(50)
  const labelId = useId()

  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-[repeating-conic-gradient(#f3f4f6_0%_25%,white_0%_50%)] bg-size-[16px_16px] shadow-sm select-none">
      <p id={labelId} className="sr-only">
        Comparison slider — drag to reveal the original photo behind the background-removed result
      </p>

      {/* After — full image, bottom layer */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={afterSrc}
        alt={afterAlt}
        className="block h-64 w-full object-contain sm:h-80"
        draggable={false}
      />

      {/* Before — clipped overlay, top layer */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={beforeSrc}
          alt={beforeAlt}
          className="block h-64 w-full bg-white object-contain sm:h-80"
          draggable={false}
        />
      </div>

      {/* Divider line + handle (decorative — the range input below is the real control) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-500 shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" transform="translate(-3, 0)" />
            <polyline points="9 18 15 12 9 6" transform="translate(3, 0)" />
          </svg>
        </div>
      </div>

      {/* Before / After tags */}
      <div className="pointer-events-none absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
        Before
      </div>
      <div className="pointer-events-none absolute right-2 top-2 rounded-full bg-indigo-600/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
        After
      </div>

      {/* Real control — transparent full-size range input for drag + keyboard + touch + a11y */}
      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-labelledby={labelId}
        aria-valuetext={`${position}% original, ${100 - position}% result`}
        className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0 focus-visible:opacity-100 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-indigo-600 [&::-webkit-slider-thumb]:bg-white"
      />
    </div>
  )
}
