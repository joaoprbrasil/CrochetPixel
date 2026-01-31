'use client';

import { cn } from '@/lib/utils';
import type { ColorEntry } from '@/lib/types';

interface ColorPaletteProps {
  colors: ColorEntry[];
  selectedColors: string[];
  advancedMode: boolean;
  onToggleColor: (hex: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onToggleAdvanced: (enabled: boolean) => void;
}

/**
 * Color palette selection component
 * Displays grid of colors with selection state
 */
export function ColorPalette({
  colors,
  selectedColors,
  advancedMode,
  onToggleColor,
  onSelectAll,
  onDeselectAll,
  onToggleAdvanced,
}: ColorPaletteProps) {
  return (
    <div className="space-y-5">
      {/* Header with advanced toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-pink-700">3. Selecione as cores</h2>
        <label className="flex cursor-pointer select-none items-center gap-2">
          <input
            type="checkbox"
            checked={advancedMode}
            onChange={(e) => onToggleAdvanced(e.target.checked)}
            className="size-[18px] cursor-pointer accent-pink-500"
          />
          <span className="text-sm font-semibold text-pink-900">Modo avançado</span>
        </label>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">
          {selectedColors.length}{' '}
          {selectedColors.length === 1 ? 'cor selecionada' : 'cores selecionadas'}
        </p>
        <div className="flex gap-2">
          <button
            onClick={onSelectAll}
            className="rounded-lg bg-pink-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-pink-600"
          >
            Selecionar todas
          </button>
          <button
            onClick={onDeselectAll}
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600 transition-all hover:bg-gray-200"
          >
            Limpar
          </button>
        </div>
      </div>

      {/* Color grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(60px,1fr))] gap-3">
        {colors.map((color) => {
          const isSelected = selectedColors.includes(color.hex);
          return (
            <button
              key={color.hex}
              onClick={() => onToggleColor(color.hex)}
              title={color.name}
              className={cn(
                'relative flex size-[60px] items-center justify-center rounded-xl transition-all duration-200',
                isSelected
                  ? 'ring-4 ring-pink-500/20 border-3 border-pink-500'
                  : 'border-2 border-gray-200 hover:border-pink-300'
              )}
              style={{ backgroundColor: color.hex }}
            >
              {isSelected && (
                <span
                  className="text-xl font-bold"
                  style={{
                    color: isLightColor(color.hex) ? '#000' : '#fff',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  }}
                >
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Determines if a hex color is light (for contrast) */
function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
}
