import styled, { css, keyframes } from 'styled-components'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const brutalistButtonStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  transition: all 0.2s ease;
  white-space: normal;
  word-wrap: break-word;
  word-break: break-word;
  text-align: center;
  position: relative;
  overflow: hidden;
  line-height: 1.2;
  width: 100%;
  height: auto;
  min-height: fit-content;

  > *:first-child {
    flex-shrink: 0;
    align-self: center;
  }

  &.xs {
    font-size: ${({ theme }) => theme.typography.fontSizes.xxxs};
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    min-height: ${({ theme }) => theme.spacing.sm};
  }

  &.sm {
    font-size: ${({ theme }) => theme.typography.fontSizes.xxs};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    min-height: ${({ theme }) => theme.spacing.md};
  }

  &.md {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
    min-height: ${({ theme }) => theme.spacing.lg};
  }

  &.lg {
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
    min-height: ${({ theme }) => theme.spacing.xl};
  }

  &.xl {
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xxl};
    min-height: ${({ theme }) => theme.spacing.xxl};
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: translateX(0);
  }
`

export const ButtonContainer = styled.div`
  .button {
    &.primary {
      ${brutalistButtonStyles}
      font-family: ${({ theme }) => theme.typography.fonts.title};
      background: ${({ theme }) => theme.colors.mx.yellow};
      color: ${({ theme }) => theme.colors.mx.black};
      border: 3px solid ${({ theme }) => theme.colors.mx.black};
      box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.black};

      &:hover {
        background: ${({ theme }) => theme.colors.mx.yellow};
        border-color: ${({ theme }) => theme.colors.mx.black};
        transform: translateY(-2px);
        box-shadow: 0 4px 0 ${({ theme }) => theme.colors.mx.black};
      }
    }

    &.secondary {
      ${brutalistButtonStyles}
      font-family: ${({ theme }) => theme.typography.fonts.title};
      background: ${({ theme }) => theme.colors.mx.red};
      color: ${({ theme }) => theme.colors.mx.white};
      border: 3px solid ${({ theme }) => theme.colors.mx.black};
      box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.black};

      &:hover {
        background: ${({ theme }) => theme.colors.mx.red};
        border-color: ${({ theme }) => theme.colors.mx.black};
        transform: translateY(-2px);
        box-shadow: 0 4px 0 ${({ theme }) => theme.colors.mx.black};
      }
    }

    &.outline {
      ${brutalistButtonStyles}
      font-family: ${({ theme }) => theme.typography.fonts.title};
      background: transparent;
      color: ${({ theme }) => theme.colors.mx.black};
      border: 3px solid ${({ theme }) => theme.colors.mx.black};
      box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.black};

      &:hover {
        background: ${({ theme }) => theme.colors.mx.black};
        color: ${({ theme }) => theme.colors.mx.white};
        transform: translateY(-2px);
        box-shadow: 0 4px 0 ${({ theme }) => theme.colors.mx.black};
      }
    }

    &.game {
      ${brutalistButtonStyles}
      font-family: ${({ theme }) => theme.typography.fonts.game};
      background: ${({ theme }) => theme.colors.game.gold};
      color: ${({ theme }) => theme.colors.mx.black};
      border: 3px solid ${({ theme }) => theme.colors.mx.black};
      box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.black};
      text-transform: uppercase;
      letter-spacing: 1px;

      &:hover {
        background: ${({ theme }) => theme.colors.game.gold};
        border-color: ${({ theme }) => theme.colors.mx.black};
        transform: translateY(-2px) scale(1.05);
        box-shadow: 0 4px 0 ${({ theme }) => theme.colors.mx.black};
      }
    }

    &.danger {
      ${brutalistButtonStyles}
      font-family: ${({ theme }) => theme.typography.fonts.title};
      background: transparent;
      color: ${({ theme }) => theme.colors.error};
      border: 3px solid ${({ theme }) => theme.colors.error};
      box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.error};

      &:hover {
        background: ${({ theme }) => theme.colors.error};
        color: ${({ theme }) => theme.colors.mx.white};
        transform: translateY(-2px);
        box-shadow: 0 4px 0 ${({ theme }) => theme.colors.error};
      }
    }

    &.white {
      ${brutalistButtonStyles}
      font-family: ${({ theme }) => theme.typography.fonts.title};
      background: ${({ theme }) => theme.colors.mx.white};
      color: ${({ theme }) => theme.colors.mx.black};
      border: 3px solid ${({ theme }) => theme.colors.mx.black};
      box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.black};

      &:hover {
        background: ${({ theme }) => theme.colors.mx.gray[100]};
        border-color: ${({ theme }) => theme.colors.mx.black};
        transform: translateY(-2px);
        box-shadow: 0 4px 0 ${({ theme }) => theme.colors.mx.black};
      }
    }

    &.ghost {
      ${brutalistButtonStyles}
      font-family: ${({ theme }) => theme.typography.fonts.title};
      background: transparent;
      color: ${({ theme }) => theme.colors.mx.black};
      border: 3px solid transparent;
      box-shadow: none;

      &:hover {
        background: ${({ theme }) => theme.colors.mx.gray[100]};
        border-color: ${({ theme }) => theme.colors.mx.black};
        transform: translateY(-2px);
        box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.black};
      }
    }
  }
`

export const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`

export const ButtonContent = styled.span<{ loading?: boolean }>`
  display: flex;
  align-items: center;
  gap: inherit;
  opacity: ${({ loading }) => (loading ? 0 : 1)};
  transition: opacity 0.2s ease;
`

export const LoadingContent = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 8px;
`
