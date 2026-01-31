import type { RGB, ColorEntry } from '../types';

/**
 * Converte uma cor hexadecimal para RGB
 */
export function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return { r: 0, g: 0, b: 0 };
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

/**
 * Converte RGB para hexadecimal
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = Math.round(clamp(x, 0, 255)).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

/**
 * Limita um valor entre min e max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Calcula a distância euclidiana entre duas cores RGB
 */
export function colorDistance(c1: RGB, c2: RGB): number {
  return Math.sqrt(
    Math.pow(c1.r - c2.r, 2) +
      Math.pow(c1.g - c2.g, 2) +
      Math.pow(c1.b - c2.b, 2)
  );
}

/**
 * Encontra a cor mais próxima na paleta
 */
export function getClosestColor(rgb: RGB, palette: ColorEntry[]): ColorEntry {
  let minDistance = Infinity;
  let closest = palette[0];

  for (const color of palette) {
    const paletteRgb = hexToRgb(color.hex);
    const distance = colorDistance(rgb, paletteRgb);

    if (distance < minDistance) {
      minDistance = distance;
      closest = color;
    }
  }

  return closest;
}

/**
 * Calcula a luminosidade de uma cor RGB
 */
export function getLuminance(rgb: RGB): number {
  return 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
}

/**
 * Ajusta o contraste de uma cor
 */
export function adjustContrast(rgb: RGB, factor: number): RGB {
  const adjust = (value: number) => {
    return clamp(((value / 255 - 0.5) * factor + 0.5) * 255, 0, 255);
  };

  return {
    r: adjust(rgb.r),
    g: adjust(rgb.g),
    b: adjust(rgb.b),
  };
}

/**
 * Ajusta a saturação de uma cor
 */
export function adjustSaturation(rgb: RGB, factor: number): RGB {
  const gray = getLuminance(rgb);
  return {
    r: clamp(gray + (rgb.r - gray) * factor, 0, 255),
    g: clamp(gray + (rgb.g - gray) * factor, 0, 255),
    b: clamp(gray + (rgb.b - gray) * factor, 0, 255),
  };
}
