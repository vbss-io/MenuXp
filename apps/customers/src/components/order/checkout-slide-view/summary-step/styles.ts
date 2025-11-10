import styled from 'styled-components'

export const SummaryStep = styled.div`
  &.summary-step {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`

export const SummaryTitle = styled.h3`
  &.summary-title {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

export const SummaryRow = styled.div`
  &.summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
  }
`

export const SummaryLabel = styled.span`
  &.summary-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`

export const SummaryValue = styled.span`
  &.summary-value {
    font-size: 0.875rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.primary};
    text-align: right;
  }
`

export const SummaryTotalLabel = styled.span`
  &.summary-total-label {
    font-size: 1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

export const SummaryTotalValue = styled.span`
  &.summary-total-value {
    font-size: 1rem;
    font-weight: 700;
    color: var(--restaurant-primary-color);
  }
`

export const SummaryDivider = styled.div`
  &.summary-divider {
    height: 1px;
    background: ${({ theme }) => theme.colors.mx.gray[200]};
    margin: 0.5rem 0;
  }
`

export const FreeDeliveryText = styled.span`
  &.free-delivery {
    color: #10b981;
    font-weight: 600;
  }
`
