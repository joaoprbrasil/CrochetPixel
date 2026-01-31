'use client';

import { Card } from './card';
import { MIN_DIMENSION, MAX_DIMENSION } from '../../lib/constants';

interface DimensionInputsProps {
  width: number;
  height: number;
  onWidthChange: (width: number) => void;
  onHeightChange: (height: number) => void;
}

export function DimensionInputs({
  width,
  height,
  onWidthChange,
  onHeightChange,
}: DimensionInputsProps) {
  return (
    <Card title="2. Dimensoes do grafico">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Largura (pontos)
          </label>
          <input
            type="number"
            value={width}
            onChange={(e) => onWidthChange(Number(e.target.value))}
            min={MIN_DIMENSION}
            max={MAX_DIMENSION}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-200 focus:border-rose-300 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Altura (pontos)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => onHeightChange(Number(e.target.value))}
            min={MIN_DIMENSION}
            max={MAX_DIMENSION}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-200 focus:border-rose-300 outline-none transition-all"
          />
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-2">
        Min: {MIN_DIMENSION} | Max: {MAX_DIMENSION} pontos
      </p>
    </Card>
  );
}
