import type { AlgorithmOption } from '../types';

export const ALGORITHM_OPTIONS: AlgorithmOption[] = [
  {
    value: 'simple',
    label: 'Simples',
    description: 'Conversão rápida com correspondência direta de cores',
  },
  {
    value: 'simple-enhanced',
    label: 'Simples Aprimorado',
    description: 'Melhor correspondência de cores com suavização',
  },
  {
    value: 'kmeans-advanced',
    label: 'K-Means Avançado',
    description: 'Agrupamento inteligente de cores para resultados mais limpos',
  },
  {
    value: 'cartoon',
    label: 'Cartoon',
    description: 'Estilo cartunizado com bordas definidas',
  },
  {
    value: 'high-contrast',
    label: 'Alto Contraste',
    description: 'Aumenta o contraste para padrões mais visíveis',
  },
  {
    value: 'floyd-steinberg',
    label: 'Floyd-Steinberg',
    description: 'Dithering para transições suaves entre cores',
  },
];

// Dimensões padrão
export const DEFAULT_WIDTH = 50;
export const DEFAULT_HEIGHT = 50;
export const MIN_DIMENSION = 10;
export const MAX_DIMENSION = 200;

// Tamanho do pixel no canvas de saída
export const PIXEL_SIZE = 10;
