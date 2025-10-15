import styled from 'styled-components'

export const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.3;
  margin: 0;
  padding: 0;
  width: 100%;
  word-wrap: normal;
  word-break: keep-all;
  hyphens: none;
  white-space: normal;
  text-align: center;
  overflow-wrap: normal;

  .mobile-only {
    display: block;
  }

  @media ${({ theme }) => theme.breakpoints.xs} {
    font-size: ${({ theme }) => theme.typography.fontSizes.xxl};
    line-height: 1.25;
  }

  @media ${({ theme }) => theme.breakpoints.sm} {
    font-size: ${({ theme }) => theme.typography.fontSizes.xxxl};
    line-height: 1.2;

    .mobile-only {
      display: none;
    }
  }

  @media ${({ theme }) => theme.breakpoints.md} {
    font-size: ${({ theme }) => theme.typography.fontSizes.xxxxl};
    line-height: 1.2;
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    font-size: ${({ theme }) => theme.typography.fontSizes.xxxxxl};
    line-height: 1.2;
    text-align: left;
  }
`

export const HeroDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  text-align: center;
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
  overflow-wrap: break-word;

  @media ${({ theme }) => theme.breakpoints.xs} {
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    max-width: 95%;
  }

  @media ${({ theme }) => theme.breakpoints.sm} {
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    max-width: 90%;
  }

  @media ${({ theme }) => theme.breakpoints.md} {
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    max-width: 85%;
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    max-width: 85%;
    text-align: left;
  }
`

export const HeroButtonGroup = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  width: 100%;

  @media ${({ theme }) => theme.breakpoints.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.md};
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
  width: 100%;

  @media ${({ theme }) => theme.breakpoints.sm} {
    gap: ${({ theme }) => theme.spacing.sm};
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
