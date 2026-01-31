import { getClosestColor, hexToRgb } from '@/lib/utils/color';

/**
 * Simple conversion algorithm
 * Direct pixel-to-palette mapping without preprocessing
 * Fastest option, best for already clean/simple images
 */
export function applySimple(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  palette: string[]
): void {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      if (pixels[idx + 3] < 10) continue;

      const r = pixels[idx];
      const g = pixels[idx + 1];
      const b = pixels[idx + 2];

      const closestHex = getClosestColor(r, g, b, palette);
      const [newR, newG, newB] = hexToRgb(closestHex);

      pixels[idx] = newR;
      pixels[idx + 1] = newG;
      pixels[idx + 2] = newB;
    }
  }
}
