import { css } from 'styled-components'

export const getClientLoginFormLayoutStyle = (layout: string) => {
  const clientLoginFormLayoutStyles = {
    menuxp: css`
      &.client-login-form {
        border: 3px solid ${({ theme }) => theme.colors.mx.black};
        border-radius: ${({ theme }) => theme.borderRadius.brutalist};
        box-shadow: ${({ theme }) => theme.shadows.brutalist};
      }

      .form-title {
        color: ${({ theme }) => theme.colors.text.primary};
        font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
      }

      .switch-mode-button {
        color: ${({ theme }) => theme.colors.text.secondary};

        &:hover {
          color: var(--primary);
        }
      }
    `,

    default: css`
      &.client-login-form {
        border: 2px solid ${({ theme }) => theme.colors.mx.gray[200]};
        border-radius: ${({ theme }) => theme.borderRadius.lg};
        box-shadow: ${({ theme }) => theme.shadows.md};
      }

      .form-title {
        color: ${({ theme }) => theme.colors.text.primary};
      }

      .switch-mode-button {
        color: ${({ theme }) => theme.colors.text.secondary};

        &:hover {
          color: var(--primary);
        }
      }
    `,

    dark: css`
      &.client-login-form {
        background: ${({ theme }) => theme.colors.mx.gray[800]};
        border: 2px solid ${({ theme }) => theme.colors.mx.gray[700]};
        border-radius: ${({ theme }) => theme.borderRadius.lg};
        box-shadow: ${({ theme }) => theme.shadows.md};
      }

      .form-title {
        color: ${({ theme }) => theme.colors.mx.white};
      }

      .switch-mode-button {
        color: ${({ theme }) => theme.colors.mx.gray[400]};

        &:hover {
          color: var(--primary);
        }
      }
    `,

    clean: css`
      &.client-login-form {
        border: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
        border-radius: ${({ theme }) => theme.borderRadius.md};
        box-shadow: ${({ theme }) => theme.shadows.sm};
      }

      .form-title {
        color: ${({ theme }) => theme.colors.text.primary};
      }

      .switch-mode-button {
        color: ${({ theme }) => theme.colors.text.secondary};

        &:hover {
          color: var(--primary);
        }
      }
    `,

    square: css`
      &.client-login-form {
        border: 2px solid ${({ theme }) => theme.colors.mx.gray[300]};
        border-radius: ${({ theme }) => theme.borderRadius.none};
        box-shadow: ${({ theme }) => theme.shadows.md};
      }

      .form-title {
        color: ${({ theme }) => theme.colors.text.primary};
      }

      .switch-mode-button {
        color: ${({ theme }) => theme.colors.text.secondary};

        &:hover {
          color: var(--primary);
        }
      }
    `
  }

  return (
    clientLoginFormLayoutStyles[layout as keyof typeof clientLoginFormLayoutStyles] ||
    clientLoginFormLayoutStyles.default
  )
}
