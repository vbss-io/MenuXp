import { css } from 'styled-components'

export const getComboCardLayoutStyle = (layout: string) => {
  const comboCardLayoutStyles = {
    menuxp: css`
      &.combo-card {
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        min-width: 280px;
        max-width: 320px;

        @media (max-width: 768px) {
          min-width: 260px;
          max-width: 280px;
        }

        &:hover {
          border-color: var(--secondary);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }
      }

      .combo-badge {
        background: var(--secondary);
        border-radius: 12px;
      }

      .discount-chip {
        background: var(--primary);
        border-radius: 12px;
      }

      .combo-image {
        border-radius: 12px 12px 0 0;
      }

      .combo-content {
        padding: 16px;
      }

      .combo-name {
        color: ${({ theme }) => theme.colors.text.primary};
      }

      .combo-description {
        color: ${({ theme }) => theme.colors.text.secondary};
      }

      .combo-items-count {
        color: ${({ theme }) => theme.colors.text.secondary};
      }

      .combo-price {
        .discount-price {
          color: var(--primary);
        }

        .current-price {
          color: var(--primary);
        }

        .original-price {
          color: ${({ theme }) => theme.colors.text.secondary};
        }
      }

      .add-to-cart-button {
        background: var(--primary);
        border-radius: 8px;
      }
    `,

    default: css`
      &.combo-card {
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        min-width: 280px;
        max-width: 320px;

        @media (max-width: 768px) {
          min-width: 260px;
          max-width: 280px;
        }

        &:hover {
          border-color: var(--secondary);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }
      }

      .combo-badge {
        background: var(--secondary);
        border-radius: 12px;
      }

      .discount-chip {
        background: var(--primary);
        border-radius: 12px;
      }

      .combo-image {
        border-radius: 12px 12px 0 0;
      }

      .combo-content {
        padding: 16px;
      }

      .combo-name {
        color: ${({ theme }) => theme.colors.text.primary};
      }

      .combo-description {
        color: ${({ theme }) => theme.colors.text.secondary};
      }

      .combo-items-count {
        color: ${({ theme }) => theme.colors.text.secondary};
      }

      .combo-price {
        .discount-price {
          color: var(--primary);
        }

        .current-price {
          color: var(--primary);
        }

        .original-price {
          color: ${({ theme }) => theme.colors.text.secondary};
        }
      }

      .add-to-cart-button {
        background: var(--primary);
        border-radius: 8px;
      }
    `,

    dark: css`
      &.combo-card {
        background: #1a1a1f;
        border: none;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        min-width: 280px;
        max-width: 320px;

        @media (max-width: 768px) {
          min-width: 260px;
          max-width: 280px;
        }

        &:hover {
          border-color: var(--secondary);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }
      }

      .combo-badge {
        background: var(--secondary);
        border-radius: 12px;
      }

      .discount-chip {
        background: var(--primary);
        border-radius: 12px;
      }

      .combo-image {
        border-radius: 12px 12px 0 0;
      }

      .combo-content {
        padding: 16px;
        background: #1a1a1f;
      }

      .combo-name {
        color: ${({ theme }) => theme.colors.mx.white};
      }

      .combo-description {
        color: #cccccc;
      }

      .combo-items-count {
        color: #cccccc;
      }

      .combo-price {
        .discount-price {
          color: var(--primary);
        }

        .current-price {
          color: var(--primary);
        }

        .original-price {
          color: #999999;
        }
      }

      .add-to-cart-button {
        background: var(--primary);
        border-radius: 8px;
      }
    `,

    clean: css`
      &.combo-card {
        background: ${({ theme }) => theme.colors.mx.white};
        border: 1px solid var(--secondary);
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        min-width: 260px;
        max-width: 300px;

        @media (max-width: 768px) {
          min-width: 240px;
          max-width: 260px;
        }

        &:hover {
          border-color: var(--primary);
          transform: translateY(-1px);
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
        }
      }

      .combo-badge {
        background: var(--secondary);
        border-radius: 8px;
      }

      .discount-chip {
        background: var(--primary);
        border-radius: 8px;
      }

      .combo-image {
        border-radius: 8px 8px 0 0;
      }

      .combo-content {
        padding: 12px;
      }

      .combo-name {
        color: ${({ theme }) => theme.colors.text.primary};
      }

      .combo-description {
        color: ${({ theme }) => theme.colors.text.secondary};
      }

      .combo-items-count {
        color: ${({ theme }) => theme.colors.text.secondary};
      }

      .combo-price {
        .discount-price {
          color: var(--primary);
        }

        .current-price {
          color: var(--primary);
        }

        .original-price {
          color: ${({ theme }) => theme.colors.text.secondary};
        }
      }

      .add-to-cart-button {
        background: var(--primary);
        border-radius: 6px;
      }
    `,

    square: css`
      &.combo-card {
        border-radius: 0;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        min-width: 280px;
        max-width: 320px;

        @media (max-width: 768px) {
          min-width: 260px;
          max-width: 280px;
        }

        &:hover {
          border-color: var(--secondary);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }
      }

      .combo-badge {
        background: var(--secondary);
        border-radius: 0;
      }

      .discount-chip {
        background: var(--primary);
        border-radius: 0;
      }

      .combo-image {
        border-radius: 0;
      }

      .combo-content {
        padding: 16px;
      }

      .combo-name {
        color: ${({ theme }) => theme.colors.text.primary};
      }

      .combo-description {
        color: ${({ theme }) => theme.colors.text.secondary};
      }

      .combo-items-count {
        color: ${({ theme }) => theme.colors.text.secondary};
      }

      .combo-price {
        .discount-price {
          color: var(--primary);
        }

        .current-price {
          color: var(--primary);
        }

        .original-price {
          color: ${({ theme }) => theme.colors.text.secondary};
        }
      }

      .add-to-cart-button {
        background: var(--primary);
        border-radius: 0;
      }
    `
  }

  return comboCardLayoutStyles[layout as keyof typeof comboCardLayoutStyles] || comboCardLayoutStyles.default
}
