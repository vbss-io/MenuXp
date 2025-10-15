import { createContext } from 'react'

export type Language = 'pt' | 'en' | 'es'

export interface LanguageContextData {
  language: Language
  setLanguage: (language: Language) => void
}

export const LanguageContext = createContext<LanguageContextData | undefined>(undefined)
