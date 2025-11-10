export const editCartItemDialogLayoutGlobalStyles = `
  .edit-cart-item-dialog.layout-default .dialog-content {
    border: 1px solid #e5e7eb !important;
    border-radius: 12px !important;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08) !important;
  }

  .edit-cart-item-dialog.layout-default .dialog-header {
    border-bottom: 1px solid #e5e7eb !important;
    padding: 20px !important;
  }

  .edit-cart-item-dialog.layout-default .dialog-title {
    color: #1f2937 !important;
    font-weight: 600 !important;
    font-size: 18px !important;
  }

  .edit-cart-item-dialog.layout-default .combo-badge {
    background: #feba0c !important;
    color: #1f2937 !important;
    border-radius: 8px !important;
    padding: 4px 12px !important;
    font-weight: 600 !important;
  }

  .edit-cart-item-dialog.layout-default .tab-button {
    border-radius: 8px 8px 0 0 !important;
    font-weight: 500 !important;
  }

  .edit-cart-item-dialog.layout-default .tab-button.active {
    background: #3B82F6 !important;
    color: white !important;
  }

  .edit-cart-item-dialog.layout-default .section-title {
    color: #1f2937 !important;
    font-weight: 600 !important;
  }

  .edit-cart-item-dialog.layout-default .item-info {
    background: #f9fafb !important;
    border: 1px solid #e5e7eb !important;
    border-radius: 8px !important;
  }

  .edit-cart-item-dialog.layout-default .item-price {
    color: #10b981 !important;
    font-weight: 700 !important;
  }

  .edit-cart-item-dialog.layout-default .optional-card {
    border: 1px solid #e5e7eb !important;
    border-radius: 8px !important;
  }

  .edit-cart-item-dialog.layout-default .quantity-button {
    border: 1px solid #e5e7eb !important;
    border-radius: 6px !important;
  }

  .edit-cart-item-dialog.layout-default .quantity-button:hover {
    background: #f3f4f6 !important;
  }

  .edit-cart-item-dialog.layout-default .dialog-footer {
    border-top: 1px solid #e5e7eb !important;
    background: #f9fafb !important;
  }

  .edit-cart-item-dialog.layout-dark .dialog-content {
    border: 1px solid #374151 !important;
    border-radius: 12px !important;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4) !important;
    background: #1f2937 !important;
  }

  .edit-cart-item-dialog.layout-dark .dialog-header {
    border-bottom: 1px solid #374151 !important;
    padding: 20px !important;
    background: #1f2937 !important;
  }

  .edit-cart-item-dialog.layout-dark .dialog-title {
    color: #ffffff !important;
    font-weight: 600 !important;
    font-size: 18px !important;
  }

  .edit-cart-item-dialog.layout-dark .combo-badge {
    background: var(--restaurant-secondary-color) !important;
    color: #1f2937 !important;
    border-radius: 8px !important;
    padding: 4px 12px !important;
    font-weight: 600 !important;
  }

  .edit-cart-item-dialog.layout-dark .dialog-body {
    background: #1f2937 !important;
  }

  .edit-cart-item-dialog.layout-dark .tab-button {
    border-radius: 8px 8px 0 0 !important;
    font-weight: 500 !important;
    color: #9ca3af !important;
  }

  .edit-cart-item-dialog.layout-dark .tab-button.active {
    background: var(--restaurant-primary-color) !important;
    color: #1f2937 !important;
  }

  .edit-cart-item-dialog.layout-dark .section-title {
    color: #ffffff !important;
    font-weight: 600 !important;
  }

  .edit-cart-item-dialog.layout-dark .item-info {
    background: #111827 !important;
    border: 1px solid #374151 !important;
    border-radius: 8px !important;
  }

  .edit-cart-item-dialog.layout-dark .item-name {
    color: #ffffff !important;
  }

  .edit-cart-item-dialog.layout-dark .item-price {
    color: var(--restaurant-primary-color) !important;
    font-weight: 700 !important;
  }

  .edit-cart-item-dialog.layout-dark .optional-card {
    border: 1px solid #374151 !important;
    border-radius: 8px !important;
    background: #111827 !important;
  }

  .edit-cart-item-dialog.layout-dark .optional-title {
    color: #ffffff !important;
  }

  .edit-cart-item-dialog.layout-dark .optional-price {
    color: #9ca3af !important;
  }

  .edit-cart-item-dialog.layout-dark .quantity-button {
    border: 1px solid #374151 !important;
    border-radius: 6px !important;
    background: #111827 !important;
    color: #ffffff !important;
  }

  .edit-cart-item-dialog.layout-dark .quantity-button:hover {
    background: #374151 !important;
  }

  .edit-cart-item-dialog.layout-dark .quantity-display {
    color: #ffffff !important;
  }

  .edit-cart-item-dialog.layout-dark .dialog-footer {
    border-top: 1px solid #374151 !important;
    background: #111827 !important;
  }

  .edit-cart-item-dialog.layout-clean .dialog-content {
    border: 1px solid #e5e7eb !important;
    border-radius: 8px !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06) !important;
  }

  .edit-cart-item-dialog.layout-clean .dialog-header {
    border-bottom: 1px solid var(--restaurant-primary-color) !important;
    padding: 20px !important;
  }

  .edit-cart-item-dialog.layout-clean .dialog-title {
    color: #1f2937 !important;
    font-weight: 600 !important;
    font-size: 18px !important;
    border-bottom: 2px solid var(--restaurant-primary-color) !important;
    padding-bottom: 4px !important;
    display: inline-block !important;
  }

  .edit-cart-item-dialog.layout-clean .combo-badge {
    background: var(--restaurant-secondary-color) !important;
    color: white !important;
    border-radius: 4px !important;
    padding: 4px 12px !important;
    font-weight: 500 !important;
  }

  .edit-cart-item-dialog.layout-clean .tab-button {
    border-radius: 4px 4px 0 0 !important;
    font-weight: 500 !important;
  }

  .edit-cart-item-dialog.layout-clean .tab-button.active {
    background: var(--restaurant-primary-color) !important;
    color: white !important;
  }

  .edit-cart-item-dialog.layout-clean .section-title {
    color: var(--restaurant-primary-color) !important;
    font-weight: 600 !important;
    border-bottom: 1px solid var(--restaurant-primary-color) !important;
    padding-bottom: 4px !important;
  }

  .edit-cart-item-dialog.layout-clean .item-info {
    background: #f9fafb !important;
    border: 1px solid #e5e7eb !important;
    border-radius: 6px !important;
  }

  .edit-cart-item-dialog.layout-clean .item-price {
    color: var(--restaurant-primary-color) !important;
    font-weight: 700 !important;
  }

  .edit-cart-item-dialog.layout-clean .optional-card {
    border: 1px solid #e5e7eb !important;
    border-radius: 6px !important;
  }

  .edit-cart-item-dialog.layout-clean .quantity-button {
    border: 1px solid var(--restaurant-primary-color) !important;
    border-radius: 4px !important;
  }

  .edit-cart-item-dialog.layout-clean .quantity-button:hover {
    background: var(--restaurant-primary-color) !important;
    color: white !important;
  }

  .edit-cart-item-dialog.layout-clean .dialog-footer {
    border-top: 1px solid #e5e7eb !important;
    background: white !important;
  }

  .edit-cart-item-dialog.layout-square .dialog-content {
    border: 3px solid var(--restaurant-primary-color) !important;
    border-radius: 0 !important;
    box-shadow: 6px 6px 0 var(--restaurant-primary-color) !important;
  }

  .edit-cart-item-dialog.layout-square .dialog-header {
    border-bottom: 3px solid var(--restaurant-primary-color) !important;
    padding: 24px !important;
  }

  .edit-cart-item-dialog.layout-square .dialog-title {
    color: var(--restaurant-primary-color) !important;
    font-weight: 700 !important;
    font-size: 20px !important;
    text-transform: uppercase !important;
    letter-spacing: 0.5px !important;
  }

  .edit-cart-item-dialog.layout-square .combo-badge {
    background: var(--restaurant-secondary-color) !important;
    color: #1f2937 !important;
    border-radius: 0 !important;
    padding: 6px 16px !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.5px !important;
  }

  .edit-cart-item-dialog.layout-square .tab-button {
    border-radius: 0 !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.5px !important;
  }

  .edit-cart-item-dialog.layout-square .tab-button.active {
    background: var(--restaurant-primary-color) !important;
    color: white !important;
  }

  .edit-cart-item-dialog.layout-square .section-title {
    color: var(--restaurant-primary-color) !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.5px !important;
    border-bottom: 3px solid var(--restaurant-primary-color) !important;
    padding-bottom: 8px !important;
  }

  .edit-cart-item-dialog.layout-square .item-info {
    background: hsl(0, 0%, 98%) !important;
    border: 3px solid var(--restaurant-primary-color) !important;
    border-radius: 0 !important;
  }

  .edit-cart-item-dialog.layout-square .item-price {
    color: var(--restaurant-primary-color) !important;
    font-weight: 800 !important;
  }

  .edit-cart-item-dialog.layout-square .optional-card {
    border: 2px solid var(--restaurant-primary-color) !important;
    border-radius: 0 !important;
  }

  .edit-cart-item-dialog.layout-square .quantity-button {
    border: 2px solid var(--restaurant-primary-color) !important;
    border-radius: 0 !important;
    background: white !important;
  }

  .edit-cart-item-dialog.layout-square .quantity-button:hover {
    background: var(--restaurant-primary-color) !important;
    color: white !important;
  }

  .edit-cart-item-dialog.layout-square .dialog-footer {
    border-top: 3px solid var(--restaurant-primary-color) !important;
    background: hsl(0, 0%, 98%) !important;
  }
`
