'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { Area } from 'react-easy-crop'
import {
  getCropPreset,
  DEFAULT_CROP_PRESET_ID,
  CUSTOM_RATIO_SENTINEL_ID,
  type CropOutputFormat,
} from '@/registry/crop-presets'
import { getCroppedImg, parseCustomRatio } from '../lib/canvas-utils'
import { trackCropEvent } from '../lib/analytics'
import { DEFAULT_TRANSFORM } from '../types'
import type { CropperState, CropTransform, OriginalImage } from '../types'

export interface UseImageCropperReturn {
  state: CropperState
  presetId: string
  presetName: string
  presetDescription: string
  /** Effective aspect ratio the crop box should lock to — null means free-form. */
  effectiveAspect: number | null
  transform: CropTransform
  customRatioInput: string
  outputFormat: CropOutputFormat
  loadFile: (file: File) => void
  selectPreset: (id: string) => void
  setCustomRatioInput: (raw: string) => void
  setOutputFormat: (format: CropOutputFormat) => void
  updateTransform: (partial: Partial<CropTransform>) => void
  onCropComplete: (_area: Area, pixelCrop: Area) => void
  crop: () => Promise<void>
  reset: () => void
  cropAnother: () => void
}

export function useImageCropper(): UseImageCropperReturn {
  const [state, setState] = useState<CropperState>({ status: 'idle' })
  const [presetId, setPresetId] = useState<string>(DEFAULT_CROP_PRESET_ID)
  const [transform, setTransform] = useState<CropTransform>(DEFAULT_TRANSFORM)
  const [customRatioInput, setCustomRatioInputState] = useState('1:1')
  const [formatOverride, setFormatOverride] = useState<CropOutputFormat | null>(null)
  const pixelCropRef = useRef<Area | null>(null)

  const preset = getCropPreset(presetId) ?? getCropPreset(DEFAULT_CROP_PRESET_ID)!
  const isCustomRatioMode = presetId === CUSTOM_RATIO_SENTINEL_ID
  const effectiveAspect = isCustomRatioMode
    ? parseCustomRatio(customRatioInput) ?? 1
    : preset.aspect
  const outputFormat = formatOverride ?? preset.format

  // Revoke every object URL we create on unmount.
  useEffect(() => {
    return () => {
      if (state.status === 'ready' || state.status === 'processing' || state.status === 'done') {
        URL.revokeObjectURL(state.original.objectUrl)
      }
      if (state.status === 'done') URL.revokeObjectURL(state.result.objectUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- cleanup-only effect, intentionally runs once
  }, [])

  const loadFile = useCallback((file: File) => {
    const objectUrl = URL.createObjectURL(file)
    const img = new window.Image()
    img.onload = () => {
      const original: OriginalImage = {
        file,
        objectUrl,
        width: img.naturalWidth,
        height: img.naturalHeight,
        sizeKB: Math.round((file.size / 1024) * 10) / 10,
      }
      setState({ status: 'ready', original })
      setTransform(DEFAULT_TRANSFORM)
      pixelCropRef.current = null
      trackCropEvent('crop_image_upload', {
        fileSizeKB: original.sizeKB,
        width: original.width,
        height: original.height,
      })
    }
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      setState({ status: 'error', message: 'Could not read this image. Please try a different file.' })
    }
    img.src = objectUrl
  }, [])

  const selectPreset = useCallback((id: string) => {
    setPresetId(id)
    setTransform(DEFAULT_TRANSFORM)
    pixelCropRef.current = null
    setFormatOverride(null)
    trackCropEvent('crop_image_preset_selected', { preset: id })
  }, [])

  const setCustomRatioInput = useCallback((raw: string) => {
    setCustomRatioInputState(raw)
  }, [])

  const setOutputFormat = useCallback((format: CropOutputFormat) => {
    setFormatOverride(format)
  }, [])

  const updateTransform = useCallback((partial: Partial<CropTransform>) => {
    setTransform(t => ({ ...t, ...partial }))
  }, [])

  const onCropComplete = useCallback((_area: Area, pixelCrop: Area) => {
    pixelCropRef.current = pixelCrop
  }, [])

  const crop = useCallback(async () => {
    if (state.status !== 'ready') return
    const pixelCrop = pixelCropRef.current
    if (!pixelCrop) return

    const { original } = state
    setState({ status: 'processing', original })

    try {
      const blob = await getCroppedImg(original.objectUrl, pixelCrop, {
        rotation: transform.rotation,
        flipHorizontal: transform.flipHorizontal,
        flipVertical: transform.flipVertical,
        outputWidth: preset.outputWidth,
        outputHeight: preset.outputHeight,
        format: outputFormat,
        backgroundFill: preset.backgroundFill,
      })

      const objectUrl = URL.createObjectURL(blob)
      const width = preset.outputWidth ?? Math.round(pixelCrop.width)
      const height = preset.outputHeight ?? Math.round(pixelCrop.height)
      const ext = outputFormat === 'jpeg' ? 'jpg' : outputFormat
      const filename = `${preset.id}-cropped.${ext}`

      setState({
        status: 'done',
        original,
        result: {
          blob,
          objectUrl,
          sizeKB: Math.round((blob.size / 1024) * 10) / 10,
          width,
          height,
          filename,
          mimeType: `image/${outputFormat}`,
        },
      })
      trackCropEvent('crop_image_completed', { preset: preset.id, width, height, format: outputFormat })
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Something went wrong while cropping. Please try again.'
      setState({ status: 'error', message })
      trackCropEvent('crop_image_error', { message })
    }
  }, [state, transform, preset, outputFormat])

  const reset = useCallback(() => {
    if (state.status === 'ready' || state.status === 'processing' || state.status === 'done') {
      URL.revokeObjectURL(state.original.objectUrl)
    }
    if (state.status === 'done') URL.revokeObjectURL(state.result.objectUrl)
    setState({ status: 'idle' })
    setTransform(DEFAULT_TRANSFORM)
    pixelCropRef.current = null
    trackCropEvent('crop_image_reset')
  }, [state])

  // Same as reset, but framed as "crop another image" for the result screen CTA —
  // kept as a distinct analytics event so funnels can tell the two apart.
  const cropAnother = useCallback(() => {
    if (state.status === 'done') {
      URL.revokeObjectURL(state.original.objectUrl)
      URL.revokeObjectURL(state.result.objectUrl)
    }
    setState({ status: 'idle' })
    setTransform(DEFAULT_TRANSFORM)
    pixelCropRef.current = null
  }, [state])

  return {
    state,
    presetId,
    presetName: preset.name,
    presetDescription: preset.description,
    effectiveAspect,
    transform,
    customRatioInput,
    outputFormat,
    loadFile,
    selectPreset,
    setCustomRatioInput,
    setOutputFormat,
    updateTransform,
    onCropComplete,
    crop,
    reset,
    cropAnother,
  }
}
