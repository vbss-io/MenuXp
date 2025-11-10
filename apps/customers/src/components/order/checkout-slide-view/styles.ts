import styled from 'styled-components'

const getStepBackgroundColor = (active: boolean, completed: boolean) => {
  if (completed) return '#10B981'
  if (active) return '#3B82F6'
  return '#9CA3AF'
}

const getStepTextColor = (active: boolean, completed: boolean) => {
  if (completed) return '#059669'
  if (active) return '#2563EB'
  return '#6B7280'
}

export const StepsContainer = styled.div`
  &.steps-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    padding: 0 1rem;
  }
`

export const Step = styled.div<{ $active: boolean; $completed: boolean }>`
  &.step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 1rem;
      left: 50%;
      width: 100%;
      height: 2px;
      background: ${({ $active, $completed }) => {
        if ($completed) return '#10B981'
        if ($active) return '#3B82F6'
        return '#D1D5DB'
      }};
      z-index: 0;
    }

    &:last-child::after {
      display: none;
    }
  }
`

export const StepIcon = styled.div<{ $active: boolean; $completed: boolean }>`
  &.step-icon {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ $active, $completed }) => getStepBackgroundColor($active, $completed)};
    color: white;
    font-size: 0.875rem;
    font-weight: 600;
    position: relative;
    z-index: 1;
  }
`

export const StepLabel = styled.span<{ $active: boolean; $completed: boolean }>`
  &.step-label {
    font-size: 0.75rem;
    font-weight: 500;
    color: ${({ $active, $completed }) => getStepTextColor($active, $completed)};
    text-align: center;
  }
`

export const StepContent = styled.div`
  min-height: 400px;
`

export const ItemsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const ItemCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #f9fafb;
`

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const ItemName = styled.span`
  font-weight: 600;
  color: #111827;
`

export const ItemDetails = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
`

export const ItemPrice = styled.span`
  font-weight: 600;
  color: #111827;
`

export const ItemOptionals = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.5rem;
  padding-left: 1rem;
  border-left: 2px solid #e5e7eb;
`

export const OptionalItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #6b7280;
`

export const TotalsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid #e5e7eb;
`

export const TotalRow = styled.div<{ highlight?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ highlight }) => (highlight ? '1.125rem' : '0.875rem')};
  font-weight: ${({ highlight }) => (highlight ? '700' : '500')};
  color: ${({ highlight }) => (highlight ? '#111827' : '#6b7280')};
`

export const SaveAddressOption = styled.div`
  padding: 1rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-top: 1rem;

  label {
    font-size: 0.875rem;
    color: #374151;

    input[type='checkbox'] {
      margin-right: 0.5rem;
      accent-color: var(--primary, #3b82f6);
    }
  }
`

export const AddressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const AddressCard = styled.div<{ selected: boolean }>`
  padding: 1rem;
  border: 2px solid ${({ selected }) => (selected ? '#3B82F6' : '#E5E7EB')};
  border-radius: 6px;
  background: ${({ selected }) => (selected ? '#EFF6FF' : 'white')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #60a5fa;
  }
`

export const AddressTitle = styled.div`
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
`

export const AddressText = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.4;
`

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const SchedulingAlert = styled.div`
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
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const DeliveryFeeInfo = styled.div`
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
`

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
`

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  background: white;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #111827;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transform: translate(-2px, -2px);
  }
`

export const SummarySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
    font-weight: 600;
    font-size: 1.125rem;
  }
`

export const Divider = styled.div`
  height: 1px;
  background: #e5e7eb;
  margin: 0.5rem 0;
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`

export const GuestInfoAlert = styled.div`
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
`

export const FieldHint = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
  font-style: italic;
  margin-top: -0.25rem;
`

export const ExistingClientInfo = styled.div`
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
`
