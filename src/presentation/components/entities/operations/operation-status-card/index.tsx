import { OperationStatus } from '@/domain/enums/operation/operation-status.enum'
import type { Operation } from '@/domain/models/operation.model'
import { ClockIcon, PauseIcon, PlayIcon, StopIcon } from '@phosphor-icons/react'
import styled from 'styled-components'

interface OperationStatusCardProps {
  operation: Operation | null
}

const getStatusInfo = (status: OperationStatus | null) => {
  switch (status) {
    case OperationStatus.RUNNING:
      return {
        icon: <PlayIcon weight="fill" />,
        label: 'Em Andamento',
        color: '#22c55e',
        bgColor: '#dcfce7'
      }
    case OperationStatus.PAUSED:
      return {
        icon: <PauseIcon weight="fill" />,
        label: 'Pausada',
        color: '#f59e0b',
        bgColor: '#fef3c7'
      }
    case OperationStatus.FINISHED:
      return {
        icon: <StopIcon weight="fill" />,
        label: 'Finalizada',
        color: '#ef4444',
        bgColor: '#fee2e2'
      }
    default:
      return {
        icon: <ClockIcon />,
        label: 'Parada',
        color: '#6b7280',
        bgColor: '#f3f4f6'
      }
  }
}

export const OperationStatusCard = ({ operation }: OperationStatusCardProps) => {
  const statusInfo = getStatusInfo(operation?.status || null)
  const startTime = operation?.createdAt ? new Date(operation.createdAt) : null

  return (
    <Container>
      <StatusSection>
        <StatusIcon color={statusInfo.color} bgColor={statusInfo.bgColor}>
          {statusInfo.icon}
        </StatusIcon>
        <StatusInfo>
          <StatusLabel>{statusInfo.label}</StatusLabel>
          {startTime && (
            <StartTime>
              Iniciada em{' '}
              {startTime.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </StartTime>
          )}
        </StatusInfo>
      </StatusSection>
      {operation && <OperationId>ID: {operation.id}</OperationId>}
    </Container>
  )
}

const Container = styled.div`
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.brutalistCard};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  @media not ${({ theme }) => theme.breakpoints.lg} {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
  }
`

const StatusSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

const StatusIcon = styled.div<{ color: string; bgColor: string }>`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
`

const StatusInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const StatusLabel = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.mx.black};
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const StartTime = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const OperationId = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.muted};
  background: ${({ theme }) => theme.colors.mx.gray[100]};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
`
