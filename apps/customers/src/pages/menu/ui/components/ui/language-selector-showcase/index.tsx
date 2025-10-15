import React from 'react'

import { LanguageSelector } from '@/components/ui/language-selector'

import * as S from '../../styles'

export const LanguageSelectorShowcase: React.FC = () => {
  return (
    <S.ShowcaseContainer>
      <S.ShowcaseItem>
        <S.Label>Language Selector</S.Label>
        <LanguageSelector />
      </S.ShowcaseItem>
    </S.ShowcaseContainer>
  )
}

LanguageSelectorShowcase.displayName = 'LanguageSelectorShowcase'

export default LanguageSelectorShowcase
