import type { RGB } from '@/lib/types'

/** Convert hex color to RGB tuple */
export function hexToRgb(hex: string): RGB {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [r, g, b]
}

/** Convert RGB to hex string */
export function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`
}

/** Clamp value between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

/** Find closest color from palette using perceptual distance */
export function getClosestColor(r: number, g: number, b: number, palette: string[]): string {
  if (palette.length === 0) return '#000000'

  let minDistance = Infinity
  let closest = palette[0]

  for (const hex of palette) {
    const [pr, pg, pb] = hexToRgb(hex)
    
    // Weighted Euclidean distance (redmean approximation)
    const rMean = (r + pr) / 2
    const dr = r - pr
    const dg = g - pg
    const db = b - pb

    const distance = Math.sqrt(
      (2 + rMean / 256) * dr * dr +
      4 * dg * dg +
      (2 + (255 - rMean) / 256) * db * db
    )

    if (distance < minDistance) {
      minDistance = distance
      closest = hex
    }
  }

  return closest
}

/** Check if a color is light (for contrast) */
export function isLightColor(hex: string): boolean {
  const [r, g, b] = hexToRgb(hex)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5
}
