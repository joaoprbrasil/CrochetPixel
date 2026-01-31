import { hexToRgb, rgbToHex, findClosestColor } from './color'

export interface ProcessOptions {
  width: number
  height: number
  palette: string[]
}

/**
 * Loads an image from a URL and returns an ImageData object
 */
export async function loadImageData(
  imageUrl: string,
  targetWidth: number,
  targetHeight: number
): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = targetWidth
      canvas.height = targetHeight
      const ctx = canvas.getContext('2d')
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'))
        return
      }
      
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight)
      resolve(ctx.getImageData(0, 0, targetWidth, targetHeight))
    }
    
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = imageUrl
  })
}

/**
 * Creates a pixelated crochet chart from image data
 */
export function createCrochetChart(
  canvas: HTMLCanvasElement,
  imageData: ImageData,
  palette: string[],
  blockSize: number = 10
): void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const { width, height, data } = imageData
  
  canvas.width = width * blockSize
  canvas.height = height * blockSize
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      
      const pixelHex = rgbToHex(r, g, b)
      const closestColor = findClosestColor(pixelHex, palette)
      
      ctx.fillStyle = closestColor
      ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize)
      
      // Draw grid lines
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize)
    }
  }
}

/**
 * Downloads the canvas as a PNG image
 */
export function downloadCanvas(canvas: HTMLCanvasElement, filename: string): void {
  const link = document.createElement('a')
  link.download = filename
  link.href = canvas.toDataURL('image/png')
  link.click()
}
