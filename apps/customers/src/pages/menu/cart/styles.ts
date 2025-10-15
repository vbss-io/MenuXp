import styled from 'styled-components'

export const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  min-height: 400px;
  width: 100%;
`

export const CartTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 16px 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`

export const CartDescription = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  text-align: center;
  max-width: 600px;
`

export const CartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
  width: 100%;
  max-width: 600px;
`

export const CartItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background};
`

export const CartItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const CartItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`

export const CartItemName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`

export const ComboIcon = styled.span`
  color: #feba0c;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ComboBadge = styled.span`
  background: #feba0c;
  color: ${({ theme }) => theme.colors.text.primary};
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-shrink: 0;
`

export const CartItemPrice = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
`

export const CartItemOptionals = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`

export const OptionalTag = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  background-color: ${({ theme }) => theme.colors.mx.gray[100]};
  padding: 2px 6px;
  border-radius: 4px;
`

export const CartItemControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const QuantityButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.mx.gray[100]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const QuantityDisplay = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  min-width: 16px;
  text-align: center;
`

export const EditButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid ${({ theme }) => theme.colors.mx.blue[300]};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.mx.blue[50]};
  color: ${({ theme }) => theme.colors.mx.blue[600]};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.mx.blue[100]};
    border-color: ${({ theme }) => theme.colors.mx.blue[400]};
  }
`

export const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.error};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.error};
    color: white;
  }
`

export const CartSummary = styled.div`
  margin-top: 24px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  max-width: 600px;
`

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
    padding-top: 12px;
    border-top: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
    font-weight: 600;
    font-size: 18px;
  }
`

export const ActionButton = styled.button<{ variant: 'danger' | 'primary' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  background-color: ${({ variant }) => {
    if (variant === 'danger') return '#ef4444'
    return '#3B82F6'
  }};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 16px;

  &:hover {
    opacity: 0.9;
  }
`

export const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${({ theme }) => theme.colors.text.secondary};
`

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  padding: 20px;
`

export const OptionalsLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-right: 8px;
`

export const CartItemNote = styled.div`
  margin-top: 8px;
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.mx.yellow[50]};
  border-left: 3px solid ${({ theme }) => theme.colors.mx.yellow};
  border-radius: 4px;
`

export const NoteLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-right: 8px;
`

export const NoteText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.primary};
  font-style: italic;
`

export const OrderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto 32px;
  padding: 0 20px;
`

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 16px 0;
  text-align: center;
  width: 100%;
`

export const CurrentOrderCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  border: 3px solid ${({ theme }) => theme.colors.mx.blue[500]};
  border-radius: 12px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.mx.blue[50]} 0%, white 100%);
  box-shadow: 0 10px 40px rgba(59, 130, 246, 0.15);
  width: 100%;
`

export const OrderTimeline = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4px;
  padding: 16px 0;
`

export const TimelineStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
`

export const TimelineIcon = styled.div<{ isCompleted: boolean; isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ isCompleted, isActive, theme }) => {
    if (!isCompleted) return theme.colors.mx.gray[200]
    if (isActive) return theme.colors.mx.blue[500]
    return theme.colors.mx.blue[400]
  }};
  color: ${({ isCompleted }) => {
    if (isCompleted) return 'white'
    return '#9ca3af'
  }};
  transition: all 0.3s;
  z-index: 2;
  box-shadow: ${({ isActive }) => {
    if (isActive) return '0 4px 12px rgba(59, 130, 246, 0.4)'
    return 'none'
  }};
  transform: ${({ isActive }) => {
    if (isActive) return 'scale(1.1)'
    return 'scale(1)'
  }};

  svg {
    flex-shrink: 0;
  }
`

export const TimelineContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8px;
  text-align: center;
`

export const TimelineLabel = styled.span<{ isCompleted: boolean; isActive: boolean }>`
  font-size: 11px;
  font-weight: ${({ isActive }) => {
    if (isActive) return '700'
    return '500'
  }};
  color: ${({ isCompleted, isActive, theme }) => {
    if (!isCompleted) return theme.colors.text.secondary
    if (isActive) return theme.colors.mx.blue[600]
    return theme.colors.text.primary
  }};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1.3;
`

export const TimelineLine = styled.div<{ isCompleted: boolean }>`
  position: absolute;
  top: 24px;
  left: 50%;
  right: -50%;
  height: 3px;
  background: ${({ isCompleted, theme }) => {
    if (isCompleted) return theme.colors.mx.blue[400]
    return theme.colors.mx.gray[200]
  }};
  z-index: 1;
  transition: all 0.3s;
`

export const OtherOrdersSection = styled.div`
  width: 100%;
  margin-top: 24px;
`

export const OtherOrdersTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 12px 0;
  text-align: center;
`

export const OtherOrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const CompactOrderCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.mx.blue[300]};
    background: ${({ theme }) => theme.colors.mx.gray[50]};
  }
`

export const CompactOrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const CompactOrderCode = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
`

export const CompactOrderStatus = styled.span<{ color: string }>`
  font-size: 10px;
  font-weight: 600;
  color: white;
  background: ${({ color }) => color};
  padding: 3px 8px;
  border-radius: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`

export const CompactOrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const CompactOrderDate = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
`

export const CompactOrderTotal = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`

export const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`

export const OrderCard = styled.div<{ isHistorical?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border: 2px solid ${({ theme }) => theme.colors.mx.gray[200]};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  opacity: ${({ isHistorical }) => {
    if (isHistorical) return 0.7
    return 1
  }};
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.mx.blue[300]};
    opacity: 1;
  }
`

export const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const OrderCode = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`

export const OrderStatus = styled.span<{ color: string }>`
  font-size: 12px;
  font-weight: 600;
  color: white;
  background-color: ${({ color }) => color};
  padding: 4px 12px;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const OrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const OrderDate = styled.span`
  font-size: 14px;
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
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
`

export const OrderItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};

  span:first-child {
    flex: 1;
  }

  span:last-child {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`
