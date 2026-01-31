import type { ColorEntry, RGB } from '../types';
import { getClosestColor, hexToRgb, clamp } from '../utils/color';
import { loadImage, getImageData, renderBlocksToCanvas } from '../utils/canvas';

/**
 * Algoritmo Floyd-Steinberg - dithering para transições suaves
 */
export async function floydSteinbergAlgorithm(
  imageSrc: string,
  width: number,
  height: number,
  palette: ColorEntry[]
): Promise<string> {
  const img = await loadImage(imageSrc);
  const imageData = getImageData(img, width, height);

  // Copia dados para poder modificar
  const pixels: RGB[][] = [];
  const { data } = imageData;

  for (let y = 0; y < height; y++) {
    const row: RGB[] = [];
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      row.push({ r: data[i], g: data[i + 1], b: data[i + 2] });
    }
    pixels.push(row);
  }

  const colorMatrix: ColorEntry[][] = [];

  // Aplica Floyd-Steinberg dithering
  for (let y = 0; y < height; y++) {
    const row: ColorEntry[] = [];
    for (let x = 0; x < width; x++) {
      const oldPixel = pixels[y][x];
      const closest = getClosestColor(oldPixel, palette);
      const newPixel = hexToRgb(closest.hex);

      row.push(closest);

      // Calcula erro
      const error = {
        r: oldPixel.r - newPixel.r,
        g: oldPixel.g - newPixel.g,
        b: oldPixel.b - newPixel.b,
      };

      // Distribui erro para pixels vizinhos
      distributeError(pixels, x + 1, y, error, 7 / 16, width, height);
      distributeError(pixels, x - 1, y + 1, error, 3 / 16, width, height);
      distributeError(pixels, x, y + 1, error, 5 / 16, width, height);
      distributeError(pixels, x + 1, y + 1, error, 1 / 16, width, height);
    }
    colorMatrix.push(row);
  }

  return renderBlocksToCanvas(colorMatrix);
}

function distributeError(
  pixels: RGB[][],
  x: number,
  y: number,
  error: RGB,
  factor: number,
  width: number,
  height: number
): void {
  if (x >= 0 && x < width && y >= 0 && y < height) {
    pixels[y][x] = {
      r: clamp(pixels[y][x].r + error.r * factor, 0, 255),
      g: clamp(pixels[y][x].g + error.g * factor, 0, 255),
      b: clamp(pixels[y][x].b + error.b * factor, 0, 255),
    };
  }
}
