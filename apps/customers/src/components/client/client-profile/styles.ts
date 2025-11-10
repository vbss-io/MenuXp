import styled from 'styled-components'

export const ProfileContainer = styled.div`
  &.client-profile {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    max-width: 100%;
  }
`

export const ClientSummaryCard = styled.div`
  &.client-summary-card {
    background: ${({ theme }) => theme.colors.mx.white};
    border: 3px solid ${({ theme }) => theme.colors.mx.black};
    border-radius: 0;
    padding: 1.5rem;
    box-shadow: 4px 4px 0 ${({ theme }) => theme.colors.mx.black};
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`

export const ClientInfo = styled.div`
  &.client-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`

export const ClientAvatar = styled.div`
  &.client-avatar {
    width: 60px;
    height: 60px;
    background: var(--restaurant-primary-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({ theme }) => theme.typography.fontSizes.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  }
`

export const ClientDetails = styled.div`
  &.client-details {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
`

export const ClientName = styled.h3`
  &.client-name {
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
  }
`

export const ClientPhone = styled.p`
  &.client-phone {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0;
  }
`

export const LogoutButton = styled.button`
  &.logout-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem;
    background: var(--restaurant-primary-color);
    color: white;
    border: none;
    border-radius: 0;
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 4px 4px 0 ${({ theme }) => theme.colors.mx.black};
  }
`

export const CardsRow = styled.div`
  &.cards-row {
    display: flex;
    gap: 1rem;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
`

export const ActionCard = styled.div`
  &.action-card {
    background: ${({ theme }) => theme.colors.mx.white};
    border: 3px solid ${({ theme }) => theme.colors.mx.black};
    border-radius: 0;
    padding: 1.5rem;
    box-shadow: 4px 4px 0 ${({ theme }) => theme.colors.mx.black};
    cursor: pointer;
    transition: all 0.2s ease;
    flex: 1;
  }
`

export const CardHeader = styled.div`
  &.card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
`

export const CardIcon = styled.div`
  &.card-icon {
    width: 40px;
    height: 40px;
    background: var(--restaurant-primary-color);
    color: white;
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const CardTitle = styled.h4`
  &.card-title {
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
  }
`

export const CardDescription = styled.p`
  &.card-description {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0;
  }
`
