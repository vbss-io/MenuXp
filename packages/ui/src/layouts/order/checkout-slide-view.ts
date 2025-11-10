export const checkoutSlideViewLayoutGlobalStyles = `
  .checkout-slide-view.layout-default {
    border-radius: 12px !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
  }

  .checkout-slide-view.layout-default .slide-overlay {
    background: rgba(0, 0, 0, 0.5) !important;
  }

  .checkout-slide-view.layout-default .slide-container {
    background: hsl(0, 0%, 100%) !important;
    border-radius: 0 !important;
  }

  .checkout-slide-view.layout-default .slide-header {
    border-bottom: 1px solid hsl(0, 0%, 90%) !important;
    background: hsl(0, 0%, 100%) !important;
  }

  .checkout-slide-view.layout-default .header-title {
    color: hsl(0, 0%, 7%) !important;
  }

  .checkout-slide-view.layout-default .close-button {
    border-radius: 6px !important;
    transition: background-color 0.2s ease !important;
  }

  .checkout-slide-view.layout-default .close-button:hover {
    background: hsl(0, 0%, 95%) !important;
  }

  .checkout-slide-view.layout-default .steps-container {
    padding: 0 1rem !important;
  }

  .checkout-slide-view.layout-default .step::after {
    background: hsl(0, 0%, 82%) !important;
  }

  .checkout-slide-view.layout-default .step.completed::after {
    background: #10B981 !important;
  }

  .checkout-slide-view.layout-default .step.active::after {
    background: #3B82F6 !important;
  }

  .checkout-slide-view.layout-default .step-icon {
    border-radius: 50% !important;
    background: hsl(0, 0%, 62%) !important;
    color: hsl(0, 0%, 100%) !important;
  }

  .checkout-slide-view.layout-default .step-icon.completed {
    background: #10B981 !important;
  }

  .checkout-slide-view.layout-default .step-icon.active {
    background: #3B82F6 !important;
  }

  .checkout-slide-view.layout-default .step-label {
    color: hsl(0, 0%, 42%) !important;
  }

  .checkout-slide-view.layout-default .step-label.completed {
    color: #059669 !important;
  }

  .checkout-slide-view.layout-default .step-label.active {
    color: #2563EB !important;
  }

  .checkout-slide-view.layout-default .navigation-button {
    border-radius: 6px !important;
    border: 2px solid var(--restaurant-primary-color) !important;
    transition: all 0.2s ease !important;
  }

  .checkout-slide-view.layout-default .navigation-button.primary {
    background: var(--restaurant-primary-color) !important;
    color: hsl(0, 0%, 100%) !important;
  }

  .checkout-slide-view.layout-default .navigation-button.secondary {
    background: transparent !important;
    color: var(--restaurant-primary-color) !important;
  }

  .checkout-slide-view.layout-default .navigation-button:hover:not(:disabled) {
    transform: translate(-2px, -2px) !important;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
  }

  .checkout-slide-view.layout-default .navigation-button:disabled {
    opacity: 0.6 !important;
    cursor: not-allowed !important;
    transform: none !important;
  }

  .checkout-slide-view.layout-dark {
    border-radius: 12px !important;
  }

  .checkout-slide-view.layout-dark .slide-overlay {
    background: rgba(0, 0, 0, 0.7) !important;
  }

  .checkout-slide-view.layout-dark .slide-container {
    background: #1a1a1f !important;
    border-radius: 0 !important;
  }

  .checkout-slide-view.layout-dark .slide-header {
    border-bottom: 1px solid #2a2a2f !important;
    background: #1a1a1f !important;
  }

  .checkout-slide-view.layout-dark .header-title {
    color: hsl(0, 0%, 100%) !important;
  }

  .checkout-slide-view.layout-dark .close-button {
    border-radius: 6px !important;
    transition: background-color 0.2s ease !important;
  }

  .checkout-slide-view.layout-dark .close-button:hover {
    background: #2a2a2f !important;
  }

  .checkout-slide-view.layout-dark .steps-container {
    padding: 0 1rem !important;
  }

  .checkout-slide-view.layout-dark .step::after {
    background: #404040 !important;
  }

  .checkout-slide-view.layout-dark .step.completed::after {
    background: #10B981 !important;
  }

  .checkout-slide-view.layout-dark .step.active::after {
    background: var(--restaurant-primary-color) !important;
  }

  .checkout-slide-view.layout-dark .step-icon {
    border-radius: 50% !important;
    background: #404040 !important;
    color: hsl(0, 0%, 100%) !important;
  }

  .checkout-slide-view.layout-dark .step-icon.completed {
    background: #10B981 !important;
  }

  .checkout-slide-view.layout-dark .step-icon.active {
    background: var(--restaurant-primary-color) !important;
  }

  .checkout-slide-view.layout-dark .step-label {
    color: #999999 !important;
  }

  .checkout-slide-view.layout-dark .step-label.completed {
    color: #10B981 !important;
  }

  .checkout-slide-view.layout-dark .step-label.active {
    color: var(--restaurant-primary-color) !important;
  }

  .checkout-slide-view.layout-dark .navigation-button {
    border-radius: 6px !important;
    border: 2px solid var(--restaurant-primary-color) !important;
    transition: all 0.2s ease !important;
  }

  .checkout-slide-view.layout-dark .navigation-button.primary {
    background: var(--restaurant-primary-color) !important;
    color: hsl(0, 0%, 100%) !important;
  }

  .checkout-slide-view.layout-dark .navigation-button.secondary {
    background: transparent !important;
    color: var(--restaurant-primary-color) !important;
  }

  .checkout-slide-view.layout-dark .navigation-button:hover:not(:disabled) {
    transform: translate(-2px, -2px) !important;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2) !important;
  }

  .checkout-slide-view.layout-dark .navigation-button:disabled {
    opacity: 0.6 !important;
    cursor: not-allowed !important;
    transform: none !important;
  }

  .checkout-slide-view.layout-clean {
    border-radius: 8px !important;
  }

  .checkout-slide-view.layout-clean .slide-overlay {
    background: rgba(0, 0, 0, 0.4) !important;
  }

  .checkout-slide-view.layout-clean .slide-container {
    background: hsl(0, 0%, 100%) !important;
    border-radius: 0 !important;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1) !important;
  }

  .checkout-slide-view.layout-clean .slide-header {
    border-bottom: 1px solid hsl(0, 0%, 90%) !important;
    background: hsl(0, 0%, 100%) !important;
  }

  .checkout-slide-view.layout-clean .header-title {
    color: hsl(0, 0%, 7%) !important;
    font-weight: 600 !important;
  }

  .checkout-slide-view.layout-clean .close-button {
    border-radius: 6px !important;
    transition: background-color 0.2s ease !important;
  }

  .checkout-slide-view.layout-clean .close-button:hover {
    background: hsl(0, 0%, 96%) !important;
  }

  .checkout-slide-view.layout-clean .steps-container {
    padding: 0 1rem !important;
  }

  .checkout-slide-view.layout-clean .step::after {
    background: hsl(0, 0%, 85%) !important;
    height: 1px !important;
  }

  .checkout-slide-view.layout-clean .step.completed::after {
    background: var(--restaurant-primary-color) !important;
  }

  .checkout-slide-view.layout-clean .step.active::after {
    background: var(--restaurant-primary-color) !important;
  }

  .checkout-slide-view.layout-clean .step-icon {
    border-radius: 50% !important;
    background: hsl(0, 0%, 92%) !important;
    color: hsl(0, 0%, 42%) !important;
    border: 1px solid hsl(0, 0%, 85%) !important;
  }

  .checkout-slide-view.layout-clean .step-icon.completed {
    background: var(--restaurant-primary-color) !important;
    color: hsl(0, 0%, 100%) !important;
    border-color: var(--restaurant-primary-color) !important;
  }

  .checkout-slide-view.layout-clean .step-icon.active {
    background: var(--restaurant-primary-color) !important;
    color: hsl(0, 0%, 100%) !important;
    border-color: var(--restaurant-primary-color) !important;
  }

  .checkout-slide-view.layout-clean .step-label {
    color: hsl(0, 0%, 52%) !important;
    font-weight: 500 !important;
  }

  .checkout-slide-view.layout-clean .step-label.completed {
    color: var(--restaurant-primary-color) !important;
  }

  .checkout-slide-view.layout-clean .step-label.active {
    color: var(--restaurant-primary-color) !important;
  }

  .checkout-slide-view.layout-clean .navigation-button {
    border-radius: 6px !important;
    border: 1px solid var(--restaurant-primary-color) !important;
    transition: all 0.2s ease !important;
  }

  .checkout-slide-view.layout-clean .navigation-button.primary {
    background: var(--restaurant-primary-color) !important;
    color: hsl(0, 0%, 100%) !important;
  }

  .checkout-slide-view.layout-clean .navigation-button.secondary {
    background: transparent !important;
    color: var(--restaurant-primary-color) !important;
  }

  .checkout-slide-view.layout-clean .navigation-button:hover:not(:disabled) {
    transform: translateY(-1px) !important;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1) !important;
  }

  .checkout-slide-view.layout-clean .navigation-button:disabled {
    opacity: 0.5 !important;
    cursor: not-allowed !important;
    transform: none !important;
  }

  .checkout-slide-view.layout-square {
    border-radius: 0 !important;
  }

  .checkout-slide-view.layout-square .slide-overlay {
    background: rgba(0, 0, 0, 0.5) !important;
  }

  .checkout-slide-view.layout-square .slide-container {
    background: hsl(0, 0%, 100%) !important;
    border-radius: 0 !important;
  }

  .checkout-slide-view.layout-square .slide-header {
    border-bottom: 1px solid hsl(0, 0%, 90%) !important;
    background: hsl(0, 0%, 100%) !important;
  }

  .checkout-slide-view.layout-square .header-title {
    color: hsl(0, 0%, 7%) !important;
  }

  .checkout-slide-view.layout-square .close-button {
    border-radius: 0 !important;
    transition: background-color 0.2s ease !important;
  }

  .checkout-slide-view.layout-square .close-button:hover {
    background: hsl(0, 0%, 95%) !important;
  }

  .checkout-slide-view.layout-square .steps-container {
    padding: 0 1rem !important;
  }

  .checkout-slide-view.layout-square .step::after {
    background: hsl(0, 0%, 82%) !important;
  }

  .checkout-slide-view.layout-square .step.completed::after {
    background: #10B981 !important;
  }

  .checkout-slide-view.layout-square .step.active::after {
    background: #3B82F6 !important;
  }

  .checkout-slide-view.layout-square .step-icon {
    border-radius: 0 !important;
    background: hsl(0, 0%, 62%) !important;
    color: hsl(0, 0%, 100%) !important;
  }

  .checkout-slide-view.layout-square .step-icon.completed {
    background: #10B981 !important;
  }

  .checkout-slide-view.layout-square .step-icon.active {
    background: #3B82F6 !important;
  }

  .checkout-slide-view.layout-square .step-label {
    color: hsl(0, 0%, 42%) !important;
  }

  .checkout-slide-view.layout-square .step-label.completed {
    color: #059669 !important;
  }

  .checkout-slide-view.layout-square .step-label.active {
    color: #2563EB !important;
  }

  .checkout-slide-view.layout-square .navigation-button {
    border-radius: 0 !important;
    border: 2px solid var(--restaurant-primary-color) !important;
    transition: all 0.2s ease !important;
  }

  .checkout-slide-view.layout-square .navigation-button.primary {
    background: var(--restaurant-primary-color) !important;
    color: hsl(0, 0%, 100%) !important;
  }

  .checkout-slide-view.layout-square .navigation-button.secondary {
    background: transparent !important;
    color: var(--restaurant-primary-color) !important;
  }

  .checkout-slide-view.layout-square .navigation-button:hover:not(:disabled) {
    transform: translate(-2px, -2px) !important;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
  }

  .checkout-slide-view.layout-square .navigation-button:disabled {
    opacity: 0.6 !important;
    cursor: not-allowed !important;
    transform: none !important;
  }
`
