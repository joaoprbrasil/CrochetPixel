'use client'

import { cn } from '@/lib/utils'
import { useLanguage } from '@/lib/i18n'

interface GenerateButtonProps {
  onClick: () => void
  disabled: boolean
  isGenerating: boolean
}

export function GenerateButton({ onClick, disabled, isGenerating }: GenerateButtonProps) {
  const { dict } = useLanguage()
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex w-full items-center justify-center gap-3 rounded-2xl px-8 py-5 text-xl font-bold transition-all duration-300',
        disabled
          ? 'cursor-not-allowed bg-gray-200 text-gray-400'
          : 'bg-pink-500 text-white shadow-lg shadow-pink-500/30 hover:bg-pink-600 hover:shadow-xl hover:shadow-pink-500/40'
      )}
    >
      {isGenerating ? (
        <>
          <span className="size-5 animate-spin rounded-full border-3 border-white/30 border-t-white" />
          {dict.generateButton.generating}
        </>
      ) : (
        <>
          <span>✨</span>
          {dict.generateButton.generate}
        </>
      )}
    </button>
  )
}
