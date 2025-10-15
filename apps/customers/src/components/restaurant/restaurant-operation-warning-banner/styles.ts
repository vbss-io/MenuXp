import styled from 'styled-components'

export const Banner = styled.div`
  &.banner {
    background: ${({ theme }) => theme.colors.mx.white};
    border: 2px solid ${({ theme }) => theme.colors.mx.yellow};
    border-radius: ${({ theme }) => theme.borderRadius.brutalist};
    padding: ${({ theme }) => theme.spacing.md};
    margin: ${({ theme }) => theme.spacing.md} 0;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};
    box-shadow: ${({ theme }) => theme.shadows.brutalistHover};
    position: relative;
    margin-left: ${({ theme }) => theme.spacing.md};
    margin-right: ${({ theme }) => theme.spacing.md};
    transition: all ${({ theme }) => `${theme.animations.durations.normal} ${theme.animations.easings.ease}`};

    @media ${({ theme }) => theme.breakpoints.md} {
      padding: ${({ theme }) => theme.spacing.lg};
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        135deg,
        ${({ theme }) => theme.colors.mx.yellow} 0%,
        ${({ theme }) => theme.colors.mx.red} 100%
      );
      opacity: 0.05;
      pointer-events: none;
      border-radius: ${({ theme }) => theme.borderRadius.brutalist};
    }
  }
`

export const IconContainer = styled.div`
  &.icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({ theme }) => theme.spacing.xl};
    height: ${({ theme }) => theme.spacing.xl};
    flex-shrink: 0;
    background: ${({ theme }) => theme.colors.mx.yellow};
    border: 2px solid ${({ theme }) => theme.colors.mx.black};
    border-radius: ${({ theme }) => theme.borderRadius.brutalist};
    box-shadow: ${({ theme }) => theme.shadows.brutalist};
    position: relative;
    z-index: 1;
    padding: ${({ theme }) => theme.spacing.xs};

    svg {
      width: 20px;
      height: 20px;
    }

    @media ${({ theme }) => theme.breakpoints.md} {
      width: ${({ theme }) => theme.spacing.xxxl};
      height: ${({ theme }) => theme.spacing.xxxl};

      svg {
        width: 24px;
        height: 24px;
      }
    }
  }
`

export const Content = styled.div`
  flex: 1;
  position: relative;
  z-index: 1;
`

export const Title = styled.h3`
  &.title {
    color: ${({ theme }) => theme.colors.mx.black};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    font-family: ${({ theme }) => theme.typography.fonts.title};
    margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
    line-height: 1.2;

    @media ${({ theme }) => theme.breakpoints.md} {
      font-size: ${({ theme }) => theme.typography.fontSizes.md};
    }
  }
`

export const Description = styled.p`
  &.description {
    color: ${({ theme }) => theme.colors.mx.black};
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    font-family: ${({ theme }) => theme.typography.fonts.body};
    margin: 0;
    line-height: 1.4;

    @media ${({ theme }) => theme.breakpoints.md} {
      font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    }
  }
`

export const TimeInfo = styled.strong`
  &.time-info {
    display: block;
    margin-top: ${({ theme }) => theme.spacing.xs};
    color: ${({ theme }) => theme.colors.mx.black};
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};

    @media ${({ theme }) => theme.breakpoints.md} {
      font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    }
  }
`
