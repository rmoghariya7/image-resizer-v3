import { describe, expect, it } from 'vitest'
import {
  buildDownloadFilename,
  buildExtractArgs,
  buildInputName,
  buildOutputName,
  parseDurationFromLog,
} from '../lib/extract-args'
import { DEFAULT_ADVANCED_SETTINGS, OUTPUT_FORMATS } from '../types'

describe('buildExtractArgs', () => {
  it('builds default MP3 args with bitrate and no resample flags', () => {
    expect(
      buildExtractArgs('mp3', DEFAULT_ADVANCED_SETTINGS, 'input.mp4', 'output.mp3'),
    ).toEqual(['-i', 'input.mp4', '-vn', '-c:a', 'libmp3lame', '-b:a', '192k', 'output.mp3'])
  })

  it('omits bitrate for lossless formats (WAV, FLAC)', () => {
    const wav = buildExtractArgs('wav', DEFAULT_ADVANCED_SETTINGS, 'input.mov', 'output.wav')
    const flac = buildExtractArgs('flac', DEFAULT_ADVANCED_SETTINGS, 'input.mov', 'output.flac')
    expect(wav).not.toContain('-b:a')
    expect(flac).not.toContain('-b:a')
    expect(wav).toContain('pcm_s16le')
    expect(flac).toContain('flac')
  })

  it('applies mono and explicit sample rate when set', () => {
    const args = buildExtractArgs(
      'aac',
      { bitrate: '256', sampleRate: '44100', channels: 'mono' },
      'input.mkv',
      'output.m4a',
    )
    expect(args).toEqual([
      '-i', 'input.mkv', '-vn',
      '-ac', '1',
      '-ar', '44100',
      '-c:a', 'aac',
      '-b:a', '256k',
      'output.m4a',
    ])
  })

  it('always strips the video stream (-vn) for every format', () => {
    for (const format of OUTPUT_FORMATS) {
      const args = buildExtractArgs(
        format.key,
        DEFAULT_ADVANCED_SETTINGS,
        'input.webm',
        buildOutputName(format.key),
      )
      expect(args).toContain('-vn')
      expect(args.at(-1)).toBe(`output.${format.extension}`)
    }
  })
})

describe('filenames', () => {
  it('keeps the source extension as a demuxer hint', () => {
    expect(buildInputName('holiday clip.MOV')).toBe('input.mov')
    expect(buildInputName('noextension')).toBe('input.noextension')
  })

  it('builds a presetly-branded download name with the format extension', () => {
    expect(buildDownloadFilename('wedding.mp4', 'mp3')).toBe('presetly-wedding.mp3')
    expect(buildDownloadFilename('talk.recording.mkv', 'aac')).toBe(
      'presetly-talk.recording.m4a',
    )
  })
})

describe('parseDurationFromLog', () => {
  it('parses HH:MM:SS.ms duration lines', () => {
    expect(
      parseDurationFromLog('  Duration: 00:03:25.48, start: 0.000000, bitrate: 1205 kb/s'),
    ).toBeCloseTo(205.48)
    expect(parseDurationFromLog('Duration: 01:00:00.00')).toBe(3600)
  })

  it('returns undefined for non-duration lines', () => {
    expect(parseDurationFromLog('Stream #0:0: Video: h264')).toBeUndefined()
    expect(parseDurationFromLog('Duration: N/A')).toBeUndefined()
  })
})
