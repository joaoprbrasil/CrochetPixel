'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { dictionaries, type Dictionary, type Locale } from './dictionary'

interface LanguageContextType {
  locale: Locale
  dict: Dictionary
  setLocale: (locale: Locale) => void
}

const LanguageContext = createContext<LanguageContextType | null>(null)

function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  
  const browserLang = navigator.language.toLowerCase()
  
  // Check for Portuguese variants
  if (browserLang.startsWith('pt')) {
    return 'pt'
  }
  
  return 'en'
}

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [locale, setLocale] = useState<Locale>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setLocale(detectLocale())
    setMounted(true)
  }, [])

  const dict = dictionaries[locale]

  // Prevent hydration mismatch by showing nothing until mounted
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ locale: 'en', dict: dictionaries.en, setLocale }}>
        {children}
      </LanguageContext.Provider>
    )
  }

  return (
    <LanguageContext.Provider value={{ locale, dict, setLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
