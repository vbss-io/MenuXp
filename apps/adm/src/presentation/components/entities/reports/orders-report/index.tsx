import type { OrdersData } from '@/domain/models/reports.model'
import { ChartBar, ChartBarHorizontal, ChartLine } from '@phosphor-icons/react'
import type { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

import * as S from './styles'

interface OrdersReportProps {
  data: OrdersData | null
  chartType: string
  onChartTypeChange: (type: string) => void
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

const formatKpiValue = (key: string, value: number): string => {
  const lowerKey = key.toLowerCase()
  if (lowerKey.includes('receita') || lowerKey.includes('ticket')) {
    return formatCurrency(value)
  }
  if (lowerKey.includes('taxa')) {
    return `${value.toFixed(1)}%`
  }
  return formatNumber(value)
}

export const OrdersReport = ({ data, chartType, onChartTypeChange }: OrdersReportProps) => {
  if (!data) {
    return (
      <S.Container>
        <S.Section>
          <S.EmptyState>
            <ChartLine size={48} weight="duotone" />
            <S.EmptyStateText>Nenhum dado disponível para o período selecionado</S.EmptyStateText>
          </S.EmptyState>
        </S.Section>
      </S.Container>
    )
  }

  const getChartType = (): 'bar' | 'area' | 'line' => {
    if (chartType === 'bar') return 'bar'
    if (chartType === 'area') return 'area'
    return 'line'
  }

  const timeSeriesOptions: ApexOptions = {
    chart: {
      type: getChartType(),
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false
        }
      },
      fontFamily: 'inherit'
    },
    colors: ['#FFD700', '#4169E1'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    xaxis: {
      categories: data.timeSeries.map((item) => item.period),
      labels: {
        style: {
          fontSize: '12px',
          fontWeight: 500
        }
      }
    },
    yaxis: [
      {
        title: {
          text: 'Receita (R$)',
          style: {
            fontSize: '12px',
            fontWeight: 600
          }
        },
        labels: {
          formatter: (value) => formatCurrency(value)
        }
      },
      {
        opposite: true,
        title: {
          text: 'Pedidos',
          style: {
            fontSize: '12px',
            fontWeight: 600
          }
        },
        labels: {
          formatter: (value) => formatNumber(value)
        }
      }
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: [
        {
          formatter: (value) => formatCurrency(value)
        },
        {
          formatter: (value) => formatNumber(value)
        }
      ]
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontSize: '14px',
      fontWeight: 600
    },
    grid: {
      borderColor: '#e0e0e0',
      strokeDashArray: 4
    }
  }

  const getSeriesType = (): 'column' | 'area' | 'line' => {
    if (chartType === 'bar') return 'column'
    if (chartType === 'area') return 'area'
    return 'line'
  }

  const timeSeriesData = [
    {
      name: 'Receita',
      type: getSeriesType(),
      data: data.timeSeries.map((item) => item.revenue)
    },
    {
      name: 'Pedidos',
      type: getSeriesType(),
      data: data.timeSeries.map((item) => item.orders)
    }
  ]

  const statusOptions: ApexOptions = {
    chart: {
      type: 'pie',
      fontFamily: 'inherit'
    },
    labels: data.statusDistribution.map((item) => item.status),
    colors: data.statusDistribution.map((item) => item.color),
    legend: {
      position: 'bottom',
      fontSize: '14px',
      fontWeight: 600
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(1)}%`
    },
    tooltip: {
      y: {
        formatter: (value) => formatNumber(value)
      }
    }
  }

  const statusData = data.statusDistribution.map((item) => item.count)

  return (
    <S.Container>
      <S.Section>
        <S.SectionTitle>Indicadores de Pedidos</S.SectionTitle>
        <S.KpisGrid>
          {Object.entries(data.kpis).map(([key, value]) => (
            <S.KpiCard key={key}>
              <S.KpiLabel>{key}</S.KpiLabel>
              <S.KpiValue>{formatKpiValue(key, value)}</S.KpiValue>
            </S.KpiCard>
          ))}
        </S.KpisGrid>
      </S.Section>
      <S.Section>
        <S.SectionHeader>
          <S.SectionTitle>Evolução no Tempo</S.SectionTitle>
          <S.ChartTypeToggle>
            <S.ToggleButton
              type="button"
              onClick={() => onChartTypeChange('line')}
              $isActive={chartType === 'line'}
              aria-label="Gráfico de linha"
              aria-pressed={chartType === 'line'}
            >
              <ChartLine size={16} weight="bold" />
            </S.ToggleButton>
            <S.ToggleButton
              type="button"
              onClick={() => onChartTypeChange('area')}
              $isActive={chartType === 'area'}
              aria-label="Gráfico de área"
              aria-pressed={chartType === 'area'}
            >
              <ChartBarHorizontal size={16} weight="bold" />
            </S.ToggleButton>
            <S.ToggleButton
              type="button"
              onClick={() => onChartTypeChange('bar')}
              $isActive={chartType === 'bar'}
              aria-label="Gráfico de barras"
              aria-pressed={chartType === 'bar'}
            >
              <ChartBar size={16} weight="bold" />
            </S.ToggleButton>
          </S.ChartTypeToggle>
        </S.SectionHeader>
        <S.ChartContainer>
          <ReactApexChart options={timeSeriesOptions} series={timeSeriesData} type={getChartType()} height={350} />
        </S.ChartContainer>
      </S.Section>
      <S.Section>
        <S.SectionHeader>
          <S.SectionTitle>Distribuição por Status</S.SectionTitle>
        </S.SectionHeader>
        <S.ChartContainer>
          <ReactApexChart options={statusOptions} series={statusData} type="pie" height={350} />
        </S.ChartContainer>
      </S.Section>
    </S.Container>
  )
}
