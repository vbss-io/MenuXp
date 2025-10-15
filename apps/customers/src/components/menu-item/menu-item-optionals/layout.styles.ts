import { css } from 'styled-components'

export const menuItemOptionalsLayoutStyles = {
  menuxp: css`
    &.optionals-container {
      background: transparent;
    }

    .optionals-title {
      color: ${({ theme }) => theme.colors.text.primary};
      font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    }

    .optional-item {
      border: 3px solid ${({ theme }) => theme.colors.mx.black};
      border-radius: ${({ theme }) => theme.borderRadius.brutalist};
      box-shadow: ${({ theme }) => theme.shadows.brutalist};

      &:hover {
        box-shadow: ${({ theme }) => theme.shadows.brutalistHover};
        transform: translateY(-2px);
      }
    }

    .optional-name {
      font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    }

    .optional-price {
      font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    }

    .quantity-display {
      font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    }
  `,

  default: css`
    &.optionals-container {
      background: transparent;
    }

    .optionals-title {
      color: ${({ theme }) => theme.colors.text.primary};
    }

    .optional-item {
      border: 2px solid ${({ theme }) => theme.colors.mx.gray[200]};
      border-radius: ${({ theme }) => theme.borderRadius.sm};
      box-shadow: ${({ theme }) => theme.shadows.sm};

      &:hover {
        box-shadow: ${({ theme }) => theme.shadows.md};
      }
    }
  `,

  dark: css`
    &.optionals-container {
      background: transparent;
    }

    .optionals-title {
      color: ${({ theme }) => theme.colors.mx.white};
    }

    .optional-item {
      background: ${({ theme }) => theme.colors.mx.gray[800]};
      border: 2px solid ${({ theme }) => theme.colors.mx.gray[700]};
      border-radius: ${({ theme }) => theme.borderRadius.md};

      &:hover {
        border-color: var(--primary-color);
        background: ${({ theme }) => theme.colors.mx.gray[700]};
      }
    }

    .optional-name {
      color: ${({ theme }) => theme.colors.mx.white};
    }

    .optional-price {
      color: var(--primary-color);
    }

    .quantity-display {
      color: ${({ theme }) => theme.colors.mx.white};
    }
  `,

  clean: css`
    &.optionals-container {
      background: transparent;
    }

    .optionals-title {
      color: ${({ theme }) => theme.colors.text.primary};
      font-weight: ${({ theme }) => theme.typography.fontWeights.light};
    }

    .optional-item {
      border: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
      border-radius: ${({ theme }) => theme.borderRadius.xs};
      box-shadow: none;

      &:hover {
        border-color: var(--primary-color);
        box-shadow: ${({ theme }) => theme.shadows.sm};
      }
    }

    .optional-name {
      font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
    }
  `,

  square: css`
    &.optionals-container {
      background: transparent;
    }

    .optionals-title {
      color: ${({ theme }) => theme.colors.text.primary};
    }

    .optional-item {
      border: 2px solid ${({ theme }) => theme.colors.mx.gray[300]};
      border-radius: ${({ theme }) => theme.borderRadius.none};
      box-shadow: none;

      &:hover {
        border-color: var(--primary-color);
        box-shadow: ${({ theme }) => theme.shadows.sm};
      }
    }
  `
}

export const getMenuItemOptionalsLayoutStyle = (layout: string) =>
  menuItemOptionalsLayoutStyles[layout as keyof typeof menuItemOptionalsLayoutStyles] ||
  menuItemOptionalsLayoutStyles.default
