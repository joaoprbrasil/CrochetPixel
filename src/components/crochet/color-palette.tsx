'use client';

import { Card } from './card';
import type { ColorEntry } from '../../lib/types';
import { BASIC_PALETTE, ADVANCED_PALETTE } from '../../lib/constants';

interface ColorPaletteProps {
  selectedColors: ColorEntry[];
  onToggleColor: (color: ColorEntry) => void;
  onSelectAll: (palette: ColorEntry[]) => void;
  onDeselectAll: (keepMinimum: ColorEntry[]) => void;
}

export function ColorPalette({
  selectedColors,
  onToggleColor,
  onSelectAll,
  onDeselectAll,
}: ColorPaletteProps) {
  const isColorSelected = (color: ColorEntry) =>
    selectedColors.some((c) => c.hex === color.hex);

  const renderColorGrid = (palette: ColorEntry[], title: string) => (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className="space-x-2">
          <button
            onClick={() => onSelectAll(palette)}
            className="text-xs text-rose-500 hover:text-rose-600"
          >
            Todas
          </button>
          <button
            onClick={() => onDeselectAll(palette)}
            className="text-xs text-gray-400 hover:text-gray-500"
          >
            Minimo
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {palette.map((color) => (
          <button
            key={color.hex}
            onClick={() => onToggleColor(color)}
            title={color.name}
            className={`w-6 h-6 rounded border-2 transition-all ${
              isColorSelected(color)
                ? 'border-gray-800 scale-110 shadow-md'
                : 'border-transparent opacity-50 hover:opacity-75'
            }`}
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <Card title="3. Paleta de cores">
      {renderColorGrid(BASIC_PALETTE, 'Cores basicas')}
      {renderColorGrid(ADVANCED_PALETTE, 'Cores avancadas')}

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <span className="font-medium">{selectedColors.length}</span> cores
          selecionadas
        </p>
      </div>
    </Card>
  );
}
