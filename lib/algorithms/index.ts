import type { ConversionAlgorithm } from '@/lib/types'
import { getClosestColor, hexToRgb, clamp } from '@/lib/utils/color'

type AlgorithmFn = (
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  palette: string[]
) => void

// ============================================
// SIMPLE ALGORITHM
// ============================================
function applySimple(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  palette: string[]
): void {
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] < 10) continue
    const hex = getClosestColor(pixels[i], pixels[i + 1], pixels[i + 2], palette)
    const [r, g, b] = hexToRgb(hex)
    pixels[i] = r
    pixels[i + 1] = g
    pixels[i + 2] = b
  }
}

// ============================================
// SIMPLE ENHANCED (with blur)
// ============================================
function applySimpleEnhanced(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  palette: string[]
): void {
  const blurred = new Uint8ClampedArray(pixels)

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4
      if (pixels[idx + 3] < 10) continue

      let sumR = 0, sumG = 0, sumB = 0, count = 0
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nidx = ((y + dy) * width + (x + dx)) * 4
          if (pixels[nidx + 3] >= 10) {
            const weight = dx === 0 && dy === 0 ? 4 : 1
            sumR += pixels[nidx] * weight
            sumG += pixels[nidx + 1] * weight
            sumB += pixels[nidx + 2] * weight
            count += weight
          }
        }
      }
      blurred[idx] = sumR / count
      blurred[idx + 1] = sumG / count
      blurred[idx + 2] = sumB / count
    }
  }

  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] < 10) continue
    const hex = getClosestColor(blurred[i], blurred[i + 1], blurred[i + 2], palette)
    const [r, g, b] = hexToRgb(hex)
    pixels[i] = r
    pixels[i + 1] = g
    pixels[i + 2] = b
  }
}

// ============================================
// K-MEANS ADVANCED
// ============================================
function applyKMeansAdvanced(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  palette: string[]
): void {
  const quantized = new Map<string, { r: number; g: number; b: number; count: number }>()
  const quantizeLevel = 32

  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] < 10) continue
    const qr = Math.floor(pixels[i] / quantizeLevel) * quantizeLevel
    const qg = Math.floor(pixels[i + 1] / quantizeLevel) * quantizeLevel
    const qb = Math.floor(pixels[i + 2] / quantizeLevel) * quantizeLevel
    const key = `${qr},${qg},${qb}`

    const existing = quantized.get(key)
    if (existing) {
      existing.count++
    } else {
      quantized.set(key, { r: qr, g: qg, b: qb, count: 1 })
    }
  }

  const paletteMap = new Map<string, string>()
  for (const { r, g, b } of quantized.values()) {
    const key = `${r},${g},${b}`
    paletteMap.set(key, getClosestColor(r, g, b, palette))
  }

  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] < 10) continue
    const qr = Math.floor(pixels[i] / quantizeLevel) * quantizeLevel
    const qg = Math.floor(pixels[i + 1] / quantizeLevel) * quantizeLevel
    const qb = Math.floor(pixels[i + 2] / quantizeLevel) * quantizeLevel
    const key = `${qr},${qg},${qb}`

    const hex = paletteMap.get(key) || getClosestColor(pixels[i], pixels[i + 1], pixels[i + 2], palette)
    const [r, g, b] = hexToRgb(hex)
    pixels[i] = r
    pixels[i + 1] = g
    pixels[i + 2] = b
  }
}

// ============================================
// CARTOON (edge-preserving)
// ============================================
function applyCartoon(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  palette: string[]
): void {
  // Edge detection
  const edges = new Uint8ClampedArray(width * height)
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4
      if (pixels[idx + 3] < 10) continue

      const gx =
        -pixels[((y - 1) * width + (x - 1)) * 4] + pixels[((y - 1) * width + (x + 1)) * 4] +
        -2 * pixels[(y * width + (x - 1)) * 4] + 2 * pixels[(y * width + (x + 1)) * 4] +
        -pixels[((y + 1) * width + (x - 1)) * 4] + pixels[((y + 1) * width + (x + 1)) * 4]

      const gy =
        -pixels[((y - 1) * width + (x - 1)) * 4] - 2 * pixels[((y - 1) * width + x) * 4] -
        pixels[((y - 1) * width + (x + 1)) * 4] + pixels[((y + 1) * width + (x - 1)) * 4] +
        2 * pixels[((y + 1) * width + x) * 4] + pixels[((y + 1) * width + (x + 1)) * 4]

      edges[y * width + x] = Math.sqrt(gx * gx + gy * gy) > 50 ? 1 : 0
    }
  }

  // Smooth non-edge areas
  const smoothed = new Uint8ClampedArray(pixels)
  for (let y = 2; y < height - 2; y++) {
    for (let x = 2; x < width - 2; x++) {
      const idx = (y * width + x) * 4
      if (pixels[idx + 3] < 10 || edges[y * width + x] === 1) continue

      let sumR = 0, sumG = 0, sumB = 0, totalWeight = 0
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          const nidx = ((y + dy) * width + (x + dx)) * 4
          if (pixels[nidx + 3] >= 10) {
            const weight = Math.exp(-Math.sqrt(dx * dx + dy * dy) / 2)
            sumR += pixels[nidx] * weight
            sumG += pixels[nidx + 1] * weight
            sumB += pixels[nidx + 2] * weight
            totalWeight += weight
          }
        }
      }
      smoothed[idx] = sumR / totalWeight
      smoothed[idx + 1] = sumG / totalWeight
      smoothed[idx + 2] = sumB / totalWeight
    }
  }

  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] < 10) continue
    const hex = getClosestColor(smoothed[i], smoothed[i + 1], smoothed[i + 2], palette)
    const [r, g, b] = hexToRgb(hex)
    pixels[i] = r
    pixels[i + 1] = g
    pixels[i + 2] = b
  }
}

// ============================================
// HIGH CONTRAST
// ============================================
function applyHighContrast(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  palette: string[]
): void {
  const contrast = 2.0
  const levels = 4

  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] < 10) continue

    // Sigmoidal contrast
    let r = 1 / (1 + Math.exp(-contrast * (pixels[i] / 255 - 0.5)))
    let g = 1 / (1 + Math.exp(-contrast * (pixels[i + 1] / 255 - 0.5)))
    let b = 1 / (1 + Math.exp(-contrast * (pixels[i + 2] / 255 - 0.5)))

    // Posterize
    r = Math.floor(r * levels) / levels
    g = Math.floor(g * levels) / levels
    b = Math.floor(b * levels) / levels

    const hex = getClosestColor(r * 255, g * 255, b * 255, palette)
    const [nr, ng, nb] = hexToRgb(hex)
    pixels[i] = nr
    pixels[i + 1] = ng
    pixels[i + 2] = nb
  }
}

// ============================================
// FLOYD-STEINBERG DITHERING
// ============================================
function applyFloydSteinberg(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  palette: string[]
): void {
  const distributeError = (x: number, y: number, errR: number, errG: number, errB: number, factor: number) => {
    if (x >= 0 && x < width && y >= 0 && y < height) {
      const idx = (y * width + x) * 4
      pixels[idx] = clamp(pixels[idx] + errR * factor, 0, 255)
      pixels[idx + 1] = clamp(pixels[idx + 1] + errG * factor, 0, 255)
      pixels[idx + 2] = clamp(pixels[idx + 2] + errB * factor, 0, 255)
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4
      if (pixels[idx + 3] < 10) continue

      const oldR = pixels[idx], oldG = pixels[idx + 1], oldB = pixels[idx + 2]
      const hex = getClosestColor(oldR, oldG, oldB, palette)
      const [newR, newG, newB] = hexToRgb(hex)

      pixels[idx] = newR
      pixels[idx + 1] = newG
      pixels[idx + 2] = newB

      const errR = oldR - newR, errG = oldG - newG, errB = oldB - newB
      distributeError(x + 1, y, errR, errG, errB, 7 / 16)
      distributeError(x - 1, y + 1, errR, errG, errB, 3 / 16)
      distributeError(x, y + 1, errR, errG, errB, 5 / 16)
      distributeError(x + 1, y + 1, errR, errG, errB, 1 / 16)
    }
  }
}

// ============================================
// ALGORITHM MAP
// ============================================
const algorithms: Record<ConversionAlgorithm, AlgorithmFn> = {
  'simple': applySimple,
  'simple-enhanced': applySimpleEnhanced,
  'kmeans-advanced': applyKMeansAdvanced,
  'cartoon': applyCartoon,
  'high-contrast': applyHighContrast,
  'floyd-steinberg': applyFloydSteinberg,
}

export function applyAlgorithm(
  algorithm: ConversionAlgorithm,
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  palette: string[]
): void {
  const fn = algorithms[algorithm]
  if (!fn) throw new Error(`Unknown algorithm: ${algorithm}`)
  fn(pixels, width, height, palette)
}
