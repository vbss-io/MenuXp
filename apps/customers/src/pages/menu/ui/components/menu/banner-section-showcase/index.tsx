import React from 'react'

import { BannerSection } from '@/components/menu-layout-sections/banner-section'
import { MenuSectionType, type BannerConfig, type MenuSection } from '@/types/menu-layout'

import * as S from '../../styles'

export const BannerSectionShowcase: React.FC = () => {
  const mockBannerData: BannerConfig = {
    imagePath: 'https://picsum.photos/800/400?random=1',
    tag: 'Destaque',
    title: 'Título Principal',
    subtitle: 'Subtítulo descritivo do banner'
  }

  const mockSection: MenuSection = {
    id: 'banner-showcase',
    type: MenuSectionType.BANNER,
    config: mockBannerData
  }

  return (
    <S.ShowcaseContainer>
      <S.ShowcaseItem>
        <S.Label>Banner Section</S.Label>
        <BannerSection section={mockSection} />
      </S.ShowcaseItem>
    </S.ShowcaseContainer>
  )
}
