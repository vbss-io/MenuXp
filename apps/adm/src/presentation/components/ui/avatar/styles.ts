import styled from 'styled-components'

export const AvatarWrapper = styled.div<{ direction: 'row' | 'column' }>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  svg {
    color: ${({ theme }) => theme.colors.mx.black};
  }
`

export const AvatarImg = styled.img<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  object-fit: cover;
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  box-shadow: ${({ theme }) => theme.shadows.brutalist};
`

export const AvatarName = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.mx.black};
  font-family: ${({ theme }) => theme.typography.fonts.body};
`
