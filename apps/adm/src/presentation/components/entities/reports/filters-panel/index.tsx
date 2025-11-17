import type { ChartGranularity, ReportsFilterOptions, ReportsFilters } from '@/domain/models/reports.model'
import { ArrowCounterClockwise } from '@phosphor-icons/react'

import * as S from './styles'

interface FiltersPanel {
  filters: ReportsFilters
  filterOptions: ReportsFilterOptions | null
  isLoadingOptions: boolean
  onUpdateDateRange: (start: string, end: string) => void
  onUpdateCategoryIds: (categoryIds: string[]) => void
  onUpdateMenuItemIds: (menuItemIds: string[]) => void
  onUpdateComboIds: (comboIds: string[]) => void
  onUpdateOperationTypes: (types: string[]) => void
  onUpdateCouponCodes: (codes: string[]) => void
  onUpdateChartGranularity: (granularity: ChartGranularity) => void
  onReset: () => void
}

interface QuickRange {
  label: string
  days: number
}

const quickRanges: QuickRange[] = [
  { label: '7 dias', days: 7 },
  { label: '30 dias', days: 30 },
  { label: '90 dias', days: 90 },
  { label: '12 meses', days: 365 }
]

const calculateDateRange = (days: number): { start: string; end: string } => {
  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - days)
  return {
    start: start.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0]
  }
}

const isActiveRange = (filters: ReportsFilters, days: number): boolean => {
  const range = calculateDateRange(days)
  return filters.dateRange.start === range.start && filters.dateRange.end === range.end
}

export const FiltersPanel = ({
  filters,
  filterOptions,
  isLoadingOptions,
  onUpdateDateRange,
  onUpdateCategoryIds,
  onUpdateMenuItemIds,
  onUpdateComboIds,
  onUpdateOperationTypes,
  onUpdateCouponCodes,
  onUpdateChartGranularity,
  onReset
}: FiltersPanel) => {
  const handleQuickRangeClick = (days: number) => {
    const range = calculateDateRange(days)
    onUpdateDateRange(range.start, range.end)
  }

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    onUpdateCategoryIds(value ? [value] : [])
  }

  const handleMenuItemChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    onUpdateMenuItemIds(value ? [value] : [])
  }

  const handleComboChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    onUpdateComboIds(value ? [value] : [])
  }

  const handleOperationTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    onUpdateOperationTypes(value ? [value] : [])
  }

  const handleCouponCodeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    onUpdateCouponCodes(value ? [value] : [])
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Filtros</S.Title>
        <S.ResetButton onClick={onReset} type="button" aria-label="Resetar filtros">
          <ArrowCounterClockwise size={16} weight="bold" />
          Resetar
        </S.ResetButton>
      </S.Header>
      <S.FilterGroup>
        <S.Label htmlFor="date-range-start">Período</S.Label>
        <S.QuickRangesContainer>
          {quickRanges.map((range) => (
            <S.QuickRangeButton
              key={range.days}
              type="button"
              onClick={() => handleQuickRangeClick(range.days)}
              $isActive={isActiveRange(filters, range.days)}
              aria-pressed={isActiveRange(filters, range.days)}
            >
              {range.label}
            </S.QuickRangeButton>
          ))}
        </S.QuickRangesContainer>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          <S.Input
            type="date"
            id="date-range-start"
            value={filters.dateRange.start}
            onChange={(e) => onUpdateDateRange(e.target.value, filters.dateRange.end)}
            aria-label="Data inicial"
          />
          <S.Input
            type="date"
            id="date-range-end"
            value={filters.dateRange.end}
            onChange={(e) => onUpdateDateRange(filters.dateRange.start, e.target.value)}
            aria-label="Data final"
          />
        </div>
      </S.FilterGroup>
      <S.FiltersGrid>
        <S.FilterGroup>
          <S.Label htmlFor="chart-granularity">Granularidade</S.Label>
          <S.Select
            id="chart-granularity"
            value={filters.chartGranularity || 'daily'}
            onChange={(e) => onUpdateChartGranularity(e.target.value as ChartGranularity)}
            aria-label="Selecionar granularidade do gráfico"
          >
            <option value="daily">Diária</option>
            <option value="weekly">Semanal</option>
            <option value="monthly">Mensal</option>
          </S.Select>
        </S.FilterGroup>
        <S.FilterGroup>
          <S.Label htmlFor="category-filter">Categorias</S.Label>
          <S.Select
            id="category-filter"
            value={filters.categoryIds?.[0] || ''}
            onChange={handleCategoryChange}
            disabled={isLoadingOptions || !filterOptions?.categories.length}
            aria-label="Selecionar categorias"
          >
            <option value="">Todas</option>
            {filterOptions?.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </S.Select>
        </S.FilterGroup>
        <S.FilterGroup>
          <S.Label htmlFor="menu-item-filter">Itens do Menu</S.Label>
          <S.Select
            id="menu-item-filter"
            value={filters.menuItemIds?.[0] || ''}
            onChange={handleMenuItemChange}
            disabled={isLoadingOptions || !filterOptions?.menuItems.length}
            aria-label="Selecionar itens do menu"
          >
            <option value="">Todos</option>
            {filterOptions?.menuItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </S.Select>
        </S.FilterGroup>
        <S.FilterGroup>
          <S.Label htmlFor="combo-filter">Combos</S.Label>
          <S.Select
            id="combo-filter"
            value={filters.comboIds?.[0] || ''}
            onChange={handleComboChange}
            disabled={isLoadingOptions || !filterOptions?.combos.length}
            aria-label="Selecionar combos"
          >
            <option value="">Todos</option>
            {filterOptions?.combos.map((combo) => (
              <option key={combo.id} value={combo.id}>
                {combo.name}
              </option>
            ))}
          </S.Select>
        </S.FilterGroup>
        <S.FilterGroup>
          <S.Label htmlFor="operation-type-filter">Tipo de Operação</S.Label>
          <S.Select
            id="operation-type-filter"
            value={filters.operationTypes?.[0] || ''}
            onChange={handleOperationTypeChange}
            disabled={isLoadingOptions || !filterOptions?.operationTypes.length}
            aria-label="Selecionar tipos de operação"
          >
            <option value="">Todos</option>
            {filterOptions?.operationTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </S.Select>
        </S.FilterGroup>
        <S.FilterGroup>
          <S.Label htmlFor="coupon-filter">Cupons</S.Label>
          <S.Select
            id="coupon-filter"
            value={filters.couponCodes?.[0] || ''}
            onChange={handleCouponCodeChange}
            disabled={isLoadingOptions || !filterOptions?.coupons.length}
            aria-label="Selecionar cupons"
          >
            <option value="">Todos</option>
            {filterOptions?.coupons.map((coupon) => (
              <option key={coupon.code} value={coupon.code}>
                {coupon.name} ({coupon.code})
              </option>
            ))}
          </S.Select>
        </S.FilterGroup>
      </S.FiltersGrid>
    </S.Container>
  )
}
