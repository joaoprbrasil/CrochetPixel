import type { ColorEntry } from '../types';
import { hexToRgb } from './color';
import { PIXEL_SIZE } from '../constants';

/**
 * Carrega uma imagem a partir de uma URL/data URL
 */
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Obtém os dados de pixels de uma imagem redimensionada
 */
export function getImageData(
  img: HTMLImageElement,
  width: number,
  height: number
): ImageData {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Não foi possível obter contexto 2D');
  }

  ctx.drawImage(img, 0, 0, width, height);
  return ctx.getImageData(0, 0, width, height);
}

/**
 * Renderiza uma matriz de cores em um canvas com pixels ampliados
 */
export function renderBlocksToCanvas(
  colorMatrix: ColorEntry[][],
  showGrid: boolean = true
): string {
  const height = colorMatrix.length;
  const width = colorMatrix[0]?.length || 0;

  const canvas = document.createElement('canvas');
  canvas.width = width * PIXEL_SIZE;
  canvas.height = height * PIXEL_SIZE;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Não foi possível obter contexto 2D');
  }

  // Desenha os pixels
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const color = colorMatrix[y][x];
      ctx.fillStyle = color.hex;
      ctx.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
    }
  }

  // Desenha a grade se habilitada
  if (showGrid) {
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 0.5;

    for (let x = 0; x <= width; x++) {
      ctx.beginPath();
      ctx.moveTo(x * PIXEL_SIZE, 0);
      ctx.lineTo(x * PIXEL_SIZE, height * PIXEL_SIZE);
      ctx.stroke();
    }

    for (let y = 0; y <= height; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * PIXEL_SIZE);
      ctx.lineTo(width * PIXEL_SIZE, y * PIXEL_SIZE);
      ctx.stroke();
    }
  }

  return canvas.toDataURL('image/png');
}

/**
 * Faz download de uma imagem data URL
 */
export function downloadImage(dataUrl: string, filename: string): void {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Cria uma matriz de cores a partir de ImageData usando a paleta
 */
export function createColorMatrix(
  imageData: ImageData,
  palette: ColorEntry[],
  getColor: (r: number, g: number, b: number, palette: ColorEntry[]) => ColorEntry
): ColorEntry[][] {
  const { data, width, height } = imageData;
  const matrix: ColorEntry[][] = [];

  for (let y = 0; y < height; y++) {
    const row: ColorEntry[] = [];
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const color = getColor(data[i], data[i + 1], data[i + 2], palette);
      row.push(color);
    }
    matrix.push(row);
  }

  return matrix;
}
