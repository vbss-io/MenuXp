import { ChartBar, CurrencyDollar, Receipt, Ticket } from '@phosphor-icons/react'

import type { SummaryData } from '@/domain/models/reports.model'

import * as S from './styles'

interface SummaryKpisProps {
  summary: SummaryData | null
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('pt-BR').format(value)
}

export const SummaryKpis = ({ summary }: SummaryKpisProps) => {
  if (!summary) {
    return null
  }

  return (
    <S.Container>
      <S.KpiCard>
        <S.KpiLabel>Receita Total</S.KpiLabel>
        <S.KpiValue>{formatCurrency(summary.totalRevenue)}</S.KpiValue>
        <S.KpiIcon>
          <CurrencyDollar size={24} weight="bold" />
        </S.KpiIcon>
      </S.KpiCard>
      <S.KpiCard>
        <S.KpiLabel>Total de Pedidos</S.KpiLabel>
        <S.KpiValue>{formatNumber(summary.totalOrders)}</S.KpiValue>
        <S.KpiIcon>
          <Receipt size={24} weight="bold" />
        </S.KpiIcon>
      </S.KpiCard>
      <S.KpiCard>
        <S.KpiLabel>Ticket Médio</S.KpiLabel>
        <S.KpiValue>{formatCurrency(summary.averageTicket)}</S.KpiValue>
        <S.KpiIcon>
          <ChartBar size={24} weight="bold" />
        </S.KpiIcon>
      </S.KpiCard>
      <S.KpiCard>
        <S.KpiLabel>Cupons Ativos</S.KpiLabel>
        <S.KpiValue>{formatNumber(summary.activeCoupons)}</S.KpiValue>
        <S.KpiIcon>
          <Ticket size={24} weight="bold" />
        </S.KpiIcon>
      </S.KpiCard>
    </S.Container>
  )
}
