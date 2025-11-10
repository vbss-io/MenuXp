import styled from 'styled-components'

export const PaymentStep = styled.div`
  &.payment-step {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
`

export const FormSection = styled.div`
  &.payment-form-section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    h3 {
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0;
      color: ${({ theme }) => theme.colors.text.primary};
    }
  }
`

export const GuestInfoAlert = styled.div`
  &.guest-info-alert {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: #dbeafe;
    border: 2px solid #3b82f6;
    border-radius: 8px;
    color: #1e40af;
    font-size: 0.875rem;

    svg {
      color: #3b82f6;
      flex-shrink: 0;
    }

    span {
      line-height: 1.4;
    }
  }
`

export const FormGroup = styled.div`
  &.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`

export const Label = styled.label`
  &.form-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.primary};

    svg {
      width: 16px;
      height: 16px;
    }
  }
`

export const Select = styled.select`
  &.form-select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 0.875rem;
    background: white;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--restaurant-primary-color);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
  }
`

export const FieldHint = styled.span`
  &.field-hint {
    font-size: 0.75rem;
    color: #6b7280;
    font-style: italic;
    margin-top: -0.25rem;
  }
`

export const ExistingClientInfo = styled.div`
  &.existing-client-info {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem;
    background: #d1fae5;
    border: 2px solid #10b981;
    border-radius: 8px;
    color: #065f46;

    svg {
      color: #10b981;
      flex-shrink: 0;
      margin-top: 2px;
    }

    div {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;

      strong {
        font-size: 0.875rem;
        font-weight: 600;
      }

      span {
        font-size: 0.875rem;
      }
    }
  }
`

export const SchedulingAlert = styled.div`
  &.scheduling-alert {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: #fef3c7;
    border: 2px solid #f59e0b;
    border-radius: 8px;
    color: #92400e;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;

    svg {
      color: #f59e0b;
      flex-shrink: 0;
    }

    strong {
      font-weight: 700;
    }
  }
`

export const DeliveryFeeInfo = styled.div`
  &.delivery-fee-info {
    font-size: 0.875rem;
    color: #6b7280;
    padding: 0.5rem 0.75rem;
    background: #f9fafb;
    border-radius: 6px;
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    strong {
      color: #111827;
      font-weight: 600;
    }
  }
`

export const Divider = styled.div`
  &.divider {
    height: 1px;
    background: #e5e7eb;
    margin: 0.5rem 0;
  }
`
