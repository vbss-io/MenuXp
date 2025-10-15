import React from 'react'

import * as S from './styles'

interface FeatureListProps {
  children: React.ReactNode
  className?: string
}

export const FeatureList: React.FC<FeatureListProps> = ({ children, className }) => {
  return <S.FeatureListContainer className={className}>{children}</S.FeatureListContainer>
}

export const FeatureItem: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <S.FeatureItemContainer className={className}>{children}</S.FeatureItemContainer>
}

export const FeatureIcon: React.FC<{ children: React.ReactNode; color?: string; className?: string }> = ({
  children,
  color,
  className
}) => {
  return (
    <S.FeatureIconContainer className={className} $color={color}>
      {children}
    </S.FeatureIconContainer>
  )
}

export const FeatureText: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <S.FeatureTextContainer className={className}>{children}</S.FeatureTextContainer>
}

export default FeatureList
