import type { RGB } from '@/lib/types';

/**
 * Converts hex color string to RGB tuple
 * @param hex - Color in hex format (#RRGGBB)
 * @returns RGB tuple [r, g, b]
 */
export function hexToRgb(hex: string): RGB {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

/**
 * Converts RGB values to hex string
 * @param r - Red (0-255)
 * @param g - Green (0-255)
 * @param b - Blue (0-255)
 * @returns Hex color string (#RRGGBB)
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
}

/**
 * Finds the closest color from a palette using weighted Euclidean distance
 * Uses a perceptually weighted formula for better color matching
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @param palette - Array of hex colors to match against
 * @returns Closest hex color from the palette
 */
export function getClosestColor(
  r: number,
  g: number,
  b: number,
  palette: string[]
): string {
  if (palette.length === 0) return '#000000';

  let minDistance = Infinity;
  let closest = palette[0];

  for (const hex of palette) {
    const [pr, pg, pb] = hexToRgb(hex);
    
    // Weighted Euclidean distance (redmean approximation)
    // Better perceptual color matching than simple Euclidean
    const rMean = (r + pr) / 2;
    const dr = r - pr;
    const dg = g - pg;
    const db = b - pb;

    const distance = Math.sqrt(
      (2 + rMean / 256) * dr * dr +
      4 * dg * dg +
      (2 + (255 - rMean) / 256) * db * db
    );

    if (distance < minDistance) {
      minDistance = distance;
      closest = hex;
    }
  }

  return closest;
}

/**
 * Clamps a value between min and max
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
