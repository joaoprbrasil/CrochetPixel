import type { ColorEntry, RGB } from '../types';
import { getClosestColor, adjustContrast, clamp } from '../utils/color';
import { loadImage, getImageData, renderBlocksToCanvas } from '../utils/canvas';

/**
 * Algoritmo de alto contraste - aumenta definição do padrão
 */
export async function highContrastAlgorithm(
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
      const i = (y * width + x) * 4;

      let rgb: RGB = { r: data[i], g: data[i + 1], b: data[i + 2] };

      // Aplica unsharp mask para aumentar nitidez
      rgb = applyUnsharpMask(data, width, height, x, y, rgb);

      // Aumenta contraste
      rgb = adjustContrast(rgb, 1.5);

      const closest = getClosestColor(rgb, palette);
      row.push(closest);
    }
    colorMatrix.push(row);
  }

  return renderBlocksToCanvas(colorMatrix);
}

function applyUnsharpMask(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  x: number,
  y: number,
  original: RGB
): RGB {
  // Calcula média dos vizinhos (blur simples)
  let blurR = 0, blurG = 0, blurB = 0, count = 0;

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const ni = (ny * width + nx) * 4;
        blurR += data[ni];
        blurG += data[ni + 1];
        blurB += data[ni + 2];
        count++;
      }
    }
  }

  blurR /= count;
  blurG /= count;
  blurB /= count;

  // Aplica unsharp mask: original + (original - blur) * amount
  const amount = 0.5;
  return {
    r: clamp(original.r + (original.r - blurR) * amount, 0, 255),
    g: clamp(original.g + (original.g - blurG) * amount, 0, 255),
    b: clamp(original.b + (original.b - blurB) * amount, 0, 255),
  };
}
