import styled from 'styled-components'

export const FeatureShowcaseSection = styled.section`
  background-color: ${({ theme }) => theme.colors.mx.gray[50]};
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  width: 100%;
  overflow-x: hidden;
`

export const FeatureShowcaseContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  width: 100%;

  @media ${({ theme }) => theme.breakpoints.sm} {
    padding: 0 ${({ theme }) => theme.spacing.lg};
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    padding: 0 ${({ theme }) => theme.spacing.xl};
  }
`

export const FeatureShowcaseGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};
  align-items: start;
  width: 100%;

  @media ${({ theme }) => theme.breakpoints.lg} {
    grid-template-columns: 1fr 1fr;
  }
`

export const FeatureShowcaseHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

export const FeatureShowcaseTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.xxxl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  color: ${({ theme }) => theme.colors.mx.black};
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;

  @media ${({ theme }) => theme.breakpoints.sm} {
    font-size: ${({ theme }) => theme.typography.fontSizes.xxxxl};
  }
`

export const FeatureShowcaseDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  margin: 0;
`

export const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const FeatureIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: ${({ theme }) => theme.colors.mx.yellow};
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.mx.black};
  flex-shrink: 0;
`

export const FeatureText = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
`

export const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const TabCard = styled.div`
  background-color: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.brutalistCard};
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.brutalistHover};
  }
`

export const TabCardTitle = styled.h4`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.mx.black};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
`

export const TabCardDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
`

export const TabCardBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const TabCardBadge = styled.span<{ $variant: 'success' | 'info' | 'warning' | 'neutral' }>`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'success':
        return `
          background-color: ${theme.colors.success};
          color: ${theme.colors.mx.white};
        `
      case 'info':
        return `
          background-color: ${theme.colors.info};
          color: ${theme.colors.mx.white};
        `
      case 'warning':
        return `
          background-color: ${theme.colors.warning};
          color: ${theme.colors.mx.white};
        `
      case 'neutral':
        return `
          background-color: ${theme.colors.mx.gray[100]};
          color: ${theme.colors.mx.gray[700]};
        `
      default:
        return `
          background-color: ${theme.colors.mx.gray[100]};
          color: ${theme.colors.mx.gray[700]};
        `
    }
  }}
`
