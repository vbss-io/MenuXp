import styled from 'styled-components'

export const FeatureListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
  justify-items: center;

  @media ${({ theme }) => theme.breakpoints.sm} {
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    gap: ${({ theme }) => theme.spacing.lg};
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    justify-items: start;
    gap: ${({ theme }) => theme.spacing.md};
  }
`

export const FeatureItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: center;

  @media ${({ theme }) => theme.breakpoints.lg} {
    justify-content: flex-start;
  }
`

export const FeatureIconContainer = styled.div<{ $color?: string }>`
  width: 2rem;
  height: 2rem;
  background-color: ${({ $color, theme }) => $color || theme.colors.mx.black};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.mx.white};
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.colors.mx.black};

  @media ${({ theme }) => theme.breakpoints.sm} {
    width: 2.25rem;
    height: 2.25rem;
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    width: 2.5rem;
    height: 2.5rem;
  }
`

export const FeatureTextContainer = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
  text-align: center;

  @media ${({ theme }) => theme.breakpoints.sm} {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    text-align: center;
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    text-align: left;
  }
`
