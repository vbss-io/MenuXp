import styled from 'styled-components'

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  min-height: 400px;
  width: 100%;
  gap: 24px;
`

export const OrderHistorySection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const HistoryTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  text-align: left;
`

export const EmptyMessage = styled.div`
  background: ${({ theme }) => theme.colors.mx.white};
  border: 3px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: 0;
  padding: 32px 24px;
  box-shadow: 4px 4px 0 ${({ theme }) => theme.colors.mx.black};
  text-align: center;

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`

export const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const OrderCard = styled.div`
  background: ${({ theme }) => theme.colors.mx.white};
  border: 3px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: 0;
  box-shadow: 4px 4px 0 ${({ theme }) => theme.colors.mx.black};
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const OrderCode = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
`

export const OrderStatusBadge = styled.span<{ color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.mx.white};
  background: ${({ color }) => color};
  padding: 6px 12px;
  border-radius: 0;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.25);

  svg {
    flex-shrink: 0;
  }
`

export const OrderDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const OrderDate = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
`

export const OrderTotal = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`

export const OrderItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 16px;
  border-top: 3px solid ${({ theme }) => theme.colors.mx.black};
`

export const OrderItem = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
`
