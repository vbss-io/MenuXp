import styled from 'styled-components'

export const ChipContainer = styled.div`
  &.chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: ${({ theme }) => theme.typography.fonts.title};
    line-height: 1;
    white-space: nowrap;
    text-align: center;
    border: none;
    outline: none;
    transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    backface-visibility: hidden;
    transform: translateZ(0);
    will-change: transform, box-shadow;

    &.xs {
      padding: 6px 12px;
      font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    }

    &.sm {
      padding: 6px 12px;
      font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    }

    &.md {
      padding: 6px 12px;
      font-size: ${({ theme }) => theme.typography.fontSizes.md};
    }

    &.lg {
      padding: 8px 16px;
      font-size: ${({ theme }) => theme.typography.fontSizes.lg};
    }

    &.primary {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.mx.white};
    }

    &.secondary {
      background-color: ${({ theme }) => theme.colors.secondary};
      color: ${({ theme }) => theme.colors.mx.black};
    }

    &.outline {
      background-color: transparent;
      color: ${({ theme }) => theme.colors.primary};
      border: 2px solid ${({ theme }) => theme.colors.primary};
    }

    &.ghost {
      background-color: transparent;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`
