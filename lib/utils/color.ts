/**
 * Converts a hex color string to RGB values
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) {
    return { r: 0, g: 0, b: 0 }
  }
  return {
    r: Number.parseInt(result[1], 16),
    g: Number.parseInt(result[2], 16),
    b: Number.parseInt(result[3], 16),
  }
}

/**
 * Converts RGB values to a hex color string
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map(x => {
    const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16)
    return hex.length === 1 ? `0${hex}` : hex
  }).join('')}`
}

/**
 * Calculates the Euclidean distance between two colors in RGB space
 */
export function colorDistance(hex1: string, hex2: string): number {
  const c1 = hexToRgb(hex1)
  const c2 = hexToRgb(hex2)
  return Math.sqrt(
    Math.pow(c1.r - c2.r, 2) +
    Math.pow(c1.g - c2.g, 2) +
    Math.pow(c1.b - c2.b, 2)
  )
}

/**
 * Finds the closest color from a palette to the given color
 */
export function findClosestColor(hex: string, palette: string[]): string {
  let closestColor = palette[0]
  let minDistance = Number.POSITIVE_INFINITY

  for (const paletteColor of palette) {
    const distance = colorDistance(hex, paletteColor)
    if (distance < minDistance) {
      minDistance = distance
      closestColor = paletteColor
    }
  }

  return closestColor
}

/**
 * Determines if a color is light (for text contrast purposes)
 */
export function isLightColor(hex: string): boolean {
  const { r, g, b } = hexToRgb(hex)
  // Using relative luminance formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5
}
