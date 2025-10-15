import React from 'react'
import * as S from './styles'

interface PhoneMockupProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({ children, size = 'md', className }) => {
  return (
    <S.PhoneMockupContainer className={className} $size={size}>
      {children}
    </S.PhoneMockupContainer>
  )
}

export const PhoneFrame: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <S.PhoneFrame className={className}>{children}</S.PhoneFrame>
}

export const PhoneScreen: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <S.PhoneScreen className={className}>{children}</S.PhoneScreen>
}

export const PhoneStatusBar: React.FC<{ children?: React.ReactNode; className?: string }> = ({
  children,
  className
}) => {
  return <S.PhoneStatusBar className={className}>{children}</S.PhoneStatusBar>
}

export const PhoneContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <S.PhoneContent className={className}>{children}</S.PhoneContent>
}

export const PhoneImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  return <S.PhoneImage {...props} />
}

export const PhoneBadge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <S.PhoneBadge className={className}>{children}</S.PhoneBadge>
}

export const PhoneIndicators: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => {
  return <S.PhoneIndicators className={className}>{children}</S.PhoneIndicators>
}

export const PhoneIndicator: React.FC<{ active?: boolean; className?: string }> = ({ active, className }) => {
  return <S.PhoneIndicator className={className} $active={active} />
}

export default PhoneMockup
