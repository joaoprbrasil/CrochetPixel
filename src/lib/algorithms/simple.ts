import type { ColorEntry } from '../types';
import { getClosestColor } from '../utils/color';
import { loadImage, getImageData, renderBlocksToCanvas, createColorMatrix } from '../utils/canvas';

/**
 * Algoritmo simples - correspondência direta de cores
 */
export async function simpleAlgorithm(
  imageSrc: string,
  width: number,
  height: number,
  palette: ColorEntry[]
): Promise<string> {
  const img = await loadImage(imageSrc);
  const imageData = getImageData(img, width, height);

  const getColor = (r: number, g: number, b: number, pal: ColorEntry[]) => {
    return getClosestColor({ r, g, b }, pal);
  };

  const colorMatrix = createColorMatrix(imageData, palette, getColor);
  return renderBlocksToCanvas(colorMatrix);
}
