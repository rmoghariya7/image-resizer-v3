import { getDateDisplayText } from './text-builder'
import type {
  Alignment,
  DateSettings,
  FooterLayoutMode,
  FooterSettings,
  NameSettings,
  OutputFormat,
} from '../types'

// ─── Reference-pixel scaling ──────────────────────────────────────────────────
//
// Every size-like setting (fontSizePx, footer heightPx) is authored against a
// 1000px-wide reference frame, not real pixels. Both the live CSS preview and
// this canvas export multiply those values by (actualWidth / REFERENCE_WIDTH)
// before drawing — so a value like fontSizePx: 28 always looks the same
// *relative to the photo* whether the photo is a 400px thumbnail on a phone
// preview or a 4000px export, and whether the preview happens to be rendered
// smaller or larger on screen.

export const REFERENCE_WIDTH = 1000

// Horizontal inset from the left/right edges, and the gap between two
// stacked lines — both in "design pixels" (see REFERENCE_WIDTH above).
// Exported so the live CSS preview (FooterPreviewStage) uses the exact same
// spacing as the canvas export.
export const FOOTER_PADDING_X_DESIGN_PX = 24
export const FOOTER_VERTICAL_PADDING_DESIGN_PX = 12
export const FOOTER_LINE_GAP_DESIGN_PX = 6

// Frame drawn around the photo + footer, both in the live CSS preview
// (FooterPreviewStage) and baked into the canvas export below — sized as a
// margin around the content (like a CSS border), never overlapping the
// photo's own pixels. A thin light-coloured mat sits outside the border
// itself, mimicking the white paper margin of a printed passport photo.
export const BORDER_WIDTH_DESIGN_PX = 3
export const BORDER_COLOR = '#111827'
export const MARGIN_WIDTH_DESIGN_PX = 2
export const MARGIN_COLOR = '#FFFFFF'

export function scaleFactorFor(actualWidth: number): number {
  return actualWidth / REFERENCE_WIDTH
}

// ─── Smart alignment — the layout decision ───────────────────────────────────
//
// Purely rule-based, no text measurement needed:
//   - Neither enabled            -> no footer at all
//   - Only one enabled           -> single item at its own alignment
//   - Both enabled, alignments differ -> side-by-side in one row, each at its
//     own alignment slot (they can never collide — different slots)
//   - Both enabled, same alignment    -> stacked vertically (Name above Date),
//     never overlapping, at that shared alignment
//
// The live preview (FooterPreviewStage) and this canvas exporter both call
// this so they can never disagree about which layout is shown.

export function resolveFooterLayoutMode(
  nameEnabled: boolean,
  nameAlignment: Alignment,
  dateEnabled: boolean,
  dateAlignment: Alignment,
): FooterLayoutMode {
  if (!nameEnabled && !dateEnabled) return 'empty'
  if (nameEnabled && !dateEnabled) return 'name-only'
  if (!nameEnabled && dateEnabled) return 'date-only'
  return nameAlignment === dateAlignment ? 'stacked' : 'row'
}

/**
 * Resolves the actual footer band height in pixels (already scaled). Grows
 * beyond the configured height only when `mode === 'stacked'` and the two
 * lines wouldn't otherwise fit — this is what guarantees Name and Date can
 * never overlap or clip, regardless of what footer height the user picked.
 * Shared by the canvas exporter and the live CSS preview so both always
 * agree on the footer's actual height.
 */
export function computeFooterHeight(
  mode: FooterLayoutMode,
  configuredHeightActual: number,
  nameFontSizeActual: number,
  dateFontSizeActual: number,
  lineGapActual: number,
  verticalPaddingActual: number,
): number {
  if (mode !== 'stacked') return configuredHeightActual
  const neededHeight = nameFontSizeActual + lineGapActual + dateFontSizeActual + verticalPaddingActual * 2
  return Math.max(configuredHeightActual, neededHeight)
}

// ─── Browser-only image + canvas pipeline ────────────────────────────────────

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.crossOrigin = 'anonymous'
    image.src = url
  })
}

function getCanvasContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas 2D context not available in this browser.')
  return ctx
}

function alignedX(alignment: Alignment, canvasWidth: number, paddingX: number): number {
  if (alignment === 'left') return paddingX
  if (alignment === 'right') return canvasWidth - paddingX
  return canvasWidth / 2
}

/**
 * Draws the source photo onto a canvas UNCHANGED, then extends the canvas
 * downward with a footer band and prints Name and/or Date inside that band
 * only — the photo itself is never drawn on (this is a footer generator, not
 * a watermark/overlay tool). The whole thing (photo + footer) is then matted
 * inside a solid-colour border frame, sized as a margin so it never overlaps
 * the photo's own pixels — the canvas equivalent of the CSS border drawn
 * around FooterPreviewStage's live preview.
 */
export async function composeFooterImage(
  imageSrc: string,
  name: NameSettings,
  date: DateSettings,
  footer: FooterSettings,
  format: OutputFormat,
): Promise<Blob> {
  const image = await createImage(imageSrc)
  const scale = scaleFactorFor(image.naturalWidth)

  const nameText = name.enabled ? name.text.trim() : ''
  const dateText = date.enabled ? getDateDisplayText(date) : ''
  const nameActive = nameText.length > 0
  const dateActive = dateText.length > 0

  const mode = resolveFooterLayoutMode(nameActive, name.alignment, dateActive, date.alignment)

  const paddingX = FOOTER_PADDING_X_DESIGN_PX * scale
  const verticalPadding = FOOTER_VERTICAL_PADDING_DESIGN_PX * scale
  const lineGap = FOOTER_LINE_GAP_DESIGN_PX * scale

  const nameFontSize = name.fontSizePx * scale
  const dateFontSize = date.fontSizePx * scale

  const footerHeight = computeFooterHeight(
    mode,
    footer.heightPx * scale,
    nameFontSize,
    dateFontSize,
    lineGap,
    verticalPadding,
  )

  const hasFooter = mode !== 'empty'
  const borderWidth = BORDER_WIDTH_DESIGN_PX * scale
  const marginWidth = MARGIN_WIDTH_DESIGN_PX * scale
  const frameInset = marginWidth + borderWidth
  const contentWidth = image.naturalWidth
  const contentHeight = image.naturalHeight + (hasFooter ? footerHeight : 0)

  const canvas = document.createElement('canvas')
  canvas.width = contentWidth + frameInset * 2
  canvas.height = contentHeight + frameInset * 2
  const ctx = getCanvasContext(canvas)

  // Outer mat — fill the full canvas with the margin colour first, so the
  // un-covered edge becomes a paper-like margin around the border.
  ctx.fillStyle = MARGIN_COLOR
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Border ring — inset by marginWidth, sized so only a borderWidth-thick
  // strip stays visible once the content is drawn on top of it below.
  ctx.fillStyle = BORDER_COLOR
  ctx.fillRect(marginWidth, marginWidth, canvas.width - marginWidth * 2, canvas.height - marginWidth * 2)

  if (format === 'jpeg') {
    // JPEG has no alpha channel — fill white first so a transparent source
    // PNG composites against white instead of black.
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(frameInset, frameInset, contentWidth, contentHeight)
  }

  // The photo itself — drawn exactly as uploaded, never modified.
  ctx.drawImage(image, frameInset, frameInset)

  if (hasFooter) {
    ctx.fillStyle = footer.backgroundColor
    ctx.fillRect(frameInset, frameInset + image.naturalHeight, contentWidth, footerHeight)

    ctx.fillStyle = footer.textColor
    ctx.textBaseline = 'middle'

    const rowCenterY = frameInset + image.naturalHeight + footerHeight / 2

    if (mode === 'name-only') {
      ctx.font = `600 ${nameFontSize}px Inter, system-ui, sans-serif`
      ctx.textAlign = name.alignment
      ctx.fillText(nameText, frameInset + alignedX(name.alignment, contentWidth, paddingX), rowCenterY)
    } else if (mode === 'date-only') {
      ctx.font = `600 ${dateFontSize}px Inter, system-ui, sans-serif`
      ctx.textAlign = date.alignment
      ctx.fillText(dateText, frameInset + alignedX(date.alignment, contentWidth, paddingX), rowCenterY)
    } else if (mode === 'row') {
      ctx.font = `600 ${nameFontSize}px Inter, system-ui, sans-serif`
      ctx.textAlign = name.alignment
      ctx.fillText(nameText, frameInset + alignedX(name.alignment, contentWidth, paddingX), rowCenterY)

      ctx.font = `600 ${dateFontSize}px Inter, system-ui, sans-serif`
      ctx.textAlign = date.alignment
      ctx.fillText(dateText, frameInset + alignedX(date.alignment, contentWidth, paddingX), rowCenterY)
    } else if (mode === 'stacked') {
      const totalHeight = nameFontSize + lineGap + dateFontSize
      const blockTop = rowCenterY - totalHeight / 2
      const nameY = blockTop + nameFontSize / 2
      const dateY = blockTop + nameFontSize + lineGap + dateFontSize / 2
      const x = frameInset + alignedX(name.alignment, contentWidth, paddingX)

      ctx.textAlign = name.alignment
      ctx.font = `600 ${nameFontSize}px Inter, system-ui, sans-serif`
      ctx.fillText(nameText, x, nameY)

      ctx.font = `600 ${dateFontSize}px Inter, system-ui, sans-serif`
      ctx.fillText(dateText, x, dateY)
    }
  }

  const mimeType = `image/${format}`
  const quality = format === 'png' ? undefined : 0.95 // "without quality loss" — high quality for lossy formats

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error('Canvas export failed — the browser could not encode the image.'))
      },
      mimeType,
      quality,
    )
  })
}
