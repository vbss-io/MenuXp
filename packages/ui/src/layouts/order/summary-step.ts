export const summaryStepLayoutGlobalStyles = `
  .summary-step.layout-default {
    padding: 1.5rem !important;
    background: hsl(0, 0%, 100%) !important;
    border-radius: 12px !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
  }

  .summary-step.layout-default .summary-title {
    font-size: 1.25rem !important;
    font-weight: 700 !important;
    color: hsl(0, 0%, 0%) !important;
    margin-bottom: 1.5rem !important;
  }

  .summary-step.layout-default .summary-row {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    padding: 0.75rem 0 !important;
    border-bottom: 1px solid hsl(0, 0%, 90%) !important;
  }

  .summary-step.layout-default .summary-row:last-child {
    border-bottom: none !important;
    margin-top: 0.75rem !important;
    padding-top: 0.75rem !important;
    border-top: 2px solid hsl(0, 0%, 85%) !important;
  }

  .summary-step.layout-default .summary-label {
    font-size: 0.875rem !important;
    font-weight: 500 !important;
    color: hsl(0, 0%, 20%) !important;
  }

  .summary-step.layout-default .summary-value {
    font-size: 0.875rem !important;
    font-weight: 500 !important;
    color: hsl(0, 0%, 30%) !important;
    text-align: right !important;
  }

  .summary-step.layout-default .summary-total-label {
    font-size: 1.125rem !important;
    font-weight: 700 !important;
    color: hsl(0, 0%, 0%) !important;
  }

  .summary-step.layout-default .summary-total-value {
    font-size: 1.125rem !important;
    font-weight: 700 !important;
    color: var(--restaurant-primary-color) !important;
  }

  .summary-step.layout-default .summary-divider {
    height: 1px !important;
    background: hsl(0, 0%, 90%) !important;
    margin: 0.75rem 0 !important;
  }

  .summary-step.layout-default .free-delivery {
    color: #10b981 !important;
    font-weight: 600 !important;
  }

  .summary-step.layout-dark {
    padding: 1.5rem !important;
    background: #1a1a1f !important;
    border-radius: 12px !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
  }

  .summary-step.layout-dark .summary-title {
    font-size: 1.25rem !important;
    font-weight: 700 !important;
    color: hsl(0, 0%, 100%) !important;
    margin-bottom: 1.5rem !important;
  }

  .summary-step.layout-dark .summary-row {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    padding: 0.75rem 0 !important;
    border-bottom: 1px solid hsl(0, 0%, 25%) !important;
  }

  .summary-step.layout-dark .summary-row:last-child {
    border-bottom: none !important;
    margin-top: 0.75rem !important;
    padding-top: 0.75rem !important;
    border-top: 2px solid hsl(0, 0%, 30%) !important;
  }

  .summary-step.layout-dark .summary-label {
    font-size: 0.875rem !important;
    font-weight: 500 !important;
    color: #cccccc !important;
  }

  .summary-step.layout-dark .summary-value {
    font-size: 0.875rem !important;
    font-weight: 500 !important;
    color: #e0e0e0 !important;
    text-align: right !important;
  }

  .summary-step.layout-dark .summary-total-label {
    font-size: 1.125rem !important;
    font-weight: 700 !important;
    color: hsl(0, 0%, 100%) !important;
  }

  .summary-step.layout-dark .summary-total-value {
    font-size: 1.125rem !important;
    font-weight: 700 !important;
    color: var(--restaurant-primary-color) !important;
  }

  .summary-step.layout-dark .summary-divider {
    height: 1px !important;
    background: hsl(0, 0%, 25%) !important;
    margin: 0.75rem 0 !important;
  }

  .summary-step.layout-dark .free-delivery {
    color: #34d399 !important;
    font-weight: 600 !important;
  }

  .summary-step.layout-clean {
    padding: 1.25rem !important;
    background: hsl(0, 0%, 100%) !important;
    border: 1px solid var(--restaurant-primary-color) !important;
    border-radius: 8px !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05) !important;
  }

  .summary-step.layout-clean .summary-title {
    font-size: 1.125rem !important;
    font-weight: 700 !important;
    color: hsl(0, 0%, 0%) !important;
    margin-bottom: 1.25rem !important;
  }

  .summary-step.layout-clean .summary-row {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    padding: 0.625rem 0 !important;
    border-bottom: 1px solid hsl(0, 0%, 92%) !important;
  }

  .summary-step.layout-clean .summary-row:last-child {
    border-bottom: none !important;
    margin-top: 0.625rem !important;
    padding-top: 0.625rem !important;
    border-top: 1px solid hsl(0, 0%, 88%) !important;
  }

  .summary-step.layout-clean .summary-label {
    font-size: 0.875rem !important;
    font-weight: 500 !important;
    color: hsl(0, 0%, 25%) !important;
  }

  .summary-step.layout-clean .summary-value {
    font-size: 0.875rem !important;
    font-weight: 500 !important;
    color: hsl(0, 0%, 35%) !important;
    text-align: right !important;
  }

  .summary-step.layout-clean .summary-total-label {
    font-size: 1rem !important;
    font-weight: 700 !important;
    color: hsl(0, 0%, 0%) !important;
  }

  .summary-step.layout-clean .summary-total-value {
    font-size: 1rem !important;
    font-weight: 700 !important;
    color: var(--restaurant-primary-color) !important;
  }

  .summary-step.layout-clean .summary-divider {
    height: 1px !important;
    background: hsl(0, 0%, 92%) !important;
    margin: 0.625rem 0 !important;
  }

  .summary-step.layout-clean .free-delivery {
    color: #10b981 !important;
    font-weight: 600 !important;
  }

  .summary-step.layout-square {
    padding: 1.5rem !important;
    background: hsl(0, 0%, 100%) !important;
    border-radius: 0 !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
  }

  .summary-step.layout-square .summary-title {
    font-size: 1.25rem !important;
    font-weight: 700 !important;
    color: hsl(0, 0%, 0%) !important;
    margin-bottom: 1.5rem !important;
  }

  .summary-step.layout-square .summary-row {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    padding: 0.75rem 0 !important;
    border-bottom: 1px solid hsl(0, 0%, 90%) !important;
  }

  .summary-step.layout-square .summary-row:last-child {
    border-bottom: none !important;
    margin-top: 0.75rem !important;
    padding-top: 0.75rem !important;
    border-top: 2px solid hsl(0, 0%, 85%) !important;
  }

  .summary-step.layout-square .summary-label {
    font-size: 0.875rem !important;
    font-weight: 500 !important;
    color: hsl(0, 0%, 20%) !important;
  }

  .summary-step.layout-square .summary-value {
    font-size: 0.875rem !important;
    font-weight: 500 !important;
    color: hsl(0, 0%, 30%) !important;
    text-align: right !important;
  }

  .summary-step.layout-square .summary-total-label {
    font-size: 1.125rem !important;
    font-weight: 700 !important;
    color: hsl(0, 0%, 0%) !important;
  }

  .summary-step.layout-square .summary-total-value {
    font-size: 1.125rem !important;
    font-weight: 700 !important;
    color: var(--restaurant-primary-color) !important;
  }

  .summary-step.layout-square .summary-divider {
    height: 1px !important;
    background: hsl(0, 0%, 90%) !important;
    margin: 0.75rem 0 !important;
  }

  .summary-step.layout-square .free-delivery {
    color: #10b981 !important;
    font-weight: 600 !important;
  }
`
