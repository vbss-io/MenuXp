import { useCallback, useContext, useMemo } from 'react'

import { LanguageContext, type Language } from '@/hooks/contexts/language-context'

export const useLanguage = () => {
  const context = useContext(LanguageContext)

  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }

  const { language, setLanguage } = context

  const changeLanguage = useCallback(
    (newLanguage: Language) => {
      setLanguage(newLanguage)
    },
    [setLanguage]
  )

  const availableLanguages: { code: Language; name: string; flag: string }[] = useMemo(
    () => [
      { code: 'pt', name: 'Português', flag: '🇧🇷' },
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'es', name: 'Español', flag: '🇪🇸' }
    ],
    []
  )

  return useMemo(
    () => ({
      language,
      changeLanguage,
      availableLanguages
    }),
    [language, changeLanguage, availableLanguages]
  )
}
