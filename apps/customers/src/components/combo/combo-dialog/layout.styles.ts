import { css } from 'styled-components'

export const getComboDialogLayoutStyle = (layout: string) => {
  const comboDialogLayoutStyles = {
    menuxp: css`
      &.dialog-header {
        border-bottom: 2px solid var(--secondary);
        padding-bottom: 20px;
      }

      &.product-image {
        border: 3px solid var(--secondary);
        border-radius: 16px;
      }

      &.combo-badge {
        background: var(--secondary);
        border-radius: 8px;
      }

      &.product-title {
        color: var(--primary);
        font-weight: 700;
      }

      &.price {
        color: var(--primary);
        font-weight: 700;
        font-size: 20px;
      }

      &.discount-badge {
        background: var(--primary);
        color: white;
        border-radius: 8px;
        padding: 4px 8px;
        font-weight: 600;
      }
    `,

    default: css`
      &.dialog-header {
        border-bottom: 1px solid #e5e7eb;
        padding-bottom: 16px;
      }

      &.product-image {
        border: 2px solid #e5e7eb;
        border-radius: 12px;
      }

      &.combo-badge {
        background: var(--secondary);
        border-radius: 8px;
      }

      &.product-title {
        color: #1f2937;
        font-weight: 600;
      }

      &.price {
        color: var(--primary);
        font-weight: 600;
        font-size: 18px;
      }

      &.original-price {
        color: #9ca3af;
      }

      &.discount-badge {
        background: var(--primary);
        color: white;
        border-radius: 6px;
        padding: 2px 6px;
        font-weight: 500;
        font-size: 12px;
      }
    `,

    dark: css`
      &.dialog-header {
        border-bottom: 1px solid #374151;
        padding-bottom: 16px;
      }

      &.product-image {
        border: 2px solid var(--secondary);
        border-radius: 12px;
      }

      &.combo-badge {
        background: var(--secondary);
        border-radius: 8px;
      }

      &.product-title {
        color: #ffffff;
        font-weight: 600;
      }

      &.product-description {
        color: #ffffff;
      }

      &.price {
        color: var(--primary);
        font-weight: 700;
        font-size: 20px;
      }

      &.original-price {
        color: #9ca3af;
      }

      &.discount-badge {
        background: var(--primary);
        color: white;
        border-radius: 8px;
        padding: 4px 8px;
        font-weight: 600;
      }
    `,

    clean: css`
      &.dialog-header {
        border-bottom: 2px solid var(--secondary);
        padding-bottom: 20px;
      }

      &.product-image {
        border: 2px solid var(--secondary);
        border-radius: 8px;
      }

      &.combo-badge {
        background: var(--secondary);
        border-radius: 6px;
      }

      &.product-title {
        color: #1f2937;
        font-weight: 600;
        border-bottom: 1px solid var(--secondary);
        padding-bottom: 4px;
      }

      &.price {
        color: var(--primary);
        font-weight: 700;
        font-size: 18px;
      }

      &.original-price {
        color: #9ca3af;
      }

      &.discount-badge {
        background: var(--primary);
        color: white;
        border-radius: 4px;
        padding: 2px 6px;
        font-weight: 500;
        font-size: 11px;
      }
    `,

    square: css`
      &.dialog-header {
        border-bottom: 3px solid var(--secondary);
        padding-bottom: 20px;
      }

      &.product-image {
        border: 3px solid var(--secondary);
        border-radius: 0;
      }

      &.combo-badge {
        background: var(--secondary);
        border-radius: 0;
        text-transform: uppercase;
      }

      &.product-title {
        color: var(--primary);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      &.price {
        color: var(--primary);
        font-weight: 800;
        font-size: 20px;
      }

      &.original-price {
        color: #9ca3af;
      }

      &.discount-badge {
        background: var(--primary);
        color: white;
        border-radius: 0;
        padding: 4px 8px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    `
  }

  if (layout === 'menuxp') {
    return comboDialogLayoutStyles.default
  }

  return comboDialogLayoutStyles[layout as keyof typeof comboDialogLayoutStyles] || comboDialogLayoutStyles.default
}
