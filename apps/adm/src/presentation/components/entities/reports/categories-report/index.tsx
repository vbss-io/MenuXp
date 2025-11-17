import { FolderOpen, TrendDown, TrendUp } from '@phosphor-icons/react'
import type { ApexOptions } from 'apexcharts'
import { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'

import type { CategoriesData } from '@/domain/models/reports.model'

import * as S from '../orders-report/styles'

interface CategoriesReportProps {
  data: CategoriesData | null
  chartType: string
  onChartTypeChange: (type: string) => void
}

const formatCurrency = (value: number | null | undefined): string => {
  if (value === null || value === undefined || isNaN(value)) {
    return 'R$ 0,00'
  }
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export const CategoriesReport = ({ data, chartType, onChartTypeChange }: CategoriesReportProps) => {
  if (!data || !data.contribution || data.contribution.length === 0) {
    return (
      <S.Container>
        <S.Section>
          <S.EmptyState>
            <FolderOpen size={48} weight="duotone" />
            <S.EmptyStateText>Nenhum dado disponível para o período selecionado</S.EmptyStateText>
          </S.EmptyState>
        </S.Section>
      </S.Container>
    )
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { chartOptions, chartSeries } = useMemo(() => {
    const categories = data.contribution.map((item) => item.name || 'Sem nome')
    const revenues = data.contribution.map((item) => {
      const revenue = item.revenue
      return typeof revenue === 'number' && !isNaN(revenue) ? revenue : 0
    })
    if (chartType === 'pie') {
      const pieOptions: ApexOptions = {
        chart: {
          type: 'pie',
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
        labels: categories,
        colors: ['#FFD700', '#4169E1', '#FF6B6B', '#4ECDC4', '#95E1D3', '#F38181'],
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
            formatter: (value) => formatCurrency(value)
          }
        }
      }
      return { chartOptions: pieOptions, chartSeries: revenues }
    } else {
      const barOptions: ApexOptions = {
        chart: {
          type: 'bar',
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
        colors: ['#FFD700'],
        legend: {
          position: 'bottom',
          fontSize: '14px',
          fontWeight: 600
        },
        dataLabels: {
          enabled: true,
          formatter: (val: number) => {
            if (val === null || val === undefined || isNaN(val)) return 'R$ 0,00'
            return formatCurrency(val)
          }
        },
        tooltip: {
          y: {
            formatter: (value: number) => {
              if (value === null || value === undefined || isNaN(value)) return 'R$ 0,00'
              return formatCurrency(value)
            }
          }
        },
        xaxis: {
          categories: categories,
          labels: {
            style: {
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          labels: {
            formatter: (value: number) => {
              if (value === null || value === undefined || isNaN(value)) return 'R$ 0,00'
              return formatCurrency(value)
            }
          }
        },
        plotOptions: {
          bar: {
            horizontal: true,
            distributed: true
          }
        }
      }
      return { chartOptions: barOptions, chartSeries: [{ name: 'Receita', data: revenues }] }
    }
  }, [data.contribution, chartType])

  return (
    <S.Container>
      <S.Section>
        <S.SectionHeader>
          <S.SectionTitle>Contribuição por Categoria</S.SectionTitle>
          <S.ChartTypeToggle>
            <S.ToggleButton
              type="button"
              onClick={() => onChartTypeChange('pie')}
              $isActive={chartType === 'pie'}
              aria-label="Gráfico de pizza"
              aria-pressed={chartType === 'pie'}
            >
              Pizza
            </S.ToggleButton>
            <S.ToggleButton
              type="button"
              onClick={() => onChartTypeChange('bar')}
              $isActive={chartType === 'bar'}
              aria-label="Gráfico de barras"
              aria-pressed={chartType === 'bar'}
            >
              Barras
            </S.ToggleButton>
          </S.ChartTypeToggle>
        </S.SectionHeader>
        <S.ChartContainer>
          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type={chartType === 'bar' ? 'bar' : 'pie'}
            height={350}
          />
        </S.ChartContainer>
      </S.Section>
      <S.Section>
        <S.SectionTitle>Variação Mês a Mês</S.SectionTitle>
        {data.monthOverMonth.length > 0 ? (
          <S.KpisGrid>
            {data.monthOverMonth.map((item) => (
              <S.KpiCard key={item.categoryId}>
                <S.KpiLabel>{item.name}</S.KpiLabel>
                <S.KpiValue
                  style={{
                    color: item.deltaPercentage >= 0 ? '#10b981' : '#ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {item.deltaPercentage >= 0 ? <TrendUp size={24} /> : <TrendDown size={24} />}
                  {item.deltaPercentage >= 0 ? '+' : ''}
                  {item.deltaPercentage.toFixed(1)}%
                </S.KpiValue>
              </S.KpiCard>
            ))}
          </S.KpisGrid>
        ) : (
          <S.EmptyState>
            <S.EmptyStateText>Dados insuficientes para comparação mensal</S.EmptyStateText>
          </S.EmptyState>
        )}
      </S.Section>
    </S.Container>
  )
}
