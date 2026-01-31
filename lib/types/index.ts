/**
 * Core types for CrochetPixel application
 */

/** RGB color tuple */
export type RGB = [number, number, number]

/** RGB as object */
export interface RGBColor {
  r: number
  g: number
  b: number
}

/** Color entry with name and hex value */
export interface ColorEntry {
  name: string
  hex: string
}

/** Available conversion algorithms */
export type ConversionAlgorithm =
  | 'simple'
  | 'simple-enhanced'
  | 'kmeans-advanced'
  | 'cartoon'
  | 'high-contrast'
  | 'floyd-steinberg'

/** Algorithm option for UI display */
export interface AlgorithmOption {
  id: ConversionAlgorithm
  name: string
  icon: string
  description: string
}

/** Generator state */
export interface GeneratorState {
  imageUrl: string | null
  width: number
  height: number
  selectedPalette: string[]
  advancedMode: boolean
  algorithm: ConversionAlgorithm
  isGenerating: boolean
  generatedUrl: string | null
}
