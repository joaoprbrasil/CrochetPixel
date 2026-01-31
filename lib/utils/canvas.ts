import { BLOCK_SIZE } from '@/lib/constants'

/** Load image from URL */
export async function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
  })
}

/** Create resized canvas with image */
export function createResizedCanvas(
  img: HTMLImageElement,
  width: number,
  height: number
): { ctx: CanvasRenderingContext2D; imageData: ImageData } {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) throw new Error('Failed to get canvas context')
  
  ctx.drawImage(img, 0, 0, width, height)
  const imageData = ctx.getImageData(0, 0, width, height)
  
  return { ctx, imageData }
}

/** Render pixelated blocks to canvas */
export function renderBlocksToCanvas(
  ctx: CanvasRenderingContext2D,
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  blockSize: number = BLOCK_SIZE
): void {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4

      if (pixels[idx + 3] < 10) {
        ctx.fillStyle = '#ffffff'
      } else {
        ctx.fillStyle = `rgb(${pixels[idx]}, ${pixels[idx + 1]}, ${pixels[idx + 2]})`
      }

      ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize)
      
      // Grid lines
      ctx.strokeStyle = 'rgba(0,0,0,0.15)'
      ctx.lineWidth = 0.5
      ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize)
    }
  }
}

/** Convert canvas to PNG data URL */
export function canvasToDataUrl(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL('image/png')
}

/** Download data URL as file */
export function downloadDataUrl(dataUrl: string, filename: string): void {
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  link.click()
}
