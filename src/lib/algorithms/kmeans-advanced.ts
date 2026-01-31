import type { ColorEntry, RGB } from '../types';
import { getClosestColor, colorDistance } from '../utils/color';
import { loadImage, getImageData, renderBlocksToCanvas, createColorMatrix } from '../utils/canvas';

/**
 * Algoritmo K-Means avançado - agrupa cores semelhantes
 */
export async function kmeansAdvancedAlgorithm(
  imageSrc: string,
  width: number,
  height: number,
  palette: ColorEntry[]
): Promise<string> {
  const img = await loadImage(imageSrc);
  const imageData = getImageData(img, width, height);
  const { data } = imageData;

  // Extrai todas as cores da imagem
  const colors: RGB[] = [];
  for (let i = 0; i < data.length; i += 4) {
    colors.push({ r: data[i], g: data[i + 1], b: data[i + 2] });
  }

  // Executa K-means simplificado para agrupar cores
  const k = Math.min(palette.length, 16);
  const centroids = initializeCentroids(colors, k);
  const assignments = assignToClusters(colors, centroids);

  // Mapeia clusters para cores da paleta
  const clusterToPalette = new Map<number, ColorEntry>();
  for (let i = 0; i < k; i++) {
    clusterToPalette.set(i, getClosestColor(centroids[i], palette));
  }

  // Cria matriz de cores
  const colorMatrix: ColorEntry[][] = [];
  let idx = 0;

  for (let y = 0; y < height; y++) {
    const row: ColorEntry[] = [];
    for (let x = 0; x < width; x++) {
      const cluster = assignments[idx++];
      row.push(clusterToPalette.get(cluster) || palette[0]);
    }
    colorMatrix.push(row);
  }

  return renderBlocksToCanvas(colorMatrix);
}

function initializeCentroids(colors: RGB[], k: number): RGB[] {
  const centroids: RGB[] = [];
  const step = Math.floor(colors.length / k);

  for (let i = 0; i < k; i++) {
    centroids.push({ ...colors[i * step] });
  }

  // Executa algumas iterações de K-means
  for (let iter = 0; iter < 5; iter++) {
    const sums: RGB[] = Array(k).fill(null).map(() => ({ r: 0, g: 0, b: 0 }));
    const counts = Array(k).fill(0);

    for (const color of colors) {
      let minDist = Infinity;
      let nearest = 0;

      for (let c = 0; c < k; c++) {
        const dist = colorDistance(color, centroids[c]);
        if (dist < minDist) {
          minDist = dist;
          nearest = c;
        }
      }

      sums[nearest].r += color.r;
      sums[nearest].g += color.g;
      sums[nearest].b += color.b;
      counts[nearest]++;
    }

    for (let c = 0; c < k; c++) {
      if (counts[c] > 0) {
        centroids[c] = {
          r: Math.round(sums[c].r / counts[c]),
          g: Math.round(sums[c].g / counts[c]),
          b: Math.round(sums[c].b / counts[c]),
        };
      }
    }
  }

  return centroids;
}

function assignToClusters(colors: RGB[], centroids: RGB[]): number[] {
  return colors.map((color) => {
    let minDist = Infinity;
    let nearest = 0;

    for (let c = 0; c < centroids.length; c++) {
      const dist = colorDistance(color, centroids[c]);
      if (dist < minDist) {
        minDist = dist;
        nearest = c;
      }
    }

    return nearest;
  });
}
