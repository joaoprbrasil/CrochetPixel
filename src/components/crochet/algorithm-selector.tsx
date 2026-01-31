'use client';

import { Card } from './card';
import type { ConversionAlgorithm } from '../../lib/types';
import { ALGORITHM_OPTIONS } from '../../lib/constants';

interface AlgorithmSelectorProps {
  algorithm: ConversionAlgorithm;
  onAlgorithmChange: (algorithm: ConversionAlgorithm) => void;
}

export function AlgorithmSelector({
  algorithm,
  onAlgorithmChange,
}: AlgorithmSelectorProps) {
  return (
    <Card title="4. Algoritmo de conversao">
      <div className="space-y-2">
        {ALGORITHM_OPTIONS.map((option) => (
          <label
            key={option.value}
            className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
              algorithm === option.value
                ? 'bg-rose-50 border border-rose-200'
                : 'hover:bg-gray-50 border border-transparent'
            }`}
          >
            <input
              type="radio"
              name="algorithm"
              value={option.value}
              checked={algorithm === option.value}
              onChange={() => onAlgorithmChange(option.value)}
              className="mt-1 accent-rose-500"
            />
            <div>
              <div className="font-medium text-gray-800">{option.label}</div>
              <div className="text-sm text-gray-500">{option.description}</div>
            </div>
          </label>
        ))}
      </div>
    </Card>
  );
}
