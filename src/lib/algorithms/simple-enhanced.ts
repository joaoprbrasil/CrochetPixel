import type { ColorEntry, RGB } from '../types';
import { getClosestColor, hexToRgb } from '../utils/color';
import { loadImage, getImageData, renderBlocksToCanvas } from '../utils/canvas';

/**
 * Algoritmo simples aprimorado - com suavização
 */
export async function simpleEnhancedAlgorithm(
  imageSrc: string,
  width: number,
  height: number,
  palette: ColorEntry[]
): Promise<string> {
  const img = await loadImage(imageSrc);
  const imageData = getImageData(img, width, height);
  const { data } = imageData;

  const colorMatrix: ColorEntry[][] = [];

  for (let y = 0; y < height; y++) {
    const row: ColorEntry[] = [];
    for (let x = 0; x < width; x++) {
      // Média com pixels vizinhos para suavização
      const avgColor = getAverageColor(data, width, height, x, y);
      const closest = getClosestColor(avgColor, palette);
      row.push(closest);
    }
    colorMatrix.push(row);
  }

  return renderBlocksToCanvas(colorMatrix);
}

function getAverageColor(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  x: number,
  y: number
): RGB {
  let r = 0, g = 0, b = 0, count = 0;

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const i = (ny * width + nx) * 4;
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }
    }
  }

  return {
    r: Math.round(r / count),
    g: Math.round(g / count),
    b: Math.round(b / count),
  };
}
