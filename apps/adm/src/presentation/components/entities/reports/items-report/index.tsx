import { Package } from '@phosphor-icons/react'

import type { ItemsData } from '@/domain/models/reports.model'

import * as S from './styles'

interface ItemsReportProps {
  data: ItemsData | null
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

export const ItemsReport = ({ data }: ItemsReportProps) => {
  if (!data) {
    return (
      <S.Container>
        <S.Section>
          <S.EmptyState>
            <Package size={48} weight="duotone" />
            <S.EmptyStateText>Nenhum dado disponível para o período selecionado</S.EmptyStateText>
          </S.EmptyState>
        </S.Section>
      </S.Container>
    )
  }

  return (
    <S.Container>
      <S.Section>
        <S.SectionTitle>Top Itens por Receita</S.SectionTitle>
        {data.topByRevenue.length > 0 ? (
          <S.Table>
            <S.TableHead>
              <S.TableRow>
                <S.TableHeader>Posição</S.TableHeader>
                <S.TableHeader>Item</S.TableHeader>
                <S.TableHeader>Tipo</S.TableHeader>
                <S.TableHeader>Receita</S.TableHeader>
                <S.TableHeader>Quantidade</S.TableHeader>
              </S.TableRow>
            </S.TableHead>
            <S.TableBody>
              {data.topByRevenue.map((item, index) => (
                <S.TableRow key={item.id}>
                  <S.TableCell>{index + 1}º</S.TableCell>
                  <S.TableCell>
                    <S.ItemName>{item.name}</S.ItemName>
                  </S.TableCell>
                  <S.TableCell>
                    <S.ItemType>{item.type === 'menu-item' ? 'Item' : 'Combo'}</S.ItemType>
                  </S.TableCell>
                  <S.TableCell>{formatCurrency(item.revenue)}</S.TableCell>
                  <S.TableCell>{formatNumber(item.quantity)}</S.TableCell>
                </S.TableRow>
              ))}
            </S.TableBody>
          </S.Table>
        ) : (
          <S.EmptyState>
            <S.EmptyStateText>Nenhum item encontrado</S.EmptyStateText>
          </S.EmptyState>
        )}
      </S.Section>
      <S.Section>
        <S.SectionTitle>Itens com Menor Desempenho</S.SectionTitle>
        {data.bottomByRevenue.length > 0 ? (
          <S.Table>
            <S.TableHead>
              <S.TableRow>
                <S.TableHeader>Item</S.TableHeader>
                <S.TableHeader>Tipo</S.TableHeader>
                <S.TableHeader>Receita</S.TableHeader>
                <S.TableHeader>Quantidade</S.TableHeader>
              </S.TableRow>
            </S.TableHead>
            <S.TableBody>
              {data.bottomByRevenue.map((item) => (
                <S.TableRow key={item.id}>
                  <S.TableCell>
                    <S.ItemName>{item.name}</S.ItemName>
                  </S.TableCell>
                  <S.TableCell>
                    <S.ItemType>{item.type === 'menu-item' ? 'Item' : 'Combo'}</S.ItemType>
                  </S.TableCell>
                  <S.TableCell>{formatCurrency(item.revenue)}</S.TableCell>
                  <S.TableCell>{formatNumber(item.quantity)}</S.TableCell>
                </S.TableRow>
              ))}
            </S.TableBody>
          </S.Table>
        ) : (
          <S.EmptyState>
            <S.EmptyStateText>Nenhum item encontrado</S.EmptyStateText>
          </S.EmptyState>
        )}
      </S.Section>
    </S.Container>
  )
}
