export interface ColorEntry {
  hex: string
  name: string
}

export type ConversionAlgorithm =
  | 'simple'
  | 'simple-enhanced'
  | 'kmeans-advanced'
  | 'cartoon'
  | 'high-contrast'
  | 'floyd-steinberg'

export interface AlgorithmOption {
  id: ConversionAlgorithm
  name: string
  icon: string
  description: string
}
