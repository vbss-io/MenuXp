import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const BellButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.mx.gray[100]};
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.colors.mx.gray[700]};
  }
`

export const Badge = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  background: var(--restaurant-primary-color, ${({ theme }) => theme.colors.primary});
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  padding: 0 5px;
  animation: ${pulse} 2s ease-in-out infinite;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`

export const NotificationList = styled.div`
  width: 360px;
  max-height: 500px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const NotificationItem = styled.div<{ $isRead: boolean }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ $isRead, theme }) => ($isRead ? 'transparent' : theme.colors.mx.gray[50])};
  border: 1px solid ${({ $isRead, theme }) => ($isRead ? theme.colors.mx.gray[200] : theme.colors.mx.gray[300])};

  &:hover {
    background: ${({ theme }) => theme.colors.mx.gray[100]};
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`

export const NotificationIcon = styled.div<{ $type: string }>`
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $type, theme }) => {
    switch ($type) {
      case 'order':
        return `${theme.colors.primary}20`
      case 'system':
        return `${theme.colors.mx.blue[500]}20`
      case 'promotion':
        return `${theme.colors.mx.success[500]}20`
      case 'message':
        return `${theme.colors.mx.info[500]}20`
      default:
        return theme.colors.mx.gray[100]
    }
  }};

  svg {
    width: 20px;
    height: 20px;
    color: ${({ $type, theme }) => {
      switch ($type) {
        case 'order':
          return theme.colors.primary
        case 'system':
          return theme.colors.mx.blue[500]
        case 'promotion':
          return theme.colors.mx.success[500]
        case 'message':
          return theme.colors.mx.info[500]
        default:
          return theme.colors.mx.gray[600]
      }
    }};
  }
`

export const NotificationContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const NotificationTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.mx.gray[900]};
  margin: 0;
`

export const NotificationMessage = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.mx.gray[600]};
  margin: 0;
  line-height: 1.4;
`

export const NotificationTime = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.mx.gray[500]};
`

export const UnreadIndicator = styled.div`
  width: 8px;
  height: 8px;
  min-width: 8px;
  border-radius: 50%;
  background: var(--restaurant-primary-color, ${({ theme }) => theme.colors.primary});
  margin-top: 4px;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
`

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: 700;
  color: var(--restaurant-primary-color, ${({ theme }) => theme.colors.primary});
  margin: 0;
`

export const MarkAllButton = styled.button`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: var(--restaurant-primary-color, ${({ theme }) => theme.colors.primary});
  background: transparent;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.mx.gray[100]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  gap: ${({ theme }) => theme.spacing.md};

  svg {
    width: 64px;
    height: 64px;
    color: ${({ theme }) => theme.colors.mx.gray[300]};
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    color: ${({ theme }) => theme.colors.mx.gray[500]};
    margin: 0;
  }
`

export const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};

  svg {
    width: 32px;
    height: 32px;
    color: var(--restaurant-primary-color, ${({ theme }) => theme.colors.primary});
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`
