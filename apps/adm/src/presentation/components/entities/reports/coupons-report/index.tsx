import { Ticket } from '@phosphor-icons/react'

import type { CouponsData } from '@/domain/models/reports.model'

import * as S from '../items-report/styles'

interface CouponsReportProps {
  data: CouponsData | null
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

const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`
}

export const CouponsReport = ({ data }: CouponsReportProps) => {
  if (!data) {
    return (
      <S.Container>
        <S.Section>
          <S.EmptyState>
            <Ticket size={48} weight="duotone" />
            <S.EmptyStateText>Nenhum dado disponível para o período selecionado</S.EmptyStateText>
          </S.EmptyState>
        </S.Section>
      </S.Container>
    )
  }

  return (
    <S.Container>
      <S.Section>
        <S.SectionTitle>Uso de Cupons</S.SectionTitle>
        {data.usage.length > 0 ? (
          <S.Table>
            <S.TableHead>
              <S.TableRow>
                <S.TableHeader>Código</S.TableHeader>
                <S.TableHeader>Nome</S.TableHeader>
                <S.TableHeader>Resgates</S.TableHeader>
                <S.TableHeader>Taxa de Resgate</S.TableHeader>
                <S.TableHeader>Impacto na Receita</S.TableHeader>
                <S.TableHeader>Responsabilidade Pendente</S.TableHeader>
              </S.TableRow>
            </S.TableHead>
            <S.TableBody>
              {data.usage.map((coupon) => (
                <S.TableRow key={coupon.code}>
                  <S.TableCell>
                    <S.ItemName>{coupon.code}</S.ItemName>
                  </S.TableCell>
                  <S.TableCell>{coupon.name}</S.TableCell>
                  <S.TableCell>{formatNumber(coupon.redemptions)}</S.TableCell>
                  <S.TableCell>{formatPercentage(coupon.redemptionRate)}</S.TableCell>
                  <S.TableCell>{formatCurrency(coupon.revenueImpact)}</S.TableCell>
                  <S.TableCell>{formatCurrency(coupon.outstandingLiability)}</S.TableCell>
                </S.TableRow>
              ))}
            </S.TableBody>
          </S.Table>
        ) : (
          <S.EmptyState>
            <S.EmptyStateText>Nenhum cupom utilizado no período</S.EmptyStateText>
          </S.EmptyState>
        )}
      </S.Section>
    </S.Container>
  )
}
