'use client'

import { useLanguage } from '@/lib/i18n'

export function Header() {
  const { dict } = useLanguage()
  
  return (
    <header className="mb-10 pt-5 text-center">
      <div className="mb-3 flex items-center justify-center gap-4">
        <span className="text-5xl" role="img" aria-label="Yarn">
          🧶
        </span>
        <h1 className="bg-gradient-to-r from-pink-700 to-pink-500 bg-clip-text text-5xl font-extrabold text-transparent">
          {dict.header.title}
        </h1>
      </div>
      <p className="text-lg font-medium text-pink-900">
        {dict.header.subtitle}
      </p>
    </header>
  )
}
