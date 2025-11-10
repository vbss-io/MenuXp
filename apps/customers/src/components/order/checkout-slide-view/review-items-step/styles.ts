import styled from 'styled-components'

export const ReviewItemsStep = styled.div`
  &.review-items-step {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`

export const StepTitle = styled.h3`
  &.step-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.mx.black};
    margin: 0 0 1rem 0;
  }
`

export const EmptyState = styled.div`
  &.empty-state {
    text-align: center;
    padding: 2rem;
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 0.875rem;
  }
`

export const ItemsList = styled.div`
  &.items-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
`

export const ItemCard = styled.div`
  &.item-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: ${({ theme }) => theme.colors.mx.white};
    border: 3px solid ${({ theme }) => theme.colors.mx.black};
    border-radius: 0;
    box-shadow: 4px 4px 0 ${({ theme }) => theme.colors.mx.black};
  }
`

export const ItemContent = styled.div`
  &.item-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`

export const ItemInfo = styled.div`
  &.item-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
`

export const ItemName = styled.span`
  &.item-name {
    font-weight: 600;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.mx.black};
  }
`

export const ItemDetails = styled.span`
  &.item-details {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`

export const ItemOptionals = styled.div`
  &.item-optionals {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-top: 0.5rem;
    padding-left: 1rem;
    border-left: 2px solid ${({ theme }) => theme.colors.mx.black};
  }
`

export const OptionalItem = styled.div`
  &.optional-item {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`

export const ItemPrice = styled.span`
  &.item-price {
    font-weight: 600;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.mx.black};
    margin-left: 1rem;
  }
`

export const TotalsSection = styled.div`
  &.totals-section {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 3px solid ${({ theme }) => theme.colors.mx.black};
  }
`

export const TotalRow = styled.div<{ $highlight?: boolean }>`
  &.total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: ${({ $highlight }) => ($highlight ? '1.125rem' : '0.875rem')};
    font-weight: ${({ $highlight }) => ($highlight ? '700' : '500')};
    color: ${({ theme, $highlight }) => ($highlight ? theme.colors.mx.black : theme.colors.text.secondary)};
  }
`
