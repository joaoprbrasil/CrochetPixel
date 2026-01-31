'use client';

import { MIN_DIMENSION, MAX_DIMENSION } from '@/lib/constants';

interface DimensionInputsProps {
  width: number;
  height: number;
  onWidthChange: (width: number) => void;
  onHeightChange: (height: number) => void;
}

/**
 * Width and height input controls
 */
export function DimensionInputs({
  width,
  height,
  onWidthChange,
  onHeightChange,
}: DimensionInputsProps) {
  return (
    <div className="flex items-center justify-center gap-6">
      <div className="flex min-w-[140px] flex-col gap-2">
        <label className="text-sm font-semibold text-pink-900">Largura</label>
        <input
          type="number"
          value={width}
          onChange={(e) => onWidthChange(Number(e.target.value))}
          className="rounded-xl border-2 border-pink-300 p-3 text-center text-lg font-semibold text-pink-700 outline-none transition-all focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
          min={MIN_DIMENSION}
          max={MAX_DIMENSION}
        />
        <span className="text-center text-xs text-muted-foreground">blocos</span>
      </div>

      <div className="mt-5 text-3xl font-light text-pink-300">×</div>

      <div className="flex min-w-[140px] flex-col gap-2">
        <label className="text-sm font-semibold text-pink-900">Altura</label>
        <input
          type="number"
          value={height}
          onChange={(e) => onHeightChange(Number(e.target.value))}
          className="rounded-xl border-2 border-pink-300 p-3 text-center text-lg font-semibold text-pink-700 outline-none transition-all focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
          min={MIN_DIMENSION}
          max={MAX_DIMENSION}
        />
        <span className="text-center text-xs text-muted-foreground">blocos</span>
      </div>
    </div>
  );
}
