import type { ApexOptions } from 'apexcharts'
import { useEffect, useRef } from 'react'
import ReactApexChart from 'react-apexcharts'
import styled from 'styled-components'

interface OrderStatusData {
  status: string
  count: number
  color: string
}

interface OperationChartsProps {
  ordersByStatus: OrderStatusData[]
  isLoading?: boolean
}

export const OperationCharts = ({ ordersByStatus, isLoading = false }: OperationChartsProps) => {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (chartRef.current) {
        const event = new Event('resize')
        window.dispatchEvent(event)
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <Container>
        <ChartSkeleton />
      </Container>
    )
  }

  const barChartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 300,
      fontFamily: "'Montserrat', sans-serif",
      toolbar: {
        show: false
      },
      background: 'transparent',
      redrawOnWindowResize: true,
      redrawOnParentResize: true
    },
    colors: ordersByStatus.map((d) => d.color),
    grid: {
      borderColor: '#e5e7eb',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    xaxis: {
      categories: ordersByStatus.map((d) => d.status),
      labels: {
        style: {
          colors: '#6b7280',
          fontSize: '12px',
          fontFamily: "'Montserrat', sans-serif"
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      title: {
        text: 'Quantidade',
        style: {
          color: '#6b7280',
          fontSize: '12px',
          fontFamily: "'Montserrat', sans-serif"
        }
      },
      labels: {
        style: {
          colors: '#6b7280',
          fontSize: '12px',
          fontFamily: "'Montserrat', sans-serif"
        }
      }
    },
    tooltip: {
      theme: 'light',
      style: {
        fontSize: '12px',
        fontFamily: "'Montserrat', sans-serif"
      },
      y: {
        formatter: (value) => value.toString()
      }
    },
    legend: {
      show: false
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '90%'
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#ffffff'],
        fontSize: '12px',
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 'bold'
      }
    }
  }

  const barChartSeries = [
    {
      name: 'Quantidade',
      data: ordersByStatus.map((d) => d.count)
    }
  ]

  return (
    <Container>
      <ChartSection>
        <ChartTitle>Status dos Pedidos</ChartTitle>
        <ChartDescription>Distribuição dos pedidos por status atual</ChartDescription>
        <ChartContainer>
          <ChartWrapper ref={chartRef}>
            <ReactApexChart options={barChartOptions} series={barChartSeries} type="bar" height={300} width="100%" />
          </ChartWrapper>
        </ChartContainer>
      </ChartSection>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.lg};
  width: 100%;
`

const ChartSection = styled.div`
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.brutalistCard};
  width: 100%;
`

const ChartTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.mx.black};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const ChartDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
`

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${({ theme }) => theme.spacing.md} 0;
  width: 100%;
  overflow: hidden;
`

const ChartWrapper = styled.div`
  width: 100%;
`

const ChartSkeleton = styled.div`
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.brutalistCard};
  height: 400px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`
