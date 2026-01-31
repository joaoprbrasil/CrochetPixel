import { getClosestColor, hexToRgb, clamp } from '@/lib/utils/color';

/**
 * Floyd-Steinberg Dithering algorithm
 * Distributes quantization error to neighboring pixels
 * Creates smooth gradients but may introduce noise
 */
export function applyFloydSteinberg(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  palette: string[]
): void {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      if (pixels[idx + 3] < 10) continue;

      const oldR = pixels[idx];
      const oldG = pixels[idx + 1];
      const oldB = pixels[idx + 2];

      const closestHex = getClosestColor(oldR, oldG, oldB, palette);
      const [newR, newG, newB] = hexToRgb(closestHex);

      pixels[idx] = newR;
      pixels[idx + 1] = newG;
      pixels[idx + 2] = newB;

      // Calculate quantization error
      const errorR = oldR - newR;
      const errorG = oldG - newG;
      const errorB = oldB - newB;

      // Distribute error to neighboring pixels
      const distributeError = (dx: number, dy: number, factor: number) => {
        const nx = x + dx;
        const ny = y + dy;

        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const nidx = (ny * width + nx) * 4;
          pixels[nidx] = clamp(pixels[nidx] + errorR * factor, 0, 255);
          pixels[nidx + 1] = clamp(pixels[nidx + 1] + errorG * factor, 0, 255);
          pixels[nidx + 2] = clamp(pixels[nidx + 2] + errorB * factor, 0, 255);
        }
      };

      // Floyd-Steinberg error distribution pattern:
      //       * 7/16
      // 3/16 5/16 1/16
      distributeError(1, 0, 7 / 16);
      distributeError(-1, 1, 3 / 16);
      distributeError(0, 1, 5 / 16);
      distributeError(1, 1, 1 / 16);
    }
  }
}
