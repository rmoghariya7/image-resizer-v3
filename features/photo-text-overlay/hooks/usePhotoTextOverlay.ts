'use client'

import { useCallback, useEffect, useState } from 'react'
import { DEFAULT_DATE_FORMAT } from '@/registry/text-overlay-presets'
import { composeFooterImage } from '../lib/canvas-utils'
import { trackTextOverlayEvent } from '../lib/analytics'
import {
  DEFAULT_NAME_SETTINGS,
  DEFAULT_DATE_SETTINGS_BASE,
  DEFAULT_FOOTER_SETTINGS,
} from '../types'
import type {
  FooterToolState,
  NameSettings,
  DateSettings,
  FooterSettings,
  OutputFormat,
  OriginalImage,
} from '../types'

export interface UsePhotoTextOverlayReturn {
  state: FooterToolState
  nameSettings: NameSettings
  dateSettings: DateSettings
  footerSettings: FooterSettings
  outputFormat: OutputFormat
  loadFile: (file: File) => void
  updateNameSettings: (partial: Partial<NameSettings>) => void
  updateDateSettings: (partial: Partial<DateSettings>) => void
  updateFooterSettings: (partial: Partial<FooterSettings>) => void
  setOutputFormat: (format: OutputFormat) => void
  generate: () => Promise<void>
  reset: () => void
  makeAnother: () => void
}

export function usePhotoTextOverlay(): UsePhotoTextOverlayReturn {
  const [state, setState] = useState<FooterToolState>({ status: 'idle' })
  const [nameSettings, setNameSettings] = useState<NameSettings>(DEFAULT_NAME_SETTINGS)
  const [dateSettings, setDateSettings] = useState<DateSettings>({
    ...DEFAULT_DATE_SETTINGS_BASE,
    dateFormat: DEFAULT_DATE_FORMAT,
  })
  const [footerSettings, setFooterSettings] = useState<FooterSettings>(DEFAULT_FOOTER_SETTINGS)
  const [outputFormat, setOutputFormatState] = useState<OutputFormat>('jpeg')

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
      trackTextOverlayEvent('text_overlay_upload', {
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

  const updateNameSettings = useCallback((partial: Partial<NameSettings>) => {
    setNameSettings((prev) => ({ ...prev, ...partial }))
    if (partial.enabled !== undefined) {
      trackTextOverlayEvent('text_overlay_name_toggled', { enabled: partial.enabled })
    }
  }, [])

  const updateDateSettings = useCallback((partial: Partial<DateSettings>) => {
    setDateSettings((prev) => ({ ...prev, ...partial }))
    if (partial.enabled !== undefined) {
      trackTextOverlayEvent('text_overlay_date_toggled', { enabled: partial.enabled })
    }
  }, [])

  const updateFooterSettings = useCallback((partial: Partial<FooterSettings>) => {
    setFooterSettings((prev) => ({ ...prev, ...partial }))
  }, [])

  const setOutputFormat = useCallback((format: OutputFormat) => {
    setOutputFormatState(format)
  }, [])

  const generate = useCallback(async () => {
    if (state.status !== 'ready') return
    const { original } = state
    setState({ status: 'processing', original })

    try {
      const blob = await composeFooterImage(
        original.objectUrl,
        nameSettings,
        dateSettings,
        footerSettings,
        outputFormat,
      )
      const objectUrl = URL.createObjectURL(blob)
      const ext = outputFormat === 'jpeg' ? 'jpg' : outputFormat
      const filename = `photo-with-footer.${ext}`

      // Read back the actual encoded image dimensions (the footer can grow
      // the canvas taller than footerSettings.heightPx alone would suggest,
      // e.g. when Name + Date are stacked).
      const encoded = await createImageBitmap(blob)
      const width = encoded.width
      const height = encoded.height
      encoded.close()

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
      trackTextOverlayEvent('text_overlay_completed', {
        nameEnabled: nameSettings.enabled,
        dateEnabled: dateSettings.enabled,
        format: outputFormat,
      })
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Something went wrong while generating the footer. Please try again.'
      setState({ status: 'error', message })
      trackTextOverlayEvent('text_overlay_error', { message })
    }
  }, [state, nameSettings, dateSettings, footerSettings, outputFormat])

  const reset = useCallback(() => {
    if (state.status === 'ready' || state.status === 'processing' || state.status === 'done') {
      URL.revokeObjectURL(state.original.objectUrl)
    }
    if (state.status === 'done') URL.revokeObjectURL(state.result.objectUrl)
    setState({ status: 'idle' })
    trackTextOverlayEvent('text_overlay_reset')
  }, [state])

  // Same as reset, but framed as "generate another" for the result screen CTA.
  const makeAnother = useCallback(() => {
    if (state.status === 'done') {
      URL.revokeObjectURL(state.original.objectUrl)
      URL.revokeObjectURL(state.result.objectUrl)
    }
    setState({ status: 'idle' })
  }, [state])

  return {
    state,
    nameSettings,
    dateSettings,
    footerSettings,
    outputFormat,
    loadFile,
    updateNameSettings,
    updateDateSettings,
    updateFooterSettings,
    setOutputFormat,
    generate,
    reset,
    makeAnother,
  }
}
