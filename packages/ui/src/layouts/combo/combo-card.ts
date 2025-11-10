export const comboCardLayoutGlobalStyles = `
  .combo-card.layout-default {
    border-radius: 12px !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
    min-width: 280px !important;
    max-width: 320px !important;

    @media (max-width: 768px) {
      min-width: 260px !important;
      max-width: 280px !important;
    }
  }

  .combo-card.layout-default:hover {
    border-color: var(--restaurant-secondary-color) !important;
    transform: translateY(-2px) translateZ(0) !important;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15) !important;
  }

  .combo-card.layout-default .combo-badge {
    background: var(--restaurant-secondary-color) !important;
    border-radius: 12px !important;
  }

  .combo-card.layout-default .discount-chip {
    background: var(--restaurant-primary-color) !important;
    border-radius: 12px !important;
  }

  .combo-card.layout-default .combo-image {
    border-radius: 12px 12px 0 0 !important;
  }

  .combo-card.layout-default .combo-content {
    padding: 16px !important;
  }

  .combo-card.layout-default .combo-name {
    color: hsl(0, 0%, 0%) !important;
  }

  .combo-card.layout-default .combo-description {
    color: hsl(0, 0%, 50%) !important;
  }

  .combo-card.layout-default .combo-items-count {
    color: hsl(0, 0%, 50%) !important;
  }

  .combo-card.layout-default .combo-price .discount-price {
    color: var(--restaurant-primary-color) !important;
  }

  .combo-card.layout-default .combo-price .current-price {
    color: var(--restaurant-primary-color) !important;
  }

  .combo-card.layout-default .combo-price .original-price {
    color: hsl(0, 0%, 50%) !important;
  }

  .combo-card.layout-default .add-to-cart-button {
    background: var(--restaurant-primary-color) !important;
    border-radius: 8px !important;
  }

  .combo-card.layout-dark {
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
  }

  .combo-card.layout-dark:hover {
    border-color: var(--restaurant-secondary-color) !important;
    transform: translateY(-2px) translateZ(0) !important;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4) !important;
  }

  .combo-card.layout-dark .combo-badge {
    background: var(--restaurant-secondary-color) !important;
    border-radius: 12px !important;
  }

  .combo-card.layout-dark .discount-chip {
    background: var(--restaurant-primary-color) !important;
    border-radius: 12px !important;
  }

  .combo-card.layout-dark .combo-image {
    border-radius: 12px 12px 0 0 !important;
  }

  .combo-card.layout-dark .combo-content {
    padding: 16px !important;
    background: #1a1a1f !important;
  }

  .combo-card.layout-dark .combo-name {
    color: hsl(0, 0%, 100%) !important;
  }

  .combo-card.layout-dark .combo-description {
    color: #cccccc !important;
  }

  .combo-card.layout-dark .combo-items-count {
    color: #cccccc !important;
  }

  .combo-card.layout-dark .combo-price .discount-price {
    color: var(--restaurant-primary-color) !important;
  }

  .combo-card.layout-dark .combo-price .current-price {
    color: var(--restaurant-primary-color) !important;
  }

  .combo-card.layout-dark .combo-price .original-price {
    color: #999999 !important;
  }

  .combo-card.layout-dark .add-to-cart-button {
    background: var(--restaurant-primary-color) !important;
    border-radius: 8px !important;
  }

  .combo-card.layout-clean {
    background: hsl(0, 0%, 100%) !important;
    border: 1px solid var(--restaurant-secondary-color) !important;
    border-radius: 8px !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05) !important;
    min-width: 260px !important;
    max-width: 300px !important;

    @media (max-width: 768px) {
      min-width: 240px !important;
      max-width: 260px !important;
    }
  }

  .combo-card.layout-clean:hover {
    border-color: var(--restaurant-primary-color) !important;
    transform: translateY(-1px) translateZ(0) !important;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1) !important;
  }

  .combo-card.layout-clean .combo-badge {
    background: var(--restaurant-secondary-color) !important;
    border-radius: 8px !important;
  }

  .combo-card.layout-clean .discount-chip {
    background: var(--restaurant-primary-color) !important;
    border-radius: 8px !important;
  }

  .combo-card.layout-clean .combo-image {
    border-radius: 8px 8px 0 0 !important;
  }

  .combo-card.layout-clean .combo-content {
    padding: 12px !important;
  }

  .combo-card.layout-clean .combo-name {
    color: hsl(0, 0%, 0%) !important;
  }

  .combo-card.layout-clean .combo-description {
    color: hsl(0, 0%, 50%) !important;
  }

  .combo-card.layout-clean .combo-items-count {
    color: hsl(0, 0%, 50%) !important;
  }

  .combo-card.layout-clean .combo-price .discount-price {
    color: var(--restaurant-primary-color) !important;
  }

  .combo-card.layout-clean .combo-price .current-price {
    color: var(--restaurant-primary-color) !important;
  }

  .combo-card.layout-clean .combo-price .original-price {
    color: hsl(0, 0%, 50%) !important;
  }

  .combo-card.layout-clean .add-to-cart-button {
    background: var(--restaurant-primary-color) !important;
    border-radius: 6px !important;
  }

  .combo-card.layout-square {
    border-radius: 0 !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
    min-width: 280px !important;
    max-width: 320px !important;

    @media (max-width: 768px) {
      min-width: 260px !important;
      max-width: 280px !important;
    }
  }

  .combo-card.layout-square:hover {
    border-color: var(--restaurant-secondary-color) !important;
    transform: translateY(-2px) translateZ(0) !important;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15) !important;
  }

  .combo-card.layout-square .combo-badge {
    background: var(--restaurant-secondary-color) !important;
    border-radius: 0 !important;
  }

  .combo-card.layout-square .discount-chip {
    background: var(--restaurant-primary-color) !important;
    border-radius: 0 !important;
  }

  .combo-card.layout-square .combo-image {
    border-radius: 0 !important;
  }

  .combo-card.layout-square .combo-content {
    padding: 16px !important;
  }

  .combo-card.layout-square .combo-name {
    color: hsl(0, 0%, 0%) !important;
  }

  .combo-card.layout-square .combo-description {
    color: hsl(0, 0%, 50%) !important;
  }

  .combo-card.layout-square .combo-items-count {
    color: hsl(0, 0%, 50%) !important;
  }

  .combo-card.layout-square .combo-price .discount-price {
    color: var(--restaurant-primary-color) !important;
  }

  .combo-card.layout-square .combo-price .current-price {
    color: var(--restaurant-primary-color) !important;
  }

  .combo-card.layout-square .combo-price .original-price {
    color: hsl(0, 0%, 50%) !important;
  }

  .combo-card.layout-square .add-to-cart-button {
    background: var(--restaurant-primary-color) !important;
    border-radius: 0 !important;
  }
`


