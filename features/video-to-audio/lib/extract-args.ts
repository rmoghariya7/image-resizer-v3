import {
  getFormatConfig,
  type AdvancedSettings,
  type OutputFormat,
} from '../types'

/**
 * Input filename inside FFmpeg's virtual filesystem. The real extension is
 * kept so the demuxer can use it as a hint (content sniffing still applies).
 */
export function buildInputName(originalName: string): string {
  const ext = originalName.split('.').pop()?.toLowerCase() ?? 'mp4'
  return `input.${ext}`
}

export function buildOutputName(format: OutputFormat): string {
  return `output.${getFormatConfig(format).extension}`
}

/**
 * Download filename: presetly-<original-basename>.<ext>
 */
export function buildDownloadFilename(originalName: string, format: OutputFormat): string {
  const base = originalName.replace(/\.[^.]+$/, '').trim() || 'audio'
  return `presetly-${base}.${getFormatConfig(format).extension}`
}

/**
 * Pure arg builder for the FFmpeg command — kept free of any FFmpeg import so
 * it can be unit-tested without loading the WASM engine.
 *
 * Shape: ffmpeg -i input.<ext> -vn [-ac N] [-ar N] -c:a <codec> [-b:a Nk] output.<ext>
 */
export function buildExtractArgs(
  format: OutputFormat,
  settings: AdvancedSettings,
  inputName: string,
  outputName: string,
): string[] {
  const config = getFormatConfig(format)
  const args = ['-i', inputName, '-vn']

  if (settings.channels !== 'auto') {
    args.push('-ac', settings.channels === 'mono' ? '1' : '2')
  }
  if (settings.sampleRate !== 'auto') {
    args.push('-ar', settings.sampleRate)
  }

  args.push('-c:a', config.codec)

  // Bitrate only means something for lossy encoders.
  if (!config.lossless) {
    args.push('-b:a', `${settings.bitrate}k`)
  }

  args.push(outputName)
  return args
}

/**
 * Parses "Duration: 00:01:02.34" from FFmpeg's stderr log. Returns seconds,
 * or undefined when the line is not a duration line.
 */
export function parseDurationFromLog(logLine: string): number | undefined {
  const match = /Duration:\s*(\d+):(\d{2}):(\d{2}(?:\.\d+)?)/.exec(logLine)
  if (!match) return undefined
  const [, h, m, s] = match
  return Number(h) * 3600 + Number(m) * 60 + Number(s)
}
