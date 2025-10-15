import styled from 'styled-components'

export const CTASection = styled.section`
  background-color: ${({ theme }) => theme.colors.mx.red};
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  width: 100%;
  overflow-x: hidden;
`

export const CTAContainer = styled.div`
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

export const CTAGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};
  align-items: start;
  width: 100%;

  @media ${({ theme }) => theme.breakpoints.lg} {
    grid-template-columns: 1fr 1fr;
  }
`

export const ContentColumn = styled.div`
  color: ${({ theme }) => theme.colors.mx.white};
`

export const Title = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.xxxl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  color: ${({ theme }) => theme.colors.mx.white};
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};

  @media ${({ theme }) => theme.breakpoints.sm} {
    font-size: ${({ theme }) => theme.typography.fontSizes.xxxxl};
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    font-size: ${({ theme }) => theme.typography.fontSizes.xxxxxl};
  }
`

export const Description = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  color: ${({ theme }) => theme.colors.mx.white};
  margin: 0 0 ${({ theme }) => theme.spacing.xl} 0;
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
  opacity: 0.9;

  @media ${({ theme }) => theme.breakpoints.lg} {
    font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};

  @media ${({ theme }) => theme.breakpoints.sm} {
    flex-direction: row;
  }
`

export const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.mx.white};
  color: ${({ theme }) => theme.colors.mx.black};
  border: 2px solid ${({ theme }) => theme.colors.mx.white};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};
  box-shadow: ${({ theme }) => theme.shadows.brutalist};

  &:hover {
    background-color: ${({ theme }) => theme.colors.mx.yellow};
    border-color: ${({ theme }) => theme.colors.mx.yellow};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.brutalistHover};
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${({ theme }) => theme.shadows.brutalist};
  }
`

export const SecondaryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ theme }) => theme.colors.mx.white};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};
  box-shadow: ${({ theme }) => theme.shadows.brutalist};

  &:hover {
    background-color: ${({ theme }) => theme.colors.mx.white};
    color: ${({ theme }) => theme.colors.mx.black};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.brutalistHover};
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${({ theme }) => theme.shadows.brutalist};
  }
`

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  text-align: center;

  @media ${({ theme }) => theme.breakpoints.sm} {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const StatValue = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.xxxl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.mx.white};
  margin: 0;
`

export const StatLabel = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.mx.white};
  opacity: 0.8;
  margin: 0;
`
