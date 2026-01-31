import type { ConversionAlgorithm } from '@/lib/types';
import { applySimple } from './simple';
import { applySimpleEnhanced } from './simple-enhanced';
import { applyKMeansAdvanced } from './kmeans-advanced';
import { applyCartoon } from './cartoon';
import { applyHighContrast } from './high-contrast';
import { applyFloydSteinberg } from './floyd-steinberg';

export { applySimple } from './simple';
export { applySimpleEnhanced } from './simple-enhanced';
export { applyKMeansAdvanced } from './kmeans-advanced';
export { applyCartoon } from './cartoon';
export { applyHighContrast } from './high-contrast';
export { applyFloydSteinberg } from './floyd-steinberg';

/** Algorithm function type */
type AlgorithmFunction = (
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  palette: string[]
) => void;

/** Map of algorithm IDs to their implementations */
const algorithmMap: Record<ConversionAlgorithm, AlgorithmFunction> = {
  simple: applySimple,
  'simple-enhanced': applySimpleEnhanced,
  'kmeans-advanced': applyKMeansAdvanced,
  cartoon: applyCartoon,
  'high-contrast': applyHighContrast,
  'floyd-steinberg': applyFloydSteinberg,
};

/**
 * Applies the specified conversion algorithm to pixel data
 * @param algorithm - Algorithm identifier
 * @param pixels - Pixel data to transform (modified in place)
 * @param width - Image width
 * @param height - Image height
 * @param palette - Color palette to map to
 */
export function applyAlgorithm(
  algorithm: ConversionAlgorithm,
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  palette: string[]
): void {
  const fn = algorithmMap[algorithm];
  if (!fn) {
    throw new Error(`Unknown algorithm: ${algorithm}`);
  }
  fn(pixels, width, height, palette);
}
