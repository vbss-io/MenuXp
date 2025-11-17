import { Popover, useLayout } from '@menuxp/ui'
import { motion } from 'framer-motion'
import React, { useMemo } from 'react'
import { useTranslator } from 'vbss-translator'

import { useClient } from '@/hooks/use-client'

import * as S from './styles'

export type Language = 'pt' | 'en' | 'es'

interface LanguageSelectorProps {
  className?: string
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className }) => {
  const { language, setLanguage } = useTranslator()
  const { layout } = useLayout()
  const { client, updateClient } = useClient()

  const availableLanguages: { code: Language; name: string; flag: string }[] = useMemo(
    () => [
      { code: 'pt', name: 'Português', flag: '🇧🇷' },
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'es', name: 'Español', flag: '🇪🇸' }
    ],
    []
  )

  const currentLanguage = availableLanguages.find((lang) => lang.code === language)

  const handleLanguageChange = (languageCode: Language) => {
    setLanguage(languageCode)
    if (client) {
      updateClient({ preferredLanguage: languageCode })
    }
  }

  const popoverContent = (
    <S.LanguageList className={`language-list layout-${layout}`}>
      {availableLanguages.map((lang) => (
        <S.LanguageOption
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`language-option layout-${layout} ${lang.code === language ? 'active' : ''}`}
        >
          <S.LanguageCircle className={`language-circle ${lang.code === language ? 'active' : ''}`}>
            <S.LanguageFlag>{lang.flag}</S.LanguageFlag>
          </S.LanguageCircle>
          <S.LanguageName>{lang.name}</S.LanguageName>
        </S.LanguageOption>
      ))}
    </S.LanguageList>
  )

  const trigger = (
    <S.LanguageTrigger
      as={motion.button}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`language-trigger layout-${layout}`}
    >
      <S.LanguageCircle className="language-circle">
        <S.LanguageFlag>{currentLanguage?.flag}</S.LanguageFlag>
      </S.LanguageCircle>
      <S.LanguageCode className={`language-code layout-${layout}`}>
        {currentLanguage?.code.toUpperCase()}
      </S.LanguageCode>
    </S.LanguageTrigger>
  )

  return (
    <S.Container className={className}>
      <Popover trigger={trigger} variant="outline" side="bottom" align="end">
        {popoverContent}
      </Popover>
    </S.Container>
  )
}

LanguageSelector.displayName = 'LanguageSelector'

export default LanguageSelector
