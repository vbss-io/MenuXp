import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const ButtonContainer = styled.div`
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.sm};
    transition: all ${({ theme }) => `${theme.animations.durations.normal} ${theme.animations.easings.ease}`};
    white-space: nowrap;
    text-align: center;
    position: relative;
    overflow: hidden;
    line-height: ${({ theme }) => theme.typography.lineHeights.tight};
    width: 100%;
    height: auto;
    min-height: fit-content;
    font-family: ${({ theme }) => theme.typography.fonts.title};
    border-style: solid;
    cursor: pointer;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    backface-visibility: hidden;
    transform: translateZ(0);
    will-change: transform, background-color, color;

    &.xs {
      font-size: ${({ theme }) => theme.typography.fontSizes.xxxs};
      padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
      min-height: ${({ theme }) => theme.spacing.xl};
    }

    &.sm {
      font-size: ${({ theme }) => theme.typography.fontSizes.xxs};
      padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
      min-height: ${({ theme }) => theme.spacing.xxl};
    }

    &.md {
      font-size: ${({ theme }) => theme.typography.fontSizes.sm};
      padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
      min-height: ${({ theme }) => theme.spacing.xxxl};
    }

    &.lg {
      font-size: ${({ theme }) => theme.typography.fontSizes.md};
      padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
      min-height: ${({ theme }) => theme.spacing.xxxxl};
    }

    &.xl {
      font-size: ${({ theme }) => theme.typography.fontSizes.lg};
      padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xxl};
      min-height: ${({ theme }) => theme.spacing.xxxxxl};
    }

    &.primary {
      background-color: ${({ theme }) => theme.colors.secondary};
      border-color: ${({ theme }) => theme.colors.mx.black};
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          135deg,
          ${({ theme }) => theme.colors.primary} 00,
          ${({ theme }) => theme.colors.primary} 40
        );
        opacity: 0;
        transition: opacity ${({ theme }) => `${theme.animations.durations.normal} ${theme.animations.easings.ease}`};
        border-radius: inherit;
        pointer-events: none;
      }

      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.mx.white};
        border-color: ${({ theme }) => theme.colors.primary};
      }

      &:hover:not(:disabled)::before {
        opacity: 1;
      }
    }

    &.secondary {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.mx.white};
      border-color: ${({ theme }) => theme.colors.mx.black};
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${({ theme }) => theme.colors.secondary};
        opacity: 0;
        transition: opacity ${({ theme }) => `${theme.animations.durations.normal} ${theme.animations.easings.ease}`};
        border-radius: inherit;
        pointer-events: none;
      }

      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.highlight};
        color: ${({ theme }) => theme.colors.mx.white};
      }

      &:hover:not(:disabled)::before {
        opacity: 1;
      }

      span {
        position: relative;
        z-index: 1;
      }
    }

    &.outline {
      background-color: transparent;
      color: ${({ theme }) => theme.colors.primary};
      border-color: ${({ theme }) => theme.colors.primary};

      &:hover:not(:disabled) {
        color: ${({ theme }) => theme.colors.mx.white} !important;
        background-color: ${({ theme }) => theme.colors.primary};
        border-color: ${({ theme }) => theme.colors.primary};
      }
    }

    &.game {
      background-color: ${({ theme }) => theme.colors.highlight};
      color: ${({ theme }) => theme.colors.mx.black};
      border-color: ${({ theme }) => theme.colors.mx.black};
      text-transform: uppercase;
      letter-spacing: 1px;

      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.highlight};
        filter: brightness(1.1);
      }
    }

    &.danger {
      background-color: transparent;
      color: ${({ theme }) => theme.colors.error};
      border-color: ${({ theme }) => theme.colors.error};

      &:hover:not(:disabled) {
        color: ${({ theme }) => theme.colors.mx.white};
        background-color: ${({ theme }) => theme.colors.error};
        border-color: ${({ theme }) => theme.colors.error};
      }
    }

    &.white {
      background-color: ${({ theme }) => theme.colors.mx.white};
      color: ${({ theme }) => theme.colors.mx.black};
      border-color: ${({ theme }) => theme.colors.mx.black};

      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.mx.gray[100]};
      }
    }

    &.ghost {
      background-color: transparent;
      color: ${({ theme }) => theme.colors.primary};
      border-color: transparent;
      box-shadow: ${({ theme }) => theme.shadows.none};

      &:hover:not(:disabled) {
        color: ${({ theme }) => theme.colors.mx.white} !important;
        background-color: ${({ theme }) => theme.colors.primary};
      }
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      filter: grayscale(0.3);
    }
  }
`

export const LoadingSpinner = styled.div`
  width: ${({ theme }) => theme.spacing.md};
  height: ${({ theme }) => theme.spacing.md};
  border: 2px solid currentColor;
  border-top: 2px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  animation: ${spin} 1s ${({ theme }) => theme.animations.easings.linear} infinite;
`

export const ButtonContent = styled.span<{ $loading?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  opacity: ${({ $loading }) => ($loading ? 0 : 1)};
  transition: opacity ${({ theme }) => `${theme.animations.durations.normal} ${theme.animations.easings.ease}`};
  white-space: nowrap;
  flex-shrink: 0;
`

export const LoadingContent = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`
