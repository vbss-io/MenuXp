import React from 'react'
import styled from 'styled-components'

interface ChipProps {
  children: React.ReactNode
  backgroundColor?: string
  textColor?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  noBorder?: boolean
  padding?: string
}

export const Chip: React.FC<ChipProps> = ({
  children,
  backgroundColor,
  textColor = 'white',
  size = 'md',
  noBorder = false,
  padding
}) => {
  return (
    <ChipContainer
      $backgroundColor={backgroundColor}
      $textColor={textColor}
      $size={size}
      $noBorder={noBorder}
      $padding={padding}
    >
      {children}
    </ChipContainer>
  )
}

const ChipContainer = styled.div<{
  $backgroundColor?: string
  $textColor: string
  $size: 'xs' | 'sm' | 'md' | 'lg'
  $noBorder: boolean
  $padding?: string
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ $padding, $size }) => {
    if ($padding) return $padding

    switch ($size) {
      case 'xs':
        return '6px 12px'
      case 'sm':
        return '6px 12px'
      case 'md':
        return '6px 12px'
      case 'lg':
        return '8px 16px'
      default:
        return '6px 12px'
    }
  }};
  background: ${({ $backgroundColor, theme }) => $backgroundColor || theme.colors.mx.red};
  color: ${({ $textColor }) => $textColor};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ $size, theme }) => {
    switch ($size) {
      case 'xs':
        return theme.typography.fontSizes.xs
      case 'sm':
        return theme.typography.fontSizes.sm
      case 'md':
        return theme.typography.fontSizes.md
      case 'lg':
        return theme.typography.fontSizes.lg
      default:
        return theme.typography.fontSizes.sm
    }
  }};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1;
  white-space: nowrap;
  text-align: center;
  box-shadow: ${({ $noBorder, theme }) => ($noBorder ? 'none' : `3px 3px 0px ${theme.colors.mx.black}`)};
  border: ${({ $noBorder, theme }) => ($noBorder ? 'none' : `1px solid ${theme.colors.mx.black}`)};
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};

  &:hover {
    transform: ${({ $noBorder }) => ($noBorder ? 'none' : 'translateY(-1px)')};
    box-shadow: ${({ $noBorder, theme }) => ($noBorder ? 'none' : `0 4px 0px ${theme.colors.mx.black}`)};
  }
`
