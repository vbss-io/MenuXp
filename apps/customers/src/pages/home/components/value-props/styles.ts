import styled from 'styled-components'

export const ValuePropsSection = styled.section`
  background-color: ${({ theme }) => theme.colors.mx.red};
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  width: 100%;
  overflow-x: hidden;
`

export const ValuePropsContainer = styled.div`
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

export const ValuePropsHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`

export const ValuePropsTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.xxxl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  color: ${({ theme }) => theme.colors.mx.black};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;

  @media ${({ theme }) => theme.breakpoints.sm} {
    font-size: ${({ theme }) => theme.typography.fontSizes.xxxxl};
  }
`

export const ValuePropsDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 768px;
  margin: 0 auto;
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
`

export const ValueCardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xl};

  @media ${({ theme }) => theme.breakpoints.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const ValueCard = styled.div`
  background-color: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.brutalistCard};
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.brutalistHover};
  }
`

export const ValueCardHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

export const ValueCardIcon = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.mx.yellow};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  color: ${({ theme }) => theme.colors.mx.black};
`

export const ValueCardTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  color: ${({ theme }) => theme.colors.mx.black};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
`

export const ValueCardDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  margin: 0;
  flex-grow: 1;
`
