import styled from 'styled-components'

export const AddressStep = styled.div`
  &.address-step {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`

export const SectionTitle = styled.h3`
  &.section-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.mx.black};
    margin: 0 0 1rem 0;
  }
`

export const AddressCardsContainer = styled.div`
  &.address-cards-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`

export const AddressCard = styled.div`
  &.address-card {
    padding: 1rem;
    border: 3px solid ${({ theme }) => theme.colors.mx.black};
    border-radius: 0;
    box-shadow: 4px 4px 0 ${({ theme }) => theme.colors.mx.black};
    background: ${({ theme }) => theme.colors.mx.white};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      transform: translate(-2px, -2px);
      box-shadow: 6px 6px 0 ${({ theme }) => theme.colors.mx.black};
    }

    &.selected {
      background: var(--restaurant-primary-color);
      border-color: ${({ theme }) => theme.colors.mx.black};
    }

    &.not-selected {
      background: ${({ theme }) => theme.colors.mx.white};
    }
  }
`

export const AddressCardTitle = styled.div`
  &.address-card-title {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.mx.black};
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }

  .address-card.selected & {
    color: ${({ theme }) => theme.colors.mx.white};
  }
`

export const AddressCardText = styled.div`
  &.address-card-text {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.text.secondary};
    line-height: 1.5;
  }

  .address-card.selected & {
    color: ${({ theme }) => theme.colors.mx.white};
  }
`

export const FormContainer = styled.div`
  &.form-container {
    margin-top: 1rem;
  }
`
