import React from 'react'
import * as S from './styles'

interface HighlightProps {
  children: React.ReactNode
  size?: string
  className?: string
}

export const Highlight: React.FC<HighlightProps> = ({ children, size, className }) => {
  return (
    <S.HighlightContainer className={className} $size={size}>
      {children}
    </S.HighlightContainer>
  )
}

export default Highlight
