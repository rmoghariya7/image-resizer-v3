'use client'

import { useEffect, useRef, useState } from 'react'
import { getDateDisplayText } from '../lib/text-builder'
import {
  scaleFactorFor,
  resolveFooterLayoutMode,
  computeFooterHeight,
  FOOTER_PADDING_X_DESIGN_PX,
  FOOTER_VERTICAL_PADDING_DESIGN_PX,
  FOOTER_LINE_GAP_DESIGN_PX,
} from '../lib/canvas-utils'
import type { NameSettings, DateSettings, FooterSettings } from '../types'

interface Props {
  imageSrc: string
  nameSettings: NameSettings
  dateSettings: DateSettings
  footerSettings: FooterSettings
}

/**
 * Live preview — the uploaded photo, completely untouched, with a real DOM
 * footer band rendered BELOW it (never on top of it). Uses the exact same
 * resolveFooterLayoutMode/computeFooterHeight rules as the canvas exporter
 * (lib/canvas-utils.ts) so the preview and the downloaded image always match.
 */
export function FooterPreviewStage({ imageSrc, nameSettings, dateSettings, footerSettings }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [renderedWidth, setRenderedWidth] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) setRenderedWidth(entry.contentRect.width)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const scale = renderedWidth > 0 ? scaleFactorFor(renderedWidth) : 0

  const nameText = nameSettings.enabled ? nameSettings.text.trim() : ''
  const dateText = dateSettings.enabled ? getDateDisplayText(dateSettings) : ''
  const nameActive = nameText.length > 0
  const dateActive = dateText.length > 0

  const mode = resolveFooterLayoutMode(
    nameActive,
    nameSettings.alignment,
    dateActive,
    dateSettings.alignment,
  )

  const nameFontSize = nameSettings.fontSizePx * scale
  const dateFontSize = dateSettings.fontSizePx * scale
  const lineGap = FOOTER_LINE_GAP_DESIGN_PX * scale
  const verticalPadding = FOOTER_VERTICAL_PADDING_DESIGN_PX * scale
  const paddingX = FOOTER_PADDING_X_DESIGN_PX * scale

  const footerHeight = computeFooterHeight(
    mode,
    footerSettings.heightPx * scale,
    nameFontSize,
    dateFontSize,
    lineGap,
    verticalPadding,
  )

  const textStyleBase = {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontWeight: 600,
    color: footerSettings.textColor,
  }

  return (
    <div ref={containerRef} className="overflow-hidden rounded-xl border border-border bg-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageSrc} alt="Your photo preview" className="block w-full" />

      {mode !== 'empty' && renderedWidth > 0 && (
        <div
          style={{ height: footerHeight, backgroundColor: footerSettings.backgroundColor }}
          className="flex w-full items-center px-0"
        >
          {mode === 'name-only' && (
            <span
              style={{ ...textStyleBase, fontSize: nameFontSize, width: '100%', textAlign: nameSettings.alignment, padding: `0 ${paddingX}px` }}
            >
              {nameText}
            </span>
          )}

          {mode === 'date-only' && (
            <span
              style={{ ...textStyleBase, fontSize: dateFontSize, width: '100%', textAlign: dateSettings.alignment, padding: `0 ${paddingX}px` }}
            >
              {dateText}
            </span>
          )}

          {mode === 'row' && (
            <div className="grid w-full grid-cols-3 items-center" style={{ padding: `0 ${paddingX}px` }}>
              <span style={{ ...textStyleBase, fontSize: nameFontSize, gridColumn: gridColumnFor(nameSettings.alignment), justifySelf: nameSettings.alignment }}>
                {nameText}
              </span>
              <span style={{ ...textStyleBase, fontSize: dateFontSize, gridColumn: gridColumnFor(dateSettings.alignment), justifySelf: dateSettings.alignment }}>
                {dateText}
              </span>
            </div>
          )}

          {mode === 'stacked' && (
            <div
              className="flex w-full flex-col"
              style={{
                gap: lineGap,
                alignItems: nameSettings.alignment === 'left' ? 'flex-start' : nameSettings.alignment === 'right' ? 'flex-end' : 'center',
                padding: `0 ${paddingX}px`,
              }}
            >
              <span style={{ ...textStyleBase, fontSize: nameFontSize, textAlign: nameSettings.alignment }}>{nameText}</span>
              <span style={{ ...textStyleBase, fontSize: dateFontSize, textAlign: nameSettings.alignment }}>{dateText}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function gridColumnFor(alignment: 'left' | 'center' | 'right'): string {
  if (alignment === 'left') return '1'
  if (alignment === 'center') return '2'
  return '3'
}
