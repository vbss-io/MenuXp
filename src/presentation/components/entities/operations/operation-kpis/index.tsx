import type { OperationKPI } from '@/domain/models/operation.model'
import {
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  MotorcycleIcon,
  ShoppingCartIcon,
  XCircleIcon
} from '@phosphor-icons/react'
import styled from 'styled-components'

interface OperationKPIsProps {
  kpis: OperationKPI
  isLoading?: boolean
}

const kpiConfig = [
  {
    key: 'dailyOrders' as keyof OperationKPI,
    label: 'Pedidos do Dia',
    icon: ShoppingCartIcon,
    color: '#3b82f6',
    bgColor: '#dbeafe',
    format: (value: number) => value.toString(),
    unit: ''
  },
  {
    key: 'averagePreparationTime' as keyof OperationKPI,
    label: 'Tempo Médio de Preparo',
    icon: ClockIcon,
    color: '#f59e0b',
    bgColor: '#fef3c7',
    format: (value: number) => value.toString(),
    unit: 'min'
  },
  {
    key: 'cancellations' as keyof OperationKPI,
    label: 'Cancelamentos',
    icon: XCircleIcon,
    color: '#ef4444',
    bgColor: '#fee2e2',
    format: (value: number) => value.toString(),
    unit: ''
  },
  {
    key: 'dailyRevenue' as keyof OperationKPI,
    label: 'Faturamento Diário',
    icon: CurrencyDollarIcon,
    color: '#22c55e',
    bgColor: '#dcfce7',
    format: (value: number) =>
      value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }),
    unit: ''
  },
  {
    key: 'sentForDelivery' as keyof OperationKPI,
    label: 'Saiu para Entrega',
    icon: MotorcycleIcon,
    color: '#8b5cf6',
    bgColor: '#ede9fe',
    format: (value: number) => value.toString(),
    unit: ''
  },
  {
    key: 'delivered' as keyof OperationKPI,
    label: 'Entregue',
    icon: CheckCircleIcon,
    color: '#10b981',
    bgColor: '#d1fae5',
    format: (value: number) => value.toString(),
    unit: ''
  }
]

export const OperationKPIs = ({ kpis, isLoading = false }: OperationKPIsProps) => {
  if (isLoading) {
    return (
      <Container>
        {Array.from({ length: 6 }).map((_, index) => (
          <KPICard key={index}>
            <KPISkeleton />
          </KPICard>
        ))}
      </Container>
    )
  }

  return (
    <Container>
      {kpiConfig.map((config) => {
        const Icon = config.icon
        const value = kpis[config.key]
        return (
          <KPICard key={config.key}>
            <KPIIcon color={config.color} bgColor={config.bgColor}>
              <Icon weight="fill" />
            </KPIIcon>
            <KPIInfo>
              <KPILabel>{config.label}</KPILabel>
              <KPIValue>
                {config.format(value)}
                {config.unit && <KPIUnit>{config.unit}</KPIUnit>}
              </KPIValue>
            </KPIInfo>
          </KPICard>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
`

const KPICard = styled.div`
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.brutalistCard};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  transition: all ${({ theme }) => `${theme.animations.durations.normal} ${theme.animations.easings.easeInOut}`};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.brutalistHover};
  }
`

const KPIIcon = styled.div<{ color: string; bgColor: string }>`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  flex-shrink: 0;
`

const KPIInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
`

const KPILabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`

const KPIValue = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.mx.black};
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.xs};
`

const KPIUnit = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.muted};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
`

const KPISkeleton = styled.div`
  width: 100%;
  height: 48px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: ${({ theme }) => theme.borderRadius.md};

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`
