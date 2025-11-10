import styled from 'styled-components'

export const Container = styled.div`
  &.active-orders {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 600px;
    margin: 0 auto 32px;
    padding: 0 20px;
  }
`

export const SectionTitle = styled.h2`
  &.section-title {
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0 0 16px 0;
    text-align: center;
    width: 100%;
  }
`

export const CurrentOrderCard = styled.div`
  &.current-order-card {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 24px;
    border: 3px solid ${({ theme }) => theme.colors.mx.blue[500]};
    border-radius: 12px;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.mx.blue[50]} 0%, white 100%);
    box-shadow: 0 10px 40px rgba(59, 130, 246, 0.15);
    width: 100%;
  }
`

export const OrderHeader = styled.div`
  &.order-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
`

export const OrderCode = styled.h3`
  &.order-code {
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
  }
`

export const OrderStatus = styled.span<{ color: string }>`
  &.order-status {
    font-size: 12px;
    font-weight: 600;
    color: white;
    background: ${({ color }) => color};
    padding: 4px 12px;
    border-radius: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`

export const OrderTimeline = styled.div`
  &.order-timeline {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    padding: 16px 0;
  }
`

export const TimelineStep = styled.div`
  &.timeline-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    position: relative;
  }
`

export const TimelineIcon = styled.div<{ isCompleted: boolean; isActive: boolean }>`
  &.timeline-icon {
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
    color: ${({ isCompleted }) => (isCompleted ? 'white' : '#9ca3af')};
    transition: all 0.3s;
    z-index: 2;
    box-shadow: ${({ isActive }) => (isActive ? '0 4px 12px rgba(59, 130, 246, 0.4)' : 'none')};
    transform: ${({ isActive }) => (isActive ? 'scale(1.1)' : 'scale(1)')};

    svg {
      flex-shrink: 0;
    }
  }
`

export const TimelineContent = styled.div`
  &.timeline-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 8px;
    text-align: center;
  }
`

export const TimelineLabel = styled.span<{ isCompleted: boolean; isActive: boolean }>`
  &.timeline-label {
    font-size: 11px;
    font-weight: ${({ isActive }) => (isActive ? '700' : '500')};
    color: ${({ isCompleted, isActive, theme }) => {
      if (!isCompleted) return theme.colors.text.secondary
      if (isActive) return theme.colors.mx.blue[600]
      return theme.colors.text.primary
    }};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    line-height: 1.3;
  }
`

export const TimelineLine = styled.div<{ isCompleted: boolean }>`
  &.timeline-line {
    position: absolute;
    top: 24px;
    left: 50%;
    right: -50%;
    height: 3px;
    background: ${({ isCompleted, theme }) => (isCompleted ? theme.colors.mx.blue[400] : theme.colors.mx.gray[200])};
    z-index: 1;
    transition: all 0.3s;
  }
`

export const OrderInfo = styled.div`
  &.order-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

export const OrderDate = styled.span`
  &.order-date {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`

export const OrderTotal = styled.span`
  &.order-total {
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

export const OtherOrdersSection = styled.div`
  &.other-orders-section {
    width: 100%;
    margin-top: 24px;
  }
`

export const OtherOrdersTitle = styled.h3`
  &.other-orders-title {
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0 0 12px 0;
    text-align: center;
  }
`

export const OtherOrdersList = styled.div`
  &.other-orders-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`

export const CompactOrderCard = styled.div`
  &.compact-order-card {
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
  }
`

export const CompactOrderHeader = styled.div`
  &.compact-order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

export const CompactOrderCode = styled.span`
  &.compact-order-code {
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

export const CompactOrderStatus = styled.span<{ color: string }>`
  &.compact-order-status {
    font-size: 10px;
    font-weight: 600;
    color: white;
    background: ${({ color }) => color};
    padding: 3px 8px;
    border-radius: 8px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
`

export const CompactOrderInfo = styled.div`
  &.compact-order-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

export const CompactOrderDate = styled.span`
  &.compact-order-date {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`

export const CompactOrderTotal = styled.span`
  &.compact-order-total {
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`
