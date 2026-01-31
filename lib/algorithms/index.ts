import type { ConversionAlgorithm } from '@/lib/types'
import { hexToRgb, rgbToHex, findClosestColor } from '@/lib/utils/color'

export interface AlgorithmResult {
  imageData: ImageData
}

/**
 * Simple algorithm - direct conversion
 */
function processSimple(imageData: ImageData, palette: string[]): ImageData {
  const { width, height, data } = imageData
  const result = new ImageData(width, height)
  
  for (let i = 0; i < data.length; i += 4) {
    const pixelHex = rgbToHex(data[i], data[i + 1], data[i + 2])
    const closest = findClosestColor(pixelHex, palette)
    const rgb = hexToRgb(closest)
    
    result.data[i] = rgb.r
    result.data[i + 1] = rgb.g
    result.data[i + 2] = rgb.b
    result.data[i + 3] = 255
  }
  
  return result
}

/**
 * Simple Enhanced - with noise reduction
 */
function processSimpleEnhanced(imageData: ImageData, palette: string[]): ImageData {
  const { width, height, data } = imageData
  const result = new ImageData(width, height)
  
  // Apply box blur first
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0, g = 0, b = 0, count = 0
      
      // 3x3 kernel
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = Math.min(Math.max(x + dx, 0), width - 1)
          const ny = Math.min(Math.max(y + dy, 0), height - 1)
          const i = (ny * width + nx) * 4
          
          r += data[i]
          g += data[i + 1]
          b += data[i + 2]
          count++
        }
      }
      
      const i = (y * width + x) * 4
      const pixelHex = rgbToHex(r / count, g / count, b / count)
      const closest = findClosestColor(pixelHex, palette)
      const rgb = hexToRgb(closest)
      
      result.data[i] = rgb.r
      result.data[i + 1] = rgb.g
      result.data[i + 2] = rgb.b
      result.data[i + 3] = 255
    }
  }
  
  return result
}

/**
 * K-Means Advanced - dominant color analysis
 */
function processKMeans(imageData: ImageData, palette: string[]): ImageData {
  const { width, height, data } = imageData
  const result = new ImageData(width, height)
  
  // Sample pixels for clustering
  const samples: number[][] = []
  const sampleRate = Math.max(1, Math.floor(data.length / 4 / 1000))
  
  for (let i = 0; i < data.length; i += 4 * sampleRate) {
    samples.push([data[i], data[i + 1], data[i + 2]])
  }
  
  // Simple k-means with palette colors as centers
  const k = Math.min(palette.length, 16)
  const centers = palette.slice(0, k).map(hex => {
    const rgb = hexToRgb(hex)
    return [rgb.r, rgb.g, rgb.b]
  })
  
  // Map each pixel to closest center, then to palette
  for (let i = 0; i < data.length; i += 4) {
    const pixel = [data[i], data[i + 1], data[i + 2]]
    
    let minDist = Number.POSITIVE_INFINITY
    let closestCenter = centers[0]
    
    for (const center of centers) {
      const dist = Math.sqrt(
        Math.pow(pixel[0] - center[0], 2) +
        Math.pow(pixel[1] - center[1], 2) +
        Math.pow(pixel[2] - center[2], 2)
      )
      if (dist < minDist) {
        minDist = dist
        closestCenter = center
      }
    }
    
    const centerHex = rgbToHex(closestCenter[0], closestCenter[1], closestCenter[2])
    const closest = findClosestColor(centerHex, palette)
    const rgb = hexToRgb(closest)
    
    result.data[i] = rgb.r
    result.data[i + 1] = rgb.g
    result.data[i + 2] = rgb.b
    result.data[i + 3] = 255
  }
  
  return result
}

/**
 * Cartoon - edge detection + quantization
 */
function processCartoon(imageData: ImageData, palette: string[]): ImageData {
  const { width, height, data } = imageData
  const result = new ImageData(width, height)
  
  // Sobel edge detection
  const edges = new Float32Array(width * height)
  
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const getGray = (px: number, py: number) => {
        const i = (py * width + px) * 4
        return (data[i] + data[i + 1] + data[i + 2]) / 3
      }
      
      // Sobel kernels
      const gx = 
        -getGray(x - 1, y - 1) + getGray(x + 1, y - 1) +
        -2 * getGray(x - 1, y) + 2 * getGray(x + 1, y) +
        -getGray(x - 1, y + 1) + getGray(x + 1, y + 1)
      
      const gy = 
        -getGray(x - 1, y - 1) - 2 * getGray(x, y - 1) - getGray(x + 1, y - 1) +
        getGray(x - 1, y + 1) + 2 * getGray(x, y + 1) + getGray(x + 1, y + 1)
      
      edges[y * width + x] = Math.sqrt(gx * gx + gy * gy)
    }
  }
  
  // Quantize colors and add edges
  const edgeThreshold = 50
  
  for (let i = 0; i < data.length; i += 4) {
    const pixelIndex = i / 4
    const isEdge = edges[pixelIndex] > edgeThreshold
    
    if (isEdge) {
      result.data[i] = 0
      result.data[i + 1] = 0
      result.data[i + 2] = 0
    } else {
      const pixelHex = rgbToHex(data[i], data[i + 1], data[i + 2])
      const closest = findClosestColor(pixelHex, palette)
      const rgb = hexToRgb(closest)
      
      result.data[i] = rgb.r
      result.data[i + 1] = rgb.g
      result.data[i + 2] = rgb.b
    }
    result.data[i + 3] = 255
  }
  
  return result
}

/**
 * High Contrast - increased saturation and contrast
 */
function processHighContrast(imageData: ImageData, palette: string[]): ImageData {
  const { width, height, data } = imageData
  const result = new ImageData(width, height)
  
  const saturationBoost = 1.3
  const contrastBoost = 1.2
  
  for (let i = 0; i < data.length; i += 4) {
    let r = data[i]
    let g = data[i + 1]
    let b = data[i + 2]
    
    // Increase contrast
    r = ((r / 255 - 0.5) * contrastBoost + 0.5) * 255
    g = ((g / 255 - 0.5) * contrastBoost + 0.5) * 255
    b = ((b / 255 - 0.5) * contrastBoost + 0.5) * 255
    
    // Increase saturation (convert to HSL, boost S, convert back)
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const l = (max + min) / 2 / 255
    
    if (max !== min) {
      const d = (max - min) / 255
      const s = l > 0.5 ? d / (2 - max / 255 - min / 255) : d / (max / 255 + min / 255)
      const boostedS = Math.min(1, s * saturationBoost)
      
      // Convert back
      const c = (1 - Math.abs(2 * l - 1)) * boostedS
      const gray = l * 255
      const adjustment = c * 127.5
      
      r = r > gray ? Math.min(255, r + adjustment) : Math.max(0, r - adjustment * 0.5)
      g = g > gray ? Math.min(255, g + adjustment) : Math.max(0, g - adjustment * 0.5)
      b = b > gray ? Math.min(255, b + adjustment) : Math.max(0, b - adjustment * 0.5)
    }
    
    const pixelHex = rgbToHex(r, g, b)
    const closest = findClosestColor(pixelHex, palette)
    const rgb = hexToRgb(closest)
    
    result.data[i] = rgb.r
    result.data[i + 1] = rgb.g
    result.data[i + 2] = rgb.b
    result.data[i + 3] = 255
  }
  
  return result
}

/**
 * Floyd-Steinberg Dithering
 */
function processFloydSteinberg(imageData: ImageData, palette: string[]): ImageData {
  const { width, height, data } = imageData
  
  // Create working copy as float array
  const pixels = new Float32Array(data.length)
  for (let i = 0; i < data.length; i++) {
    pixels[i] = data[i]
  }
  
  const result = new ImageData(width, height)
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      
      // Current pixel
      const oldR = pixels[i]
      const oldG = pixels[i + 1]
      const oldB = pixels[i + 2]
      
      // Find closest palette color
      const pixelHex = rgbToHex(oldR, oldG, oldB)
      const closest = findClosestColor(pixelHex, palette)
      const newColor = hexToRgb(closest)
      
      // Set result
      result.data[i] = newColor.r
      result.data[i + 1] = newColor.g
      result.data[i + 2] = newColor.b
      result.data[i + 3] = 255
      
      // Calculate error
      const errR = oldR - newColor.r
      const errG = oldG - newColor.g
      const errB = oldB - newColor.b
      
      // Distribute error to neighbors
      const distribute = (dx: number, dy: number, factor: number) => {
        const nx = x + dx
        const ny = y + dy
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const ni = (ny * width + nx) * 4
          pixels[ni] += errR * factor
          pixels[ni + 1] += errG * factor
          pixels[ni + 2] += errB * factor
        }
      }
      
      distribute(1, 0, 7 / 16)
      distribute(-1, 1, 3 / 16)
      distribute(0, 1, 5 / 16)
      distribute(1, 1, 1 / 16)
    }
  }
  
  return result
}

/**
 * Main processing function
 */
export function processImage(
  imageData: ImageData,
  algorithm: ConversionAlgorithm,
  palette: string[]
): ImageData {
  switch (algorithm) {
    case 'simple':
      return processSimple(imageData, palette)
    case 'simple-enhanced':
      return processSimpleEnhanced(imageData, palette)
    case 'kmeans-advanced':
      return processKMeans(imageData, palette)
    case 'cartoon':
      return processCartoon(imageData, palette)
    case 'high-contrast':
      return processHighContrast(imageData, palette)
    case 'floyd-steinberg':
      return processFloydSteinberg(imageData, palette)
    default:
      return processSimple(imageData, palette)
  }
}
