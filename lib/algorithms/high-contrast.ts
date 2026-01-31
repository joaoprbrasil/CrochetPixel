import { getClosestColor, hexToRgb, clamp } from '@/lib/utils/color';

/**
 * High Contrast algorithm
 * Increases contrast and reduces intermediate tones
 * Great for pattern visibility and bold designs
 */
export function applyHighContrast(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  palette: string[]
): void {
  // Step 1: Apply sigmoidal contrast adjustment
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      if (pixels[idx + 3] < 10) continue;

      let r = pixels[idx] / 255;
      let g = pixels[idx + 1] / 255;
      let b = pixels[idx + 2] / 255;

      // Sigmoidal contrast
      const contrast = 2.0;
      r = 1 / (1 + Math.exp(-contrast * (r - 0.5)));
      g = 1 / (1 + Math.exp(-contrast * (g - 0.5)));
      b = 1 / (1 + Math.exp(-contrast * (b - 0.5)));

      pixels[idx] = clamp(r * 255, 0, 255);
      pixels[idx + 1] = clamp(g * 255, 0, 255);
      pixels[idx + 2] = clamp(b * 255, 0, 255);
    }
  }

  // Step 2: Posterization (reduce color levels)
  const levels = 4; // Reduces to 4 levels per channel

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      if (pixels[idx + 3] < 10) continue;

      pixels[idx] = Math.floor(pixels[idx] / (256 / levels)) * (256 / levels);
      pixels[idx + 1] =
        Math.floor(pixels[idx + 1] / (256 / levels)) * (256 / levels);
      pixels[idx + 2] =
        Math.floor(pixels[idx + 2] / (256 / levels)) * (256 / levels);
    }
  }

  // Step 3: Convert to palette
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
