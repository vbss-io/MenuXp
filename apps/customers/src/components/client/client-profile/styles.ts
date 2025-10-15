import styled from 'styled-components'

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 100%;
`

export const ClientSummaryCard = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.brutalistCard};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const ClientInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const ClientAvatar = styled.div<{ primaryColor: string }>`
  width: 60px;
  height: 60px;
  background: ${({ primaryColor }) => primaryColor};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`

export const ClientDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const ClientName = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`

export const ClientPhone = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`

export const LogoutButton = styled.button<{ primaryColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: ${({ primaryColor }) => primaryColor};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${({ theme }) => theme.shadows.brutalist};

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`

export const CardsRow = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const ActionCard = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.brutalistCard};
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`

export const CardIcon = styled.div<{ primaryColor: string }>`
  width: 40px;
  height: 40px;
  background: ${({ primaryColor }) => primaryColor};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const CardTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`

export const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`

export const OrdersSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const OrdersTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`

export const EmptyOrdersCard = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.brutalistCard};
  text-align: center;
`

export const EmptyOrdersText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`
