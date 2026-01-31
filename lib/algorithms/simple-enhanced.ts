import { getClosestColor, hexToRgb } from '@/lib/utils/color';

/**
 * Enhanced simple algorithm with noise reduction
 * Applies Gaussian blur before palette mapping for cleaner results
 */
export function applySimpleEnhanced(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  palette: string[]
): void {
  // Step 1: Apply light Gaussian blur for noise reduction
  const blurred = new Uint8ClampedArray(pixels);

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;

      if (pixels[idx + 3] < 10) continue;

      let sumR = 0;
      let sumG = 0;
      let sumB = 0;
      let count = 0;

      // 3x3 weighted kernel
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nidx = (y + dy) * width + (x + dx);
          const nidxPixel = nidx * 4;

          if (pixels[nidxPixel + 3] >= 10) {
            const weight = dx === 0 && dy === 0 ? 4 : 1;
            sumR += pixels[nidxPixel] * weight;
            sumG += pixels[nidxPixel + 1] * weight;
            sumB += pixels[nidxPixel + 2] * weight;
            count += weight;
          }
        }
      }

      blurred[idx] = sumR / count;
      blurred[idx + 1] = sumG / count;
      blurred[idx + 2] = sumB / count;
    }
  }

  // Step 2: Convert to palette
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      if (pixels[idx + 3] < 10) continue;

      const r = blurred[idx];
      const g = blurred[idx + 1];
      const b = blurred[idx + 2];

      const closestHex = getClosestColor(r, g, b, palette);
      const [newR, newG, newB] = hexToRgb(closestHex);

      pixels[idx] = newR;
      pixels[idx + 1] = newG;
      pixels[idx + 2] = newB;
    }
  }
}
