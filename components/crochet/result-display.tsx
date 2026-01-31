'use client'

import { useLanguage } from '@/lib/i18n'

interface ResultDisplayProps {
  imageUrl: string
  width: number
  height: number
  onDownload: () => void
}

export function ResultDisplay({ imageUrl, width, height, onDownload }: ResultDisplayProps) {
  const { dict } = useLanguage()
  
  return (
    <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-emerald-600">
        ✅ {dict.result.ready}
      </h2>

      <div className="mb-6 rounded-2xl bg-gray-50 p-5">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={dict.result.chartReady}
          className="mx-auto max-h-[600px] max-w-full rounded-xl border-3 border-pink-500 object-contain"
        />
      </div>

      <button
        onClick={onDownload}
        className="inline-flex items-center gap-3 rounded-xl bg-emerald-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-500/40"
      >
        <span>⬇️</span>
        {dict.result.download} ({width}×{height})
      </button>
    </div>
  )
}
