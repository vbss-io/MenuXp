import styled from 'styled-components'

export const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.xxxl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.3;
  margin: 0;
  padding: 0;
  max-width: 100%;
  word-wrap: break-word;
  word-break: keep-all;
  hyphens: none;
  white-space: normal;
  text-align: center;

  @media ${({ theme }) => theme.breakpoints.sm} {
    font-size: ${({ theme }) => theme.typography.fontSizes.xxxxl};
    line-height: 1.25;
    max-width: 100%;
    text-align: center;
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    font-size: ${({ theme }) => theme.typography.fontSizes.xxxxxl};
    line-height: 1.2;
    max-width: 100%;
    text-align: left;
  }
`

export const HeroDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.lg};
  max-width: 100%;
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  text-align: center;

  @media ${({ theme }) => theme.breakpoints.sm} {
    max-width: 90%;
    text-align: center;
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    max-width: 85%;
    text-align: left;
  }
`

export const HeroButtonGroup = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  justify-content: center;

  @media ${({ theme }) => theme.breakpoints.sm} {
    justify-content: center;
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    justify-content: flex-start;
  }
`

export const HeroChipGroup = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  justify-content: center;

  @media ${({ theme }) => theme.breakpoints.sm} {
    justify-content: center;
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    justify-content: flex-start;
  }
`

export const PhoneBadgeContainer = styled.div`
  position: absolute;
  top: -${({ theme }) => theme.spacing.sm};
  right: -${({ theme }) => theme.spacing.sm};
  z-index: ${({ theme }) => theme.zIndex.docked};
  pointer-events: none;
  white-space: nowrap;
`
