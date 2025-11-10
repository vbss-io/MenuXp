export const menuItemCardLayoutGlobalStyles = `
  .menu-item-card.layout-default {
    border-radius: 12px !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
    min-width: 280px !important;
    max-width: 320px !important;

    @media (max-width: 768px) {
      min-width: 260px !important;
      max-width: 280px !important;
    }

    &:hover {
      border-color: var(--restaurant-primary-color) !important;
      transform: translateY(-2px) translateZ(0) !important;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15) !important;
    }
  }

  .menu-item-card.layout-default .discount-chip {
    background: var(--restaurant-primary-color) !important;
    border-radius: 12px !important;
  }

  .menu-item-card.layout-default .menu-item-image {
    border-radius: 12px 12px 0 0 !important;
  }

  .menu-item-card.layout-default .menu-item-content {
    padding: 16px !important;
  }

  .menu-item-card.layout-default .menu-item-name {
    color: hsl(0, 0%, 0%) !important;
  }

  .menu-item-card.layout-default .menu-item-description {
    color: hsl(0, 0%, 50%) !important;
  }

  .menu-item-card.layout-default .menu-item-price .discount-price {
    color: var(--restaurant-primary-color) !important;
  }

  .menu-item-card.layout-default .menu-item-price .current-price {
    color: var(--restaurant-primary-color) !important;
  }

  .menu-item-card.layout-default .menu-item-price .original-price {
    color: hsl(0, 0%, 50%) !important;
  }

  .menu-item-card.layout-default .add-to-cart-button {
    background: var(--restaurant-primary-color) !important;
    border-radius: 8px !important;
  }

  .menu-item-card.layout-dark {
    background: #1a1a1f !important;
    border: none !important;
    border-radius: 12px !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
    min-width: 280px !important;
    max-width: 320px !important;

    @media (max-width: 768px) {
      min-width: 260px !important;
      max-width: 280px !important;
    }

    &:hover {
      border-color: var(--restaurant-primary-color) !important;
      transform: translateY(-2px) translateZ(0) !important;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4) !important;
    }
  }

  .menu-item-card.layout-dark .discount-chip {
    background: var(--restaurant-primary-color) !important;
    border-radius: 12px !important;
  }

  .menu-item-card.layout-dark .menu-item-image {
    border-radius: 12px 12px 0 0 !important;
  }

  .menu-item-card.layout-dark .menu-item-content {
    padding: 16px !important;
    background: #1a1a1f !important;
  }

  .menu-item-card.layout-dark .menu-item-name {
    color: hsl(0, 0%, 100%) !important;
  }

  .menu-item-card.layout-dark .menu-item-description {
    color: #cccccc !important;
  }

  .menu-item-card.layout-dark .menu-item-price .discount-price {
    color: var(--restaurant-primary-color) !important;
  }

  .menu-item-card.layout-dark .menu-item-price .current-price {
    color: var(--restaurant-primary-color) !important;
  }

  .menu-item-card.layout-dark .menu-item-price .original-price {
    color: #999999 !important;
  }

  .menu-item-card.layout-dark .add-to-cart-button {
    background: var(--restaurant-primary-color) !important;
    border-radius: 8px !important;
  }

  .menu-item-card.layout-clean {
    background: hsl(0, 0%, 100%) !important;
    border: 1px solid var(--restaurant-primary-color) !important;
    border-radius: 8px !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05) !important;
    min-width: 260px !important;
    max-width: 300px !important;

    @media (max-width: 768px) {
      min-width: 240px !important;
      max-width: 260px !important;
    }

    &:hover {
      border-color: var(--restaurant-secondary-color) !important;
      transform: translateY(-1px) translateZ(0) !important;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1) !important;
    }
  }

  .menu-item-card.layout-clean .discount-chip {
    background: var(--restaurant-primary-color) !important;
    border-radius: 8px !important;
  }

  .menu-item-card.layout-clean .menu-item-image {
    border-radius: 8px 8px 0 0 !important;
  }

  .menu-item-card.layout-clean .menu-item-content {
    padding: 12px !important;
  }

  .menu-item-card.layout-clean .menu-item-name {
    color: hsl(0, 0%, 0%) !important;
  }

  .menu-item-card.layout-clean .menu-item-description {
    color: hsl(0, 0%, 50%) !important;
  }

  .menu-item-card.layout-clean .menu-item-price .discount-price {
    color: var(--restaurant-primary-color) !important;
  }

  .menu-item-card.layout-clean .menu-item-price .current-price {
    color: var(--restaurant-primary-color) !important;
  }

  .menu-item-card.layout-clean .menu-item-price .original-price {
    color: hsl(0, 0%, 50%) !important;
  }

  .menu-item-card.layout-clean .add-to-cart-button {
    background: var(--restaurant-primary-color) !important;
    border-radius: 6px !important;
  }

  .menu-item-card.layout-square {
    border-radius: 0 !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
    min-width: 280px !important;
    max-width: 320px !important;

    @media (max-width: 768px) {
      min-width: 260px !important;
      max-width: 280px !important;
    }

    &:hover {
      border-color: var(--restaurant-primary-color) !important;
      transform: translateY(-2px) translateZ(0) !important;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15) !important;
    }
  }

  .menu-item-card.layout-square .discount-chip {
    background: var(--restaurant-primary-color) !important;
    border-radius: 0 !important;
  }

  .menu-item-card.layout-square .menu-item-image {
    border-radius: 0 !important;
  }

  .menu-item-card.layout-square .menu-item-content {
    padding: 16px !important;
  }

  .menu-item-card.layout-square .menu-item-name {
    color: hsl(0, 0%, 0%) !important;
  }

  .menu-item-card.layout-square .menu-item-description {
    color: hsl(0, 0%, 50%) !important;
  }

  .menu-item-card.layout-square .menu-item-price .discount-price {
    color: var(--restaurant-primary-color) !important;
  }

  .menu-item-card.layout-square .menu-item-price .current-price {
    color: var(--restaurant-primary-color) !important;
  }

  .menu-item-card.layout-square .menu-item-price .original-price {
    color: hsl(0, 0%, 50%) !important;
  }

  .menu-item-card.layout-square .add-to-cart-button {
    background: var(--restaurant-primary-color) !important;
    border-radius: 0 !important;
  }
`
