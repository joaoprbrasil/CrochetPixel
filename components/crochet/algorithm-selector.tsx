'use client'

import { cn } from '@/lib/utils'
import { useLanguage } from '@/lib/i18n'
import type { ConversionAlgorithm } from '@/lib/types'

interface AlgorithmSelectorProps {
  selected: ConversionAlgorithm
  onSelect: (algorithm: ConversionAlgorithm) => void
}

const ALGORITHM_ICONS: Record<ConversionAlgorithm, string> = {
  'simple': '⚡',
  'simple-enhanced': '✨',
  'kmeans-advanced': '🧠',
  'cartoon': '🎨',
  'high-contrast': '🌗',
  'floyd-steinberg': '🔬',
}

const ALGORITHM_KEYS: Record<ConversionAlgorithm, 'simple' | 'simpleEnhanced' | 'kmeansAdvanced' | 'cartoon' | 'highContrast' | 'floydSteinberg'> = {
  'simple': 'simple',
  'simple-enhanced': 'simpleEnhanced',
  'kmeans-advanced': 'kmeansAdvanced',
  'cartoon': 'cartoon',
  'high-contrast': 'highContrast',
  'floyd-steinberg': 'floydSteinberg',
}

const ALGORITHMS: ConversionAlgorithm[] = [
  'simple',
  'simple-enhanced',
  'kmeans-advanced',
  'cartoon',
  'high-contrast',
  'floyd-steinberg',
]

export function AlgorithmSelector({ selected, onSelect }: AlgorithmSelectorProps) {
  const { dict } = useLanguage()
  
  return (
    <div className="space-y-5">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-pink-700">{dict.algorithms.title}</h2>
        <p className="text-center text-sm text-muted-foreground">
          {dict.algorithms.description}
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {ALGORITHMS.map((algoId) => {
          const key = ALGORITHM_KEYS[algoId]
          const algo = dict.algorithms[key]
          return (
            <button
              key={algoId}
              onClick={() => onSelect(algoId)}
              className={cn(
                'rounded-xl border-2 p-5 text-center transition-all duration-300',
                'bg-gray-50 hover:border-pink-300',
                selected === algoId && 'border-pink-500 bg-pink-50 ring-4 ring-pink-500/10'
              )}
            >
              <div className="mb-2 text-4xl">{ALGORITHM_ICONS[algoId]}</div>
              <h3 className="mb-2 text-lg font-bold text-pink-900">{algo.name}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{algo.description}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
