/**
 * Core types for CrochetPixel application
 * @module types
 */

/** Represents a color with name and hex value */
export interface ColorEntry {
  name: string;
  hex: string;
}

/** Available conversion algorithms */
export type ConversionAlgorithm =
  | 'simple'
  | 'simple-enhanced'
  | 'kmeans-advanced'
  | 'cartoon'
  | 'high-contrast'
  | 'floyd-steinberg';

/** Algorithm metadata for UI display */
export interface AlgorithmOption {
  id: ConversionAlgorithm;
  name: string;
  icon: string;
  description: string;
}

/** Grid dimensions for the crochet pattern */
export interface GridDimensions {
  width: number;
  height: number;
}

/** Settings for image generation */
export interface GenerationSettings {
  dimensions: GridDimensions;
  selectedPalette: string[];
  algorithm: ConversionAlgorithm;
}

/** RGB color tuple */
export type RGB = [number, number, number];

/** State for the main application */
export interface AppState {
  imageUrl: string | null;
  width: number;
  height: number;
  selectedPalette: string[];
  advancedMode: boolean;
  algorithm: ConversionAlgorithm;
  isGenerating: boolean;
  generatedUrl: string | null;
}
