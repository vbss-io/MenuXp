import { css } from 'styled-components'

export const getMenuItemDialogLayoutStyle = (layout: string) => {
  const menuItemDialogLayoutStyles = {
    menuxp: css`
      &.dialog-header {
        border-bottom: 2px solid var(--primary);
        padding-bottom: 20px;
      }

      &.product-image {
        border: 3px solid var(--primary);
        border-radius: 16px;
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
        background: var(--secondary);
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
        background: var(--secondary);
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
        border: 2px solid var(--primary);
        border-radius: 12px;
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
        background: var(--secondary);
        color: white;
        border-radius: 8px;
        padding: 4px 8px;
        font-weight: 600;
      }
    `,

    clean: css`
      &.dialog-header {
        border-bottom: 2px solid var(--primary);
        padding-bottom: 20px;
      }

      &.product-image {
        border: 2px solid var(--primary);
        border-radius: 8px;
      }

      &.product-title {
        color: #1f2937;
        font-weight: 600;
        border-bottom: 1px solid var(--primary);
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
        background: var(--secondary);
        color: white;
        border-radius: 4px;
        padding: 2px 6px;
        font-weight: 500;
        font-size: 11px;
      }
    `,

    square: css`
      &.dialog-header {
        border-bottom: 3px solid var(--primary);
        padding-bottom: 20px;
      }

      &.product-image {
        border: 3px solid var(--primary);
        border-radius: 0;
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
        background: var(--secondary);
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
    return menuItemDialogLayoutStyles.default
  }

  return (
    menuItemDialogLayoutStyles[layout as keyof typeof menuItemDialogLayoutStyles] || menuItemDialogLayoutStyles.default
  )
}
