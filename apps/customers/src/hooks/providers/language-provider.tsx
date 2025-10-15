import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'

import { LanguageContext, type Language, type LanguageContextData } from '@/hooks/contexts/language-context'
import { storageUtils } from '@/lib/local-storage'

interface LanguageProviderProps {
  children: ReactNode
}

const getStoredLanguage = (): Language => {
  try {
    const stored = storageUtils.language.get()
    if (stored && ['pt', 'en', 'es'].includes(stored as Language)) {
      return stored as Language
    }
  } catch (error) {
    console.error('Error reading language from localStorage:', error)
  }
  return 'pt'
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(getStoredLanguage)

  const setLanguage = useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage)
    try {
      storageUtils.language.set(newLanguage)
    } catch (error) {
      console.error('Error saving language to localStorage:', error)
    }
  }, [])

  useEffect(() => {
    const storedLanguage = getStoredLanguage()
    if (storedLanguage !== language) {
      setLanguageState(storedLanguage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const contextValue: LanguageContextData = useMemo(
    () => ({
      language,
      setLanguage
    }),
    [language, setLanguage]
  )

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>
}
