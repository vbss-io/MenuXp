import { Users } from '@phosphor-icons/react'
import type { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

import type { CustomersData } from '@/domain/models/reports.model'

import * as S from '../items-report/styles'
import * as RS from '../orders-report/styles'

interface CustomersReportProps {
  data: CustomersData | null
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

const getBandLabel = (band: string): string => {
  if (band === 'low') return 'Baixo'
  if (band === 'medium') return 'Médio'
  return 'Alto'
}

export const CustomersReport = ({ data }: CustomersReportProps) => {
  if (!data) {
    return (
      <S.Container>
        <S.Section>
          <S.EmptyState>
            <Users size={48} weight="duotone" />
            <S.EmptyStateText>Nenhum dado disponível para o período selecionado</S.EmptyStateText>
          </S.EmptyState>
        </S.Section>
      </S.Container>
    )
  }

  const segmentsOptions: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: true },
      fontFamily: 'inherit'
    },
    colors: ['#FFD700', '#4169E1'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%'
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: data.segments.map((s) => (s.segment === 'new' ? 'Novos' : 'Recorrentes'))
    },
    yaxis: [
      {
        title: {
          text: 'Clientes'
        },
        labels: {
          formatter: (value) => formatNumber(value)
        }
      },
      {
        opposite: true,
        title: {
          text: 'Receita (R$)'
        },
        labels: {
          formatter: (value) => formatCurrency(value)
        }
      }
    ],
    legend: {
      position: 'top'
    }
  }

  const segmentsData = [
    {
      name: 'Clientes',
      data: data.segments.map((s) => s.customers)
    },
    {
      name: 'Receita',
      data: data.segments.map((s) => s.revenue)
    }
  ]

  return (
    <S.Container>
      <S.Section>
        <S.SectionTitle>Segmentação de Clientes</S.SectionTitle>
        <RS.ChartContainer>
          <ReactApexChart options={segmentsOptions} series={segmentsData} type="bar" height={300} />
        </RS.ChartContainer>
      </S.Section>
      <S.Section>
        <S.SectionTitle>Lifetime Value por Faixa</S.SectionTitle>
        <RS.KpisGrid>
          {data.lifetimeValueBands.map((band) => (
            <RS.KpiCard key={band.band}>
              <RS.KpiLabel>{getBandLabel(band.band)}</RS.KpiLabel>
              <RS.KpiValue>{formatNumber(band.customers)} clientes</RS.KpiValue>
              <S.ItemName style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
                LTV Médio: {formatCurrency(band.averageLifetimeValue)}
              </S.ItemName>
            </RS.KpiCard>
          ))}
        </RS.KpisGrid>
      </S.Section>
      <S.Section>
        <S.SectionTitle>Top Clientes</S.SectionTitle>
        {data.topCustomers.length > 0 ? (
          <S.Table>
            <S.TableHead>
              <S.TableRow>
                <S.TableHeader>Posição</S.TableHeader>
                <S.TableHeader>Cliente</S.TableHeader>
                <S.TableHeader>Telefone</S.TableHeader>
                <S.TableHeader>Receita Total</S.TableHeader>
                <S.TableHeader>Pedidos</S.TableHeader>
              </S.TableRow>
            </S.TableHead>
            <S.TableBody>
              {data.topCustomers.map((customer, index) => (
                <S.TableRow key={customer.clientId}>
                  <S.TableCell>{index + 1}º</S.TableCell>
                  <S.TableCell>
                    <S.ItemName>{customer.name}</S.ItemName>
                  </S.TableCell>
                  <S.TableCell>{customer.phone}</S.TableCell>
                  <S.TableCell>{formatCurrency(customer.revenue)}</S.TableCell>
                  <S.TableCell>{formatNumber(customer.orders)}</S.TableCell>
                </S.TableRow>
              ))}
            </S.TableBody>
          </S.Table>
        ) : (
          <S.EmptyState>
            <S.EmptyStateText>Nenhum cliente encontrado</S.EmptyStateText>
          </S.EmptyState>
        )}
      </S.Section>
    </S.Container>
  )
}
