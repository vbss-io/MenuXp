import { ClockCounterClockwise } from '@phosphor-icons/react'
import type { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

import type { OperationsData } from '@/domain/models/reports.model'

import * as RS from '../orders-report/styles'

interface OperationsReportProps {
  data: OperationsData | null
}

const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('pt-BR').format(value)
}

export const OperationsReport = ({ data }: OperationsReportProps) => {
  if (!data) {
    return (
      <RS.Container>
        <RS.Section>
          <RS.EmptyState>
            <ClockCounterClockwise size={48} weight="duotone" />
            <RS.EmptyStateText>Nenhum dado disponível para o período selecionado</RS.EmptyStateText>
          </RS.EmptyState>
        </RS.Section>
      </RS.Container>
    )
  }

  const timelineOptions: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: true },
      fontFamily: 'inherit'
    },
    colors: ['#4169E1'],
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: false
      }
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(1)} min`
    },
    xaxis: {
      categories: data.timeline.map((item) => item.status),
      title: {
        text: 'Tempo Médio (minutos)'
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
          fontWeight: 600
        }
      }
    },
    tooltip: {
      y: {
        formatter: (value) => `${value.toFixed(1)} minutos`
      }
    }
  }

  const timelineData = [
    {
      name: 'Tempo Médio',
      data: data.timeline.map((item) => item.averageMinutes)
    }
  ]

  return (
    <RS.Container>
      <RS.Section>
        <RS.SectionTitle>Métricas Operacionais</RS.SectionTitle>
        <RS.KpisGrid>
          <RS.KpiCard>
            <RS.KpiLabel>Tempo Médio de Preparo</RS.KpiLabel>
            <RS.KpiValue>{data.preparationTimeAvg.toFixed(1)} min</RS.KpiValue>
          </RS.KpiCard>
          <RS.KpiCard>
            <RS.KpiLabel>Tempo Médio de Entrega</RS.KpiLabel>
            <RS.KpiValue>{data.fulfillmentTimeAvg.toFixed(1)} min</RS.KpiValue>
          </RS.KpiCard>
          <RS.KpiCard>
            <RS.KpiLabel>Cancelamentos</RS.KpiLabel>
            <RS.KpiValue>{formatNumber(data.cancellationCount)}</RS.KpiValue>
          </RS.KpiCard>
        </RS.KpisGrid>
      </RS.Section>
      <RS.Section>
        <RS.SectionTitle>Timeline de Processos</RS.SectionTitle>
        <RS.ChartContainer>
          <ReactApexChart options={timelineOptions} series={timelineData} type="bar" height={350} />
        </RS.ChartContainer>
      </RS.Section>
    </RS.Container>
  )
}
