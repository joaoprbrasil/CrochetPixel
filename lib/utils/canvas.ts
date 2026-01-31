import { BLOCK_SIZE } from '@/lib/constants';

/**
 * Loads an image from a URL and returns an ImageBitmap or HTMLImageElement
 * @param url - Image URL or blob URL
 * @returns Promise resolving to the loaded image
 */
export async function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

/**
 * Creates a temporary canvas with the image resized to target dimensions
 * @param img - Source image
 * @param width - Target width in blocks
 * @param height - Target height in blocks
 * @returns Canvas with resized image
 */
export function createResizedCanvas(
  img: HTMLImageElement,
  width: number,
  height: number
): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D; imageData: ImageData } {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('Failed to get canvas context');
  
  ctx.drawImage(img, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);
  
  return { canvas, ctx, imageData };
}

/**
 * Renders pixelated blocks to the output canvas
 * @param ctx - Target canvas context
 * @param pixels - Pixel data array
 * @param width - Width in blocks
 * @param height - Height in blocks
 * @param blockSize - Size of each block in pixels (default: BLOCK_SIZE)
 */
export function renderBlocksToCanvas(
  ctx: CanvasRenderingContext2D,
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  blockSize: number = BLOCK_SIZE
): void {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      if (pixels[idx + 3] < 10) {
        ctx.fillStyle = '#ffffff';
      } else {
        const r = pixels[idx];
        const g = pixels[idx + 1];
        const b = pixels[idx + 2];
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      }

      ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
      
      // Draw grid lines
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
    }
  }
}

/**
 * Converts canvas to downloadable PNG data URL
 * @param canvas - Source canvas
 * @returns PNG data URL
 */
export function canvasToDataUrl(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL('image/png');
}

/**
 * Downloads a data URL as a file
 * @param dataUrl - Data URL to download
 * @param filename - Name for the downloaded file
 */
export function downloadDataUrl(dataUrl: string, filename: string): void {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}
