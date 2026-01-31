// Representa uma cor na paleta
export interface ColorEntry {
  hex: string;
  name: string;
}

// Algoritmos de conversão disponíveis
export type ConversionAlgorithm =
  | 'simple'
  | 'simple-enhanced'
  | 'kmeans-advanced'
  | 'cartoon'
  | 'high-contrast'
  | 'floyd-steinberg';

// Configuração de geração do gráfico
export interface GeneratorConfig {
  width: number;
  height: number;
  algorithm: ConversionAlgorithm;
  palette: ColorEntry[];
}

// Resultado da conversão
export interface ConversionResult {
  imageData: string; // base64 data URL
  dimensions: {
    width: number;
    height: number;
  };
}

// Estado do gerador
export interface GeneratorState {
  image: string | null;
  width: number;
  height: number;
  algorithm: ConversionAlgorithm;
  selectedColors: ColorEntry[];
  result: string | null;
  isProcessing: boolean;
}

// Props comuns para componentes
export interface BaseComponentProps {
  className?: string;
}

// Opção de algoritmo para UI
export interface AlgorithmOption {
  value: ConversionAlgorithm;
  label: string;
  description: string;
}

// Tipo RGB para manipulação de cores
export interface RGB {
  r: number;
  g: number;
  b: number;
}
