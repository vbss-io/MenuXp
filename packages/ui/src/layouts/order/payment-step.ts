export const paymentStepLayoutGlobalStyles = `
  .payment-step.layout-default {
    border-radius: 12px !important;

    @media (max-width: 768px) {
      border-radius: 8px !important;
    }
  }

  .payment-step.layout-default .payment-form-section h3 {
    color: hsl(0, 0%, 0%) !important;
  }

  .payment-step.layout-default .guest-info-alert {
    background: #dbeafe !important;
    border: 2px solid #3b82f6 !important;
    border-radius: 12px !important;
    color: #1e40af !important;
  }

  .payment-step.layout-default .guest-info-alert svg {
    color: #3b82f6 !important;
  }

  .payment-step.layout-default .form-label {
    color: hsl(0, 0%, 7%) !important;
  }

  .payment-step.layout-default .form-input {
    border: 1px solid #d1d5db !important;
    border-radius: 8px !important;
    background: hsl(0, 0%, 100%) !important;
  }

  .payment-step.layout-default .form-input:focus {
    border-color: var(--restaurant-primary-color) !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
  }

  .payment-step.layout-default .form-select {
    border: 1px solid #d1d5db !important;
    border-radius: 8px !important;
    background: hsl(0, 0%, 100%) !important;
  }

  .payment-step.layout-default .form-select:focus {
    border-color: var(--restaurant-primary-color) !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
  }

  .payment-step.layout-default .field-hint {
    color: #6b7280 !important;
  }

  .payment-step.layout-default .existing-client-info {
    background: #d1fae5 !important;
    border: 2px solid #10b981 !important;
    border-radius: 12px !important;
    color: #065f46 !important;
  }

  .payment-step.layout-default .existing-client-info svg {
    color: #10b981 !important;
  }

  .payment-step.layout-default .scheduling-alert {
    background: #fef3c7 !important;
    border: 2px solid #f59e0b !important;
    border-radius: 12px !important;
    color: #92400e !important;
  }

  .payment-step.layout-default .scheduling-alert svg {
    color: #f59e0b !important;
  }

  .payment-step.layout-default .delivery-fee-info {
    background: #f9fafb !important;
    border-radius: 8px !important;
    color: #6b7280 !important;
  }

  .payment-step.layout-default .divider {
    background: #e5e7eb !important;
  }

  .payment-step.layout-dark {
    background: #1a1a1f !important;
    border-radius: 12px !important;

    @media (max-width: 768px) {
      border-radius: 8px !important;
    }
  }

  .payment-step.layout-dark .payment-form-section h3 {
    color: hsl(0, 0%, 100%) !important;
  }

  .payment-step.layout-dark .guest-info-alert {
    background: #1e3a5f !important;
    border: 2px solid #3b82f6 !important;
    border-radius: 12px !important;
    color: #93c5fd !important;
  }

  .payment-step.layout-dark .guest-info-alert svg {
    color: #3b82f6 !important;
  }

  .payment-step.layout-dark .form-label {
    color: hsl(0, 0%, 93%) !important;
  }

  .payment-step.layout-dark .form-input {
    border: 1px solid #374151 !important;
    border-radius: 8px !important;
    background: #111827 !important;
    color: hsl(0, 0%, 100%) !important;
  }

  .payment-step.layout-dark .form-input:focus {
    border-color: var(--restaurant-primary-color) !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2) !important;
  }

  .payment-step.layout-dark .form-select {
    border: 1px solid #374151 !important;
    border-radius: 8px !important;
    background: #111827 !important;
    color: hsl(0, 0%, 100%) !important;
  }

  .payment-step.layout-dark .form-select:focus {
    border-color: var(--restaurant-primary-color) !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2) !important;
  }

  .payment-step.layout-dark .field-hint {
    color: #9ca3af !important;
  }

  .payment-step.layout-dark .existing-client-info {
    background: #064e3b !important;
    border: 2px solid #10b981 !important;
    border-radius: 12px !important;
    color: #6ee7b7 !important;
  }

  .payment-step.layout-dark .existing-client-info svg {
    color: #10b981 !important;
  }

  .payment-step.layout-dark .scheduling-alert {
    background: #78350f !important;
    border: 2px solid #f59e0b !important;
    border-radius: 12px !important;
    color: #fde68a !important;
  }

  .payment-step.layout-dark .scheduling-alert svg {
    color: #f59e0b !important;
  }

  .payment-step.layout-dark .delivery-fee-info {
    background: #111827 !important;
    border-radius: 8px !important;
    color: #9ca3af !important;
  }

  .payment-step.layout-dark .divider {
    background: #374151 !important;
  }

  .payment-step.layout-clean {
    border: 1px solid var(--restaurant-primary-color) !important;
    border-radius: 8px !important;
    background: hsl(0, 0%, 100%) !important;

    @media (max-width: 768px) {
      border-radius: 6px !important;
    }
  }

  .payment-step.layout-clean .payment-form-section h3 {
    color: hsl(0, 0%, 0%) !important;
  }

  .payment-step.layout-clean .guest-info-alert {
    background: #eff6ff !important;
    border: 1px solid #3b82f6 !important;
    border-radius: 8px !important;
    color: #1e40af !important;
  }

  .payment-step.layout-clean .guest-info-alert svg {
    color: #3b82f6 !important;
  }

  .payment-step.layout-clean .form-label {
    color: hsl(0, 0%, 7%) !important;
  }

  .payment-step.layout-clean .form-input {
    border: 1px solid #d1d5db !important;
    border-radius: 6px !important;
    background: hsl(0, 0%, 100%) !important;
  }

  .payment-step.layout-clean .form-input:focus {
    border-color: var(--restaurant-primary-color) !important;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.08) !important;
  }

  .payment-step.layout-clean .form-select {
    border: 1px solid #d1d5db !important;
    border-radius: 6px !important;
    background: hsl(0, 0%, 100%) !important;
  }

  .payment-step.layout-clean .form-select:focus {
    border-color: var(--restaurant-primary-color) !important;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.08) !important;
  }

  .payment-step.layout-clean .field-hint {
    color: #6b7280 !important;
  }

  .payment-step.layout-clean .existing-client-info {
    background: #ecfdf5 !important;
    border: 1px solid #10b981 !important;
    border-radius: 8px !important;
    color: #065f46 !important;
  }

  .payment-step.layout-clean .existing-client-info svg {
    color: #10b981 !important;
  }

  .payment-step.layout-clean .scheduling-alert {
    background: #fffbeb !important;
    border: 1px solid #f59e0b !important;
    border-radius: 8px !important;
    color: #92400e !important;
  }

  .payment-step.layout-clean .scheduling-alert svg {
    color: #f59e0b !important;
  }

  .payment-step.layout-clean .delivery-fee-info {
    background: #f9fafb !important;
    border-radius: 6px !important;
    color: #6b7280 !important;
  }

  .payment-step.layout-clean .divider {
    background: #e5e7eb !important;
  }

  .payment-step.layout-square {
    border-radius: 0 !important;
  }

  .payment-step.layout-square .payment-form-section h3 {
    color: hsl(0, 0%, 0%) !important;
  }

  .payment-step.layout-square .guest-info-alert {
    background: #dbeafe !important;
    border: 2px solid #3b82f6 !important;
    border-radius: 0 !important;
    color: #1e40af !important;
  }

  .payment-step.layout-square .guest-info-alert svg {
    color: #3b82f6 !important;
  }

  .payment-step.layout-square .form-label {
    color: hsl(0, 0%, 7%) !important;
  }

  .payment-step.layout-square .form-input {
    border: 1px solid #d1d5db !important;
    border-radius: 0 !important;
    background: hsl(0, 0%, 100%) !important;
  }

  .payment-step.layout-square .form-input:focus {
    border-color: var(--restaurant-primary-color) !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
  }

  .payment-step.layout-square .form-select {
    border: 1px solid #d1d5db !important;
    border-radius: 0 !important;
    background: hsl(0, 0%, 100%) !important;
  }

  .payment-step.layout-square .form-select:focus {
    border-color: var(--restaurant-primary-color) !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
  }

  .payment-step.layout-square .field-hint {
    color: #6b7280 !important;
  }

  .payment-step.layout-square .existing-client-info {
    background: #d1fae5 !important;
    border: 2px solid #10b981 !important;
    border-radius: 0 !important;
    color: #065f46 !important;
  }

  .payment-step.layout-square .existing-client-info svg {
    color: #10b981 !important;
  }

  .payment-step.layout-square .scheduling-alert {
    background: #fef3c7 !important;
    border: 2px solid #f59e0b !important;
    border-radius: 0 !important;
    color: #92400e !important;
  }

  .payment-step.layout-square .scheduling-alert svg {
    color: #f59e0b !important;
  }

  .payment-step.layout-square .delivery-fee-info {
    background: #f9fafb !important;
    border-radius: 0 !important;
    color: #6b7280 !important;
  }

  .payment-step.layout-square .divider {
    background: #e5e7eb !important;
  }
`
