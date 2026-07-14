'use client'

import Cropper from 'react-easy-crop'
import { RotateCcw } from 'lucide-react'
import type { CropArea, CropTransform } from '../types'

// react-easy-crop touches the DOM (ResizeObserver, pointer/touch events) on
// mount. A plain import is safe here: CropStage is only ever rendered inside
// ImageCropperTool, which the page loads via next/dynamic with `ssr: false`
// one level up (see app/(goals)/crop-image/_components/CropImageSection.tsx)
// — so this module is never evaluated during SSR or the production build.

interface Props {
  imageSrc: string
  /** Always a concrete number — the parent resolves "free crop" to the image's own ratio. */
  aspect: number
  transform: CropTransform
  onCropChange: (crop: { x: number; y: number }) => void
  onZoomChange: (zoom: number) => void
  onCropComplete: (area: CropArea, pixelArea: CropArea) => void
  onReset: () => void
  disabled?: boolean
}

const MIN_ZOOM = 1
const MAX_ZOOM = 5

/**
 * The interactive crop canvas. Supports drag-to-pan, pinch-to-zoom, mouse
 * wheel zoom and a zoom slider out of the box via react-easy-crop; rotation
 * is applied through the `transform.rotation`/flip values (see
 * AdvancedPanel) and re-rendered live on the same canvas.
 */
export function CropStage({
  imageSrc,
  aspect,
  transform,
  onCropChange,
  onZoomChange,
  onCropComplete,
  onReset,
  disabled = false,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      {/* Cropper canvas */}
      <div className="relative h-72 w-full bg-neutral-900 sm:h-96">
        <Cropper
          image={imageSrc}
          crop={transform.crop}
          zoom={transform.zoom}
          rotation={transform.rotation}
          aspect={aspect}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
          showGrid
          zoomWithScroll
          restrictPosition
          objectFit="contain"
          style={{
            containerStyle: {
              transform: [
                transform.flipHorizontal ? 'scaleX(-1)' : '',
                transform.flipVertical ? 'scaleY(-1)' : '',
              ]
                .filter(Boolean)
                .join(' '),
            },
          }}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropComplete}
        />
      </div>

      {/* Zoom slider + reset — always visible, no scrolling required */}
      <div className="flex items-center gap-3 border-t border-border/60 px-4 py-3 sm:px-5">
        <span className="text-xs font-medium text-muted-foreground" aria-hidden="true">
          −
        </span>
        <input
          type="range"
          min={MIN_ZOOM}
          max={MAX_ZOOM}
          step={0.01}
          value={transform.zoom}
          disabled={disabled}
          onChange={(e) => onZoomChange(Number(e.target.value))}
          aria-label="Zoom"
          className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-muted accent-primary disabled:cursor-not-allowed disabled:opacity-50"
        />
        <span className="text-sm font-medium text-muted-foreground" aria-hidden="true">
          +
        </span>

        <button
          type="button"
          disabled={disabled}
          onClick={onReset}
          aria-label="Reset crop, zoom and rotation"
          className="ml-1 inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50"
        >
          <RotateCcw size={13} aria-hidden="true" />
          Reset
        </button>
      </div>
    </div>
  )
}
