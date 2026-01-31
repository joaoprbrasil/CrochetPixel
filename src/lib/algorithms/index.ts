import type { ColorEntry, ConversionAlgorithm } from '../types';
import { simpleAlgorithm } from './simple';
import { simpleEnhancedAlgorithm } from './simple-enhanced';
import { kmeansAdvancedAlgorithm } from './kmeans-advanced';
import { cartoonAlgorithm } from './cartoon';
import { highContrastAlgorithm } from './high-contrast';
import { floydSteinbergAlgorithm } from './floyd-steinberg';

export { simpleAlgorithm } from './simple';
export { simpleEnhancedAlgorithm } from './simple-enhanced';
export { kmeansAdvancedAlgorithm } from './kmeans-advanced';
export { cartoonAlgorithm } from './cartoon';
export { highContrastAlgorithm } from './high-contrast';
export { floydSteinbergAlgorithm } from './floyd-steinberg';

/**
 * Aplica o algoritmo de conversão selecionado
 */
export async function applyAlgorithm(
  algorithm: ConversionAlgorithm,
  imageSrc: string,
  width: number,
  height: number,
  palette: ColorEntry[]
): Promise<string> {
  switch (algorithm) {
    case 'simple':
      return simpleAlgorithm(imageSrc, width, height, palette);
    case 'simple-enhanced':
      return simpleEnhancedAlgorithm(imageSrc, width, height, palette);
    case 'kmeans-advanced':
      return kmeansAdvancedAlgorithm(imageSrc, width, height, palette);
    case 'cartoon':
      return cartoonAlgorithm(imageSrc, width, height, palette);
    case 'high-contrast':
      return highContrastAlgorithm(imageSrc, width, height, palette);
    case 'floyd-steinberg':
      return floydSteinbergAlgorithm(imageSrc, width, height, palette);
    default:
      return simpleAlgorithm(imageSrc, width, height, palette);
  }
}
