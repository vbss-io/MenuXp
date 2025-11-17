import * as XLSX from 'xlsx'

import type { ReportsDataset, ReportsFilters } from '@/domain/models/reports.model'

interface ExportReportsInput {
  data: ReportsDataset
  filters: ReportsFilters
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('pt-BR')
}

const createMetadataCover = (data: ReportsDataset, filters: ReportsFilters) => {
  const metadata = [
    ['MenuXP - Relatório de Análise'],
    [],
    ['Data de Exportação:', new Date().toLocaleString('pt-BR')],
    ['Período:', `${formatDate(filters.dateRange.start)} até ${formatDate(filters.dateRange.end)}`],
    ['Granularidade:', filters.chartGranularity || 'diário'],
    [],
    ['Resumo Executivo'],
    ['Receita Total:', formatCurrency(data.summary.totalRevenue)],
    ['Total de Pedidos:', data.summary.totalOrders],
    ['Ticket Médio:', formatCurrency(data.summary.averageTicket)],
    ['Cupons Ativos:', data.summary.activeCoupons],
    [],
    ['Filtros Aplicados:'],
    ...(filters.categoryIds && filters.categoryIds.length > 0 ? [['Categorias:', filters.categoryIds.join(', ')]] : []),
    ...(filters.menuItemIds && filters.menuItemIds.length > 0
      ? [['Itens do Menu:', filters.menuItemIds.join(', ')]]
      : []),
    ...(filters.comboIds && filters.comboIds.length > 0 ? [['Combos:', filters.comboIds.join(', ')]] : []),
    ...(filters.customerSegments && filters.customerSegments.length > 0
      ? [['Segmentos de Cliente:', filters.customerSegments.join(', ')]]
      : []),
    ...(filters.operationTypes && filters.operationTypes.length > 0
      ? [['Tipos de Operação:', filters.operationTypes.join(', ')]]
      : []),
    ...(filters.couponCodes && filters.couponCodes.length > 0
      ? [['Códigos de Cupom:', filters.couponCodes.join(', ')]]
      : [])
  ]
  return XLSX.utils.aoa_to_sheet(metadata)
}

const createOrdersSheet = (data: ReportsDataset) => {
  if (!data.orders) return null
  const rows = [
    ['Módulo: Pedidos'],
    [],
    ['Métricas Principais'],
    ...Object.entries(data.orders.kpis).map(([key, value]) => [key, value]),
    [],
    ['Distribuição por Status'],
    ['Status', 'Quantidade', 'Cor'],
    ...data.orders.statusDistribution.map((item) => [item.status, item.count, item.color]),
    [],
    ['Série Temporal'],
    ['Período', 'Receita', 'Pedidos'],
    ...data.orders.timeSeries.map((item) => [item.period, formatCurrency(item.revenue), item.orders])
  ]
  return XLSX.utils.aoa_to_sheet(rows)
}

const createItemsSheet = (data: ReportsDataset) => {
  if (!data.items) return null
  const rows = [
    ['Módulo: Itens'],
    [],
    ['Top Itens por Receita'],
    ['ID', 'Nome', 'Tipo', 'Receita', 'Quantidade'],
    ...data.items.topByRevenue.map((item) => [
      item.id,
      item.name,
      item.type,
      formatCurrency(item.revenue),
      item.quantity
    ]),
    [],
    ['Itens com Menor Desempenho por Receita'],
    ['ID', 'Nome', 'Tipo', 'Receita', 'Quantidade'],
    ...data.items.bottomByRevenue.map((item) => [
      item.id,
      item.name,
      item.type,
      formatCurrency(item.revenue),
      item.quantity
    ])
  ]
  return XLSX.utils.aoa_to_sheet(rows)
}

const createCategoriesSheet = (data: ReportsDataset) => {
  if (!data.categories) return null
  const rows = [
    ['Módulo: Categorias'],
    [],
    ['Contribuição por Categoria'],
    ['ID da Categoria', 'Nome', 'Receita', 'Percentual'],
    ...data.categories.contribution.map((item) => [
      item.categoryId,
      item.name,
      formatCurrency(item.revenue),
      `${item.percentage.toFixed(2)}%`
    ]),
    [],
    ['Variação Mês a Mês'],
    ['ID da Categoria', 'Nome', 'Variação (%)'],
    ...data.categories.monthOverMonth.map((item) => [item.categoryId, item.name, `${item.deltaPercentage.toFixed(2)}%`])
  ]
  return XLSX.utils.aoa_to_sheet(rows)
}

const createCustomersSheet = (data: ReportsDataset) => {
  if (!data.customers) return null
  const rows = [
    ['Módulo: Clientes'],
    [],
    ['Segmentação de Clientes'],
    ['Segmento', 'Quantidade', 'Receita'],
    ...data.customers.segments.map((item) => [item.segment, item.customers, formatCurrency(item.revenue)]),
    [],
    ['Faixas de Valor Vitalício'],
    ['Faixa', 'Clientes', 'LTV Médio'],
    ...data.customers.lifetimeValueBands.map((item) => [
      item.band,
      item.customers,
      formatCurrency(item.averageLifetimeValue)
    ]),
    [],
    ['Top Clientes'],
    ['ID do Cliente', 'Nome', 'Receita', 'Pedidos'],
    ...data.customers.topCustomers.map((item) => [item.clientId, item.name, formatCurrency(item.revenue), item.orders])
  ]
  return XLSX.utils.aoa_to_sheet(rows)
}

const createOperationsSheet = (data: ReportsDataset) => {
  if (!data.operations) return null
  const rows = [
    ['Módulo: Operações'],
    [],
    ['Métricas de Eficiência'],
    ['Tempo Médio de Preparo (min)', data.operations.preparationTimeAvg],
    ['Tempo Médio de Entrega (min)', data.operations.fulfillmentTimeAvg],
    ['Total de Cancelamentos', data.operations.cancellationCount],
    [],
    ['Linha do Tempo por Status'],
    ['Status', 'Tempo Médio (min)'],
    ...data.operations.timeline.map((item) => [item.status, item.averageMinutes])
  ]
  return XLSX.utils.aoa_to_sheet(rows)
}

const createCouponsSheet = (data: ReportsDataset) => {
  if (!data.coupons) return null
  const rows = [
    ['Módulo: Cupons'],
    [],
    ['Uso de Cupons'],
    ['Código', 'Nome', 'Redenções', 'Taxa de Redenção (%)', 'Impacto na Receita', 'Passivo Pendente'],
    ...data.coupons.usage.map((item) => [
      item.code,
      item.name,
      item.redemptions,
      `${item.redemptionRate.toFixed(2)}%`,
      formatCurrency(item.revenueImpact),
      formatCurrency(item.outstandingLiability)
    ])
  ]
  return XLSX.utils.aoa_to_sheet(rows)
}

export const exportReportsToXlsx = ({ data, filters }: ExportReportsInput): void => {
  try {
    const workbook = XLSX.utils.book_new()
    const coverSheet = createMetadataCover(data, filters)
    XLSX.utils.book_append_sheet(workbook, coverSheet, 'Resumo')
    const ordersSheet = createOrdersSheet(data)
    if (ordersSheet) {
      XLSX.utils.book_append_sheet(workbook, ordersSheet, 'Pedidos')
    }
    const itemsSheet = createItemsSheet(data)
    if (itemsSheet) {
      XLSX.utils.book_append_sheet(workbook, itemsSheet, 'Itens')
    }
    const categoriesSheet = createCategoriesSheet(data)
    if (categoriesSheet) {
      XLSX.utils.book_append_sheet(workbook, categoriesSheet, 'Categorias')
    }
    const customersSheet = createCustomersSheet(data)
    if (customersSheet) {
      XLSX.utils.book_append_sheet(workbook, customersSheet, 'Clientes')
    }
    const operationsSheet = createOperationsSheet(data)
    if (operationsSheet) {
      XLSX.utils.book_append_sheet(workbook, operationsSheet, 'Operações')
    }
    const couponsSheet = createCouponsSheet(data)
    if (couponsSheet) {
      XLSX.utils.book_append_sheet(workbook, couponsSheet, 'Cupons')
    }
    const fileName = `MenuXP_Relatorio_${new Date().toISOString().split('T')[0]}.xlsx`
    XLSX.writeFile(workbook, fileName)
  } catch (error) {
    console.error('Error exporting reports to Excel:', error)
    throw new Error('Falha ao exportar relatório para Excel')
  }
}
