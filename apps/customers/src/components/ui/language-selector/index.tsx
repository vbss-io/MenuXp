import { motion } from 'framer-motion'
import React from 'react'

import { Popover } from '@/components/ui/popover'
import { useLanguage } from '@/hooks/use-language'
import { useRestaurant } from '@/hooks/use-restaurant'

import * as S from './styles'

interface LanguageSelectorProps {
  className?: string
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className }) => {
  const { language, changeLanguage, availableLanguages } = useLanguage()
  const { layout } = useRestaurant()

  const currentLanguage = availableLanguages.find((lang) => lang.code === language)

  const handleLanguageChange = (languageCode: string) => {
    changeLanguage(languageCode as 'pt' | 'en' | 'es')
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
