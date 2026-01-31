import type { ColorEntry, RGB } from '../types';
import { getClosestColor, adjustContrast, adjustSaturation } from '../utils/color';
import { loadImage, getImageData, renderBlocksToCanvas } from '../utils/canvas';

/**
 * Algoritmo Cartoon - estilo cartunizado com bordas definidas
 */
export async function cartoonAlgorithm(
  imageSrc: string,
  width: number,
  height: number,
  palette: ColorEntry[]
): Promise<string> {
  const img = await loadImage(imageSrc);
  const imageData = getImageData(img, width, height);
  const { data } = imageData;

  // Primeiro passo: detectar bordas
  const edges = detectEdges(data, width, height);

  // Segundo passo: quantizar e estilizar
  const colorMatrix: ColorEntry[][] = [];

  for (let y = 0; y < height; y++) {
    const row: ColorEntry[] = [];
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const isEdge = edges[y * width + x];

      let rgb: RGB = { r: data[i], g: data[i + 1], b: data[i + 2] };

      // Aumenta contraste e saturação para efeito cartoon
      rgb = adjustContrast(rgb, 1.3);
      rgb = adjustSaturation(rgb, 1.2);

      // Se for borda, escurece a cor
      if (isEdge) {
        rgb = {
          r: Math.max(0, rgb.r * 0.5),
          g: Math.max(0, rgb.g * 0.5),
          b: Math.max(0, rgb.b * 0.5),
        };
      }

      const closest = getClosestColor(rgb, palette);
      row.push(closest);
    }
    colorMatrix.push(row);
  }

  return renderBlocksToCanvas(colorMatrix);
}

function detectEdges(
  data: Uint8ClampedArray,
  width: number,
  height: number
): boolean[] {
  const edges: boolean[] = [];
  const threshold = 30;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      let isEdge = false;

      // Compara com pixel à direita
      if (x < width - 1) {
        const ni = i + 4;
        const diff = Math.abs(data[i] - data[ni]) +
          Math.abs(data[i + 1] - data[ni + 1]) +
          Math.abs(data[i + 2] - data[ni + 2]);
        if (diff > threshold * 3) isEdge = true;
      }

      // Compara com pixel abaixo
      if (y < height - 1) {
        const ni = i + width * 4;
        const diff = Math.abs(data[i] - data[ni]) +
          Math.abs(data[i + 1] - data[ni + 1]) +
          Math.abs(data[i + 2] - data[ni + 2]);
        if (diff > threshold * 3) isEdge = true;
      }

      edges.push(isEdge);
    }
  }

  return edges;
}
