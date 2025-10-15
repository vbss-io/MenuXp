import React from 'react'

import { CarouselSection } from '@/components/menu-layout-sections/carousel-section'
import { MenuSectionType, type CarouselConfig, type MenuSection } from '@/types/menu-layout'

import * as S from '../../styles'

export const CarouselSectionShowcase: React.FC = () => {
  const mockCarouselData: CarouselConfig = {
    imagePaths: [
      'https://picsum.photos/800/400?random=1',
      'https://picsum.photos/800/400?random=2',
      'https://picsum.photos/800/400?random=3',
      'https://picsum.photos/800/400?random=4'
    ]
  }

  const mockSection: MenuSection = {
    id: 'carousel-showcase',
    type: MenuSectionType.CAROUSEL,
    config: mockCarouselData
  }

  return (
    <S.ShowcaseContainer>
      <S.ShowcaseItem>
        <S.Label>Carousel Section</S.Label>
        <CarouselSection section={mockSection} />
      </S.ShowcaseItem>
    </S.ShowcaseContainer>
  )
}
