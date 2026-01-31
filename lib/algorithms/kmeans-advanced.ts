import { getClosestColor, hexToRgb } from '@/lib/utils/color';

/**
 * K-Means Advanced algorithm
 * Analyzes dominant colors and creates optimal mapping
 * Better color fidelity for complex images
 */
export function applyKMeansAdvanced(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  palette: string[]
): void {
  // Step 1: Collect all colors from the image
  const colorMap = new Map<string, number>();

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      if (pixels[idx + 3] >= 10) {
        const key = `${pixels[idx]},${pixels[idx + 1]},${pixels[idx + 2]}`;
        colorMap.set(key, (colorMap.get(key) || 0) + 1);
      }
    }
  }

  // Step 2: Find dominant colors through quantization
  const colorArray = Array.from(colorMap.entries()).map(([key, count]) => {
    const [r, g, b] = key.split(',').map(Number);
    return { r, g, b, count };
  });

  // Group similar colors
  const quantized = new Map<
    string,
    { r: number; g: number; b: number; count: number }
  >();
  const quantizeLevel = 32; // Reduces 256 tones to 8 groups per channel

  for (const { r, g, b, count } of colorArray) {
    const qr = Math.floor(r / quantizeLevel) * quantizeLevel;
    const qg = Math.floor(g / quantizeLevel) * quantizeLevel;
    const qb = Math.floor(b / quantizeLevel) * quantizeLevel;
    const key = `${qr},${qg},${qb}`;

    const existing = quantized.get(key);
    if (existing) {
      existing.count += count;
      existing.r =
        (existing.r * existing.count + r * count) / (existing.count + count);
      existing.g =
        (existing.g * existing.count + g * count) / (existing.count + count);
      existing.b =
        (existing.b * existing.count + b * count) / (existing.count + count);
    } else {
      quantized.set(key, { r: qr, g: qg, b: qb, count });
    }
  }

  // Step 3: Create palette mapping
  const paletteMap = new Map<string, string>();
  for (const { r, g, b } of quantized.values()) {
    const key = `${Math.round(r)},${Math.round(g)},${Math.round(b)}`;
    paletteMap.set(key, getClosestColor(r, g, b, palette));
  }

  // Step 4: Apply mapping
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      if (pixels[idx + 3] < 10) continue;

      const r = pixels[idx];
      const g = pixels[idx + 1];
      const b = pixels[idx + 2];

      const qr = Math.floor(r / quantizeLevel) * quantizeLevel;
      const qg = Math.floor(g / quantizeLevel) * quantizeLevel;
      const qb = Math.floor(b / quantizeLevel) * quantizeLevel;
      const key = `${qr},${qg},${qb}`;

      const mappedHex = paletteMap.get(key) || getClosestColor(r, g, b, palette);
      const [newR, newG, newB] = hexToRgb(mappedHex);

      pixels[idx] = newR;
      pixels[idx + 1] = newG;
      pixels[idx + 2] = newB;
    }
  }
}
