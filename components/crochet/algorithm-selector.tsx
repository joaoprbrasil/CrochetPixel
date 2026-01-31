'use client';

import { cn } from '@/lib/utils';
import type { ConversionAlgorithm } from '@/lib/types';
import { ALGORITHM_OPTIONS } from '@/lib/constants';

interface AlgorithmSelectorProps {
  selected: ConversionAlgorithm;
  onSelect: (algorithm: ConversionAlgorithm) => void;
}

/**
 * Algorithm selection grid
 * Displays all available conversion algorithms with descriptions
 */
export function AlgorithmSelector({
  selected,
  onSelect,
}: AlgorithmSelectorProps) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-pink-700">
          4. Algoritmo de conversão
        </h2>
        <p className="text-center text-sm text-muted-foreground">
          Escolha como a imagem será convertida em pixels
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {ALGORITHM_OPTIONS.map((algo) => (
          <button
            key={algo.id}
            onClick={() => onSelect(algo.id)}
            className={cn(
              'rounded-xl border-2 p-5 text-center transition-all duration-300',
              'bg-gray-50 hover:border-pink-300',
              selected === algo.id &&
                'border-pink-500 bg-pink-50 ring-4 ring-pink-500/10'
            )}
          >
            <div className="mb-2 text-4xl">{algo.icon}</div>
            <h3 className="mb-2 text-lg font-bold text-pink-900">{algo.name}</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              {algo.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
