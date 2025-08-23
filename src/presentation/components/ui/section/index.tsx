import React from 'react'
import * as S from './styles'

interface SectionProps {
  children: React.ReactNode
  background?: string
  padding?: string
  minHeight?: string
  className?: string
}

export const Section: React.FC<SectionProps> = ({
  children,
  background = 'transparent',
  padding = '0',
  minHeight = '100vh',
  className
}) => {
  return (
    <S.SectionContainer className={className} $background={background} $padding={padding} $minHeight={minHeight}>
      {children}
    </S.SectionContainer>
  )
}

export const SectionContent = S.SectionContent
export const SectionGrid = S.SectionGrid
export const SectionTextContent = S.SectionTextContent
export const SectionVisualContent = S.SectionVisualContent

export default Section
