import type { ColorEntry, AlgorithmOption } from '@/lib/types'

// ============================================
// DIMENSIONS
// ============================================
export const DEFAULT_WIDTH = 60
export const DEFAULT_HEIGHT = 60
export const MIN_DIMENSION = 5
export const MAX_DIMENSION = 200
export const BLOCK_SIZE = 10

// ============================================
// ALGORITHMS
// ============================================
export const ALGORITHM_OPTIONS: AlgorithmOption[] = [
  { id: 'simple', name: 'Simples', icon: '⚡', description: 'Conversão direta, mais rápido' },
  { id: 'simple-enhanced', name: 'Simples+', icon: '✨', description: 'Com redução de ruído' },
  { id: 'kmeans-advanced', name: 'K-Means Pro', icon: '🧠', description: 'Analisa cores dominantes' },
  { id: 'cartoon', name: 'Cartoon', icon: '🎨', description: 'Preserva bordas, ideal para crochê' },
  { id: 'high-contrast', name: 'Alto Contraste', icon: '🌗', description: 'Cores mais vivas' },
  { id: 'floyd-steinberg', name: 'Dithering', icon: '🔬', description: 'Gradientes suaves' },
]

export const DEFAULT_ALGORITHM = 'simple-enhanced' as const

// ============================================
// COLOR PALETTES
// ============================================
export const BASIC_PALETTE: ColorEntry[] = [
  { name: 'Branco', hex: '#FFFFFF' },
  { name: 'Preto', hex: '#000000' },
  { name: 'Cinza', hex: '#7F7F7F' },
  { name: 'Marrom', hex: '#804000' },
  { name: 'Vermelho', hex: '#FF0000' },
  { name: 'Laranja', hex: '#FF8000' },
  { name: 'Amarelo', hex: '#FFFF00' },
  { name: 'Verde Lima', hex: '#7FFF00' },
  { name: 'Verde', hex: '#00FF00' },
  { name: 'Ciano', hex: '#00FFFF' },
  { name: 'Azul', hex: '#0000FF' },
  { name: 'Violeta', hex: '#7F00FF' },
  { name: 'Magenta', hex: '#FF00FF' },
  { name: 'Rosa', hex: '#FF0080' },
  { name: 'Coral', hex: '#FF7F50' },
  { name: 'Salmão', hex: '#FA8072' },
  { name: 'Turquesa', hex: '#40E0D0' },
  { name: 'Verde Mar', hex: '#2E8B57' },
  { name: 'Azul Royal', hex: '#4169E1' },
  { name: 'Índigo', hex: '#4B0082' },
]

export const ADVANCED_PALETTE: ColorEntry[] = [
  // Whites & Grays
  { name: 'Branco Neve', hex: '#FFFAFA' },
  { name: 'Marfim', hex: '#FFFFF0' },
  { name: 'Cinza Claro', hex: '#D3D3D3' },
  { name: 'Cinza Prata', hex: '#C0C0C0' },
  { name: 'Cinza Escuro', hex: '#404040' },
  { name: 'Cinza Ardósia', hex: '#708090' },
  // Reds
  { name: 'Vermelho Vinho', hex: '#722F37' },
  { name: 'Bordô', hex: '#9B111E' },
  { name: 'Carmim', hex: '#DC143C' },
  { name: 'Vermelho Tijolo', hex: '#B22222' },
  { name: 'Terracota', hex: '#E2725B' },
  // Pinks
  { name: 'Rosa Bebê', hex: '#F4C2C2' },
  { name: 'Rosa Quente', hex: '#FF69B4' },
  { name: 'Rosa Profundo', hex: '#FF1493' },
  { name: 'Fúcsia', hex: '#C74375' },
  // Oranges
  { name: 'Laranja Queimado', hex: '#CC5500' },
  { name: 'Tangerina', hex: '#F28500' },
  { name: 'Pêssego', hex: '#FFDAB9' },
  { name: 'Damasco', hex: '#FBCEB1' },
  // Yellows
  { name: 'Ouro', hex: '#FFD700' },
  { name: 'Amarelo Canário', hex: '#FFEF00' },
  { name: 'Creme', hex: '#FFFACD' },
  { name: 'Mostarda', hex: '#FFDB58' },
  { name: 'Baunilha', hex: '#F3E5AB' },
  // Greens
  { name: 'Verde Garrafa', hex: '#006A4E' },
  { name: 'Verde Floresta', hex: '#228B22' },
  { name: 'Verde Oliva', hex: '#808000' },
  { name: 'Verde Jade', hex: '#00A86B' },
  { name: 'Verde Esmeralda', hex: '#50C878' },
  { name: 'Verde Menta', hex: '#98FF98' },
  { name: 'Verde Pistache', hex: '#93C572' },
  // Blues
  { name: 'Azul Marinho', hex: '#000080' },
  { name: 'Azul Cobalto', hex: '#0047AB' },
  { name: 'Azul Aço', hex: '#4682B4' },
  { name: 'Azul Bebê', hex: '#89CFF0' },
  { name: 'Azul Céu', hex: '#87CEEB' },
  { name: 'Azul Tiffany', hex: '#0ABAB5' },
  // Purples
  { name: 'Roxo', hex: '#800080' },
  { name: 'Ametista', hex: '#9966CC' },
  { name: 'Lavanda', hex: '#E6E6FA' },
  { name: 'Lilás', hex: '#C8A2C8' },
  { name: 'Orquídea', hex: '#DA70D6' },
  // Browns
  { name: 'Marrom Café', hex: '#6F4E37' },
  { name: 'Marrom Chocolate', hex: '#D2691E' },
  { name: 'Sépia', hex: '#704214' },
  { name: 'Caramelo', hex: '#AF6E4D' },
  { name: 'Bronze', hex: '#CD7F32' },
  { name: 'Bege', hex: '#F5F5DC' },
  { name: 'Areia', hex: '#C2B280' },
]

export const DEFAULT_SELECTED_COLORS = ['#000000', '#FFFFFF']
