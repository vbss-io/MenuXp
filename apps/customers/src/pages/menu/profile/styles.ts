import styled from 'styled-components'

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  min-height: 400px;
  width: 100%;
  gap: 32px;
`

export const OrderHistorySection = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 32px;
`

export const HistoryTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 20px 0;
  text-align: center;
`

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${({ theme }) => theme.colors.text.secondary};

  p {
    margin: 0;
    font-size: 14px;
  }
`

export const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const OrderCard = styled.div`
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.mx.gray[300]};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
`

export const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`

export const OrderCode = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
`

export const OrderStatusBadge = styled.span<{ color: string }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background: ${({ color }) => color};
  padding: 4px 10px;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.3px;

  svg {
    flex-shrink: 0;
  }
`

export const OrderDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
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
  gap: 4px;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
`

export const OrderItem = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
`
