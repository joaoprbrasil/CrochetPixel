import { getClosestColor, hexToRgb } from '@/lib/utils/color';

/**
 * Cartoon algorithm
 * Simplifies flat areas while preserving edges
 * Perfect for crochet patterns - creates clear boundaries
 */
export function applyCartoon(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  palette: string[]
): void {
  // Step 1: Edge detection using Sobel operator
  const edges = new Uint8ClampedArray(width * height);

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;

      if (pixels[idx + 3] < 10) continue;

      // Horizontal gradient (Sobel X)
      const gx =
        -pixels[(y - 1) * width + (x - 1)] * 4 +
        pixels[(y - 1) * width + (x + 1)] * 4 +
        -2 * pixels[y * width + (x - 1)] * 4 +
        2 * pixels[y * width + (x + 1)] * 4 +
        -pixels[(y + 1) * width + (x - 1)] * 4 +
        pixels[(y + 1) * width + (x + 1)] * 4;

      // Vertical gradient (Sobel Y)
      const gy =
        -pixels[(y - 1) * width + (x - 1)] * 4 -
        2 * pixels[(y - 1) * width + x] * 4 -
        pixels[(y - 1) * width + (x + 1)] * 4 +
        pixels[(y + 1) * width + (x - 1)] * 4 +
        2 * pixels[(y + 1) * width + x] * 4 +
        pixels[(y + 1) * width + (x + 1)] * 4;

      const magnitude = Math.sqrt(gx * gx + gy * gy);
      edges[y * width + x] = magnitude > 50 ? 1 : 0;
    }
  }

  // Step 2: Apply bilateral filter (preserves edges, smooths flat areas)
  const smoothed = new Uint8ClampedArray(pixels);

  for (let y = 2; y < height - 2; y++) {
    for (let x = 2; x < width - 2; x++) {
      const idx = (y * width + x) * 4;

      if (pixels[idx + 3] < 10) continue;

      // Edge: keep original
      if (edges[y * width + x] === 1) {
        continue;
      }

      // Flat area: smooth strongly
      let sumR = 0;
      let sumG = 0;
      let sumB = 0;
      let totalWeight = 0;

      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          const nidx = (y + dy) * width + (x + dx);
          const nidxPixel = nidx * 4;

          if (pixels[nidxPixel + 3] >= 10) {
            const spatialDist = Math.sqrt(dx * dx + dy * dy);
            const weight = Math.exp(-spatialDist / 2);

            sumR += pixels[nidxPixel] * weight;
            sumG += pixels[nidxPixel + 1] * weight;
            sumB += pixels[nidxPixel + 2] * weight;
            totalWeight += weight;
          }
        }
      }

      smoothed[idx] = sumR / totalWeight;
      smoothed[idx + 1] = sumG / totalWeight;
      smoothed[idx + 2] = sumB / totalWeight;
    }
  }

  // Step 3: Convert to palette
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      if (pixels[idx + 3] < 10) continue;

      const r = smoothed[idx];
      const g = smoothed[idx + 1];
      const b = smoothed[idx + 2];

      const closestHex = getClosestColor(r, g, b, palette);
      const [newR, newG, newB] = hexToRgb(closestHex);

      pixels[idx] = newR;
      pixels[idx + 1] = newG;
      pixels[idx + 2] = newB;
    }
  }
}
