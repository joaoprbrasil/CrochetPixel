import type { AlgorithmOption } from '@/lib/types';

/**
 * Available conversion algorithms with metadata
 * Used for rendering algorithm selection UI
 */
export const ALGORITHM_OPTIONS: AlgorithmOption[] = [
  {
    id: 'simple',
    name: 'Simples',
    icon: '⚡',
    description: 'Conversão direta, sem processamento. Mais rápido.',
  },
  {
    id: 'simple-enhanced',
    name: 'Simples+',
    icon: '✨',
    description: 'Conversão com redução de ruído. Resultado mais limpo.',
  },
  {
    id: 'kmeans-advanced',
    name: 'K-Means Pro',
    icon: '🧠',
    description: 'Analisa cores dominantes. Resultado mais fiel à imagem.',
  },
  {
    id: 'cartoon',
    name: 'Cartoon',
    icon: '🎨',
    description: 'Simplifica áreas, preserva bordas. Perfeito para crochê!',
  },
  {
    id: 'high-contrast',
    name: 'Alto Contraste',
    icon: '🌗',
    description: 'Aumenta contraste, cores mais vivas. Ótimo para padrões.',
  },
  {
    id: 'floyd-steinberg',
    name: 'Dithering',
    icon: '🔬',
    description: 'Gradientes suaves. Experimental, pode ter ruído.',
  },
];

/** Default algorithm for new projects */
export const DEFAULT_ALGORITHM = 'simple-enhanced' as const;
