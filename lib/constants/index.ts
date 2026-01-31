import type { ColorEntry } from '@/lib/types'

// ============================================
// DIMENSIONS
// ============================================
export const MIN_DIMENSION = 5
export const MAX_DIMENSION = 200
export const DEFAULT_WIDTH = 50
export const DEFAULT_HEIGHT = 50

// ============================================
// COLORS - BASIC PALETTE (21 colors)
// ============================================
export const BASIC_COLORS: ColorEntry[] = [
  { hex: '#FFFFFF', name: 'White' },
  { hex: '#000000', name: 'Black' },
  { hex: '#808080', name: 'Gray' },
  { hex: '#C0C0C0', name: 'Silver' },
  { hex: '#FF0000', name: 'Red' },
  { hex: '#8B0000', name: 'Dark Red' },
  { hex: '#FF6B6B', name: 'Light Red' },
  { hex: '#FFA500', name: 'Orange' },
  { hex: '#FFFF00', name: 'Yellow' },
  { hex: '#FFD700', name: 'Gold' },
  { hex: '#00FF00', name: 'Lime' },
  { hex: '#008000', name: 'Green' },
  { hex: '#90EE90', name: 'Light Green' },
  { hex: '#00FFFF', name: 'Cyan' },
  { hex: '#0000FF', name: 'Blue' },
  { hex: '#000080', name: 'Navy' },
  { hex: '#ADD8E6', name: 'Light Blue' },
  { hex: '#800080', name: 'Purple' },
  { hex: '#FF00FF', name: 'Magenta' },
  { hex: '#FFC0CB', name: 'Pink' },
  { hex: '#8B4513', name: 'Brown' },
]

// ============================================
// COLORS - ADVANCED PALETTE (150+ colors)
// ============================================
export const ADVANCED_COLORS: ColorEntry[] = [
  ...BASIC_COLORS,
  // Reds
  { hex: '#CD5C5C', name: 'Indian Red' },
  { hex: '#F08080', name: 'Light Coral' },
  { hex: '#FA8072', name: 'Salmon' },
  { hex: '#E9967A', name: 'Dark Salmon' },
  { hex: '#DC143C', name: 'Crimson' },
  { hex: '#B22222', name: 'Fire Brick' },
  // Oranges
  { hex: '#FF7F50', name: 'Coral' },
  { hex: '#FF6347', name: 'Tomato' },
  { hex: '#FF4500', name: 'Orange Red' },
  { hex: '#FF8C00', name: 'Dark Orange' },
  // Yellows
  { hex: '#FAFAD2', name: 'Light Goldenrod' },
  { hex: '#FFFFE0', name: 'Light Yellow' },
  { hex: '#FFFACD', name: 'Lemon Chiffon' },
  { hex: '#F0E68C', name: 'Khaki' },
  { hex: '#BDB76B', name: 'Dark Khaki' },
  // Greens
  { hex: '#ADFF2F', name: 'Green Yellow' },
  { hex: '#7FFF00', name: 'Chartreuse' },
  { hex: '#32CD32', name: 'Lime Green' },
  { hex: '#228B22', name: 'Forest Green' },
  { hex: '#006400', name: 'Dark Green' },
  { hex: '#9ACD32', name: 'Yellow Green' },
  { hex: '#8FBC8F', name: 'Dark Sea Green' },
  { hex: '#20B2AA', name: 'Light Sea Green' },
  { hex: '#3CB371', name: 'Medium Sea Green' },
  { hex: '#2E8B57', name: 'Sea Green' },
  { hex: '#556B2F', name: 'Dark Olive Green' },
  { hex: '#6B8E23', name: 'Olive Drab' },
  { hex: '#808000', name: 'Olive' },
  // Cyans & Teals
  { hex: '#E0FFFF', name: 'Light Cyan' },
  { hex: '#00CED1', name: 'Dark Turquoise' },
  { hex: '#40E0D0', name: 'Turquoise' },
  { hex: '#48D1CC', name: 'Medium Turquoise' },
  { hex: '#008B8B', name: 'Dark Cyan' },
  { hex: '#008080', name: 'Teal' },
  // Blues
  { hex: '#87CEEB', name: 'Sky Blue' },
  { hex: '#87CEFA', name: 'Light Sky Blue' },
  { hex: '#00BFFF', name: 'Deep Sky Blue' },
  { hex: '#B0C4DE', name: 'Light Steel Blue' },
  { hex: '#1E90FF', name: 'Dodger Blue' },
  { hex: '#6495ED', name: 'Cornflower Blue' },
  { hex: '#4682B4', name: 'Steel Blue' },
  { hex: '#4169E1', name: 'Royal Blue' },
  { hex: '#0000CD', name: 'Medium Blue' },
  { hex: '#00008B', name: 'Dark Blue' },
  { hex: '#191970', name: 'Midnight Blue' },
  // Purples
  { hex: '#E6E6FA', name: 'Lavender' },
  { hex: '#D8BFD8', name: 'Thistle' },
  { hex: '#DDA0DD', name: 'Plum' },
  { hex: '#EE82EE', name: 'Violet' },
  { hex: '#DA70D6', name: 'Orchid' },
  { hex: '#BA55D3', name: 'Medium Orchid' },
  { hex: '#9370DB', name: 'Medium Purple' },
  { hex: '#8A2BE2', name: 'Blue Violet' },
  { hex: '#9400D3', name: 'Dark Violet' },
  { hex: '#9932CC', name: 'Dark Orchid' },
  { hex: '#8B008B', name: 'Dark Magenta' },
  { hex: '#4B0082', name: 'Indigo' },
  { hex: '#6A5ACD', name: 'Slate Blue' },
  { hex: '#483D8B', name: 'Dark Slate Blue' },
  // Pinks
  { hex: '#FFB6C1', name: 'Light Pink' },
  { hex: '#FF69B4', name: 'Hot Pink' },
  { hex: '#FF1493', name: 'Deep Pink' },
  { hex: '#C71585', name: 'Medium Violet Red' },
  { hex: '#DB7093', name: 'Pale Violet Red' },
  // Browns
  { hex: '#FFF8DC', name: 'Cornsilk' },
  { hex: '#FFEBCD', name: 'Blanched Almond' },
  { hex: '#FFE4C4', name: 'Bisque' },
  { hex: '#FFDEAD', name: 'Navajo White' },
  { hex: '#F5DEB3', name: 'Wheat' },
  { hex: '#DEB887', name: 'Burly Wood' },
  { hex: '#D2B48C', name: 'Tan' },
  { hex: '#BC8F8F', name: 'Rosy Brown' },
  { hex: '#F4A460', name: 'Sandy Brown' },
  { hex: '#DAA520', name: 'Goldenrod' },
  { hex: '#B8860B', name: 'Dark Goldenrod' },
  { hex: '#CD853F', name: 'Peru' },
  { hex: '#D2691E', name: 'Chocolate' },
  { hex: '#A0522D', name: 'Sienna' },
  { hex: '#A52A2A', name: 'Brown' },
  { hex: '#800000', name: 'Maroon' },
  // Grays
  { hex: '#DCDCDC', name: 'Gainsboro' },
  { hex: '#D3D3D3', name: 'Light Gray' },
  { hex: '#A9A9A9', name: 'Dark Gray' },
  { hex: '#696969', name: 'Dim Gray' },
  { hex: '#778899', name: 'Light Slate Gray' },
  { hex: '#708090', name: 'Slate Gray' },
  { hex: '#2F4F4F', name: 'Dark Slate Gray' },
  // Whites & Creams
  { hex: '#FFFAFA', name: 'Snow' },
  { hex: '#F0FFF0', name: 'Honeydew' },
  { hex: '#F5FFFA', name: 'Mint Cream' },
  { hex: '#F0FFFF', name: 'Azure' },
  { hex: '#F0F8FF', name: 'Alice Blue' },
  { hex: '#F8F8FF', name: 'Ghost White' },
  { hex: '#F5F5F5', name: 'White Smoke' },
  { hex: '#FFF5EE', name: 'Seashell' },
  { hex: '#F5F5DC', name: 'Beige' },
  { hex: '#FDF5E6', name: 'Old Lace' },
  { hex: '#FFFAF0', name: 'Floral White' },
  { hex: '#FFFFF0', name: 'Ivory' },
  { hex: '#FAEBD7', name: 'Antique White' },
  { hex: '#FAF0E6', name: 'Linen' },
  { hex: '#FFF0F5', name: 'Lavender Blush' },
  { hex: '#FFE4E1', name: 'Misty Rose' },
]

/** Default algorithm for new projects */
export const DEFAULT_ALGORITHM = 'simple-enhanced' as const
export const DEFAULT_SELECTED_COLORS = ['#000000', '#FFFFFF']