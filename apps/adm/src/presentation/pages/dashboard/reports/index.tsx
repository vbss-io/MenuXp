import { CategoriesReport } from '@/presentation/components/entities/reports/categories-report'
import { CouponsReport } from '@/presentation/components/entities/reports/coupons-report'
import { CustomersReport } from '@/presentation/components/entities/reports/customers-report'
import { FiltersPanel } from '@/presentation/components/entities/reports/filters-panel'
import { ItemsReport } from '@/presentation/components/entities/reports/items-report'
import { OperationsReport } from '@/presentation/components/entities/reports/operations-report'
import { OrdersReport } from '@/presentation/components/entities/reports/orders-report'
import { SummaryKpis } from '@/presentation/components/entities/reports/summary-kpis'
import { Breadcrumb } from '@/presentation/components/ui/breadcrumb'
import { useReports } from '@/presentation/hooks/use-reports'
import { exportReportsToXlsx } from '@/utils/export-reports-to-xlsx'
import { Button, Loading } from '@menuxp/ui'
import { DownloadSimple } from '@phosphor-icons/react'
import { useState } from 'react'
import toast from 'react-hot-toast'

import * as S from '../styles'

type TabType = 'summary' | 'orders' | 'items' | 'categories' | 'customers' | 'operations' | 'coupons'

const tabs: { id: TabType; label: string }[] = [
  { id: 'summary', label: 'Resumo' },
  { id: 'orders', label: 'Pedidos' },
  { id: 'items', label: 'Itens' },
  { id: 'categories', label: 'Categorias' },
  { id: 'customers', label: 'Clientes' },
  { id: 'operations', label: 'Operações' },
  { id: 'coupons', label: 'Cupons' }
]

export const ReportsPage = () => {
  const {
    filters,
    data,
    filterOptions,
    isLoading,
    isLoadingOptions,
    updateDateRange,
    updateCategoryIds,
    updateMenuItemIds,
    updateComboIds,
    updateOperationTypes,
    updateCouponCodes,
    updateChartGranularity,
    resetFilters,
    setChartType,
    getChartType
  } = useReports()

  const [activeTab, setActiveTab] = useState<TabType>('summary')
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = () => {
    if (!data) {
      toast.error('Nenhum dado disponível para exportar')
      return
    }
    try {
      setIsExporting(true)
      exportReportsToXlsx({ data, filters })
      toast.success('Relatório exportado com sucesso')
    } catch (error) {
      console.error('Error exporting report:', error)
      toast.error('Erro ao exportar relatório')
    } finally {
      setIsExporting(false)
    }
  }

  if (isLoading && !data) {
    return (
      <S.Container>
        <Breadcrumb lastPath="Relatórios" />
        <S.LoadingWrapper>
          <Loading />
        </S.LoadingWrapper>
      </S.Container>
    )
  }

  return (
    <S.Container>
      <Breadcrumb lastPath="Relatórios" />
      <S.Header>
        <S.Title>Relatórios</S.Title>
      </S.Header>
      <FiltersPanel
        filters={filters}
        filterOptions={filterOptions}
        isLoadingOptions={isLoadingOptions}
        onUpdateDateRange={updateDateRange}
        onUpdateCategoryIds={updateCategoryIds}
        onUpdateMenuItemIds={updateMenuItemIds}
        onUpdateComboIds={updateComboIds}
        onUpdateOperationTypes={updateOperationTypes}
        onUpdateCouponCodes={updateCouponCodes}
        onUpdateChartGranularity={updateChartGranularity}
        onReset={resetFilters}
      />
      <Button
        variant="primary"
        size="sm"
        leftIcon={<DownloadSimple size={20} weight="bold" />}
        onClick={handleExport}
        disabled={isExporting || !data}
        aria-label="Exportar para Excel"
      >
        {isExporting ? 'Exportando...' : 'Exportar para Excel'}
      </Button>
      <S.TabsContainer role="tablist">
        <S.TabsHeader>
          {tabs.map((tab) => (
            <S.TabButton
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              $isActive={activeTab === tab.id}
              disabled={isLoading}
            >
              {tab.label}
            </S.TabButton>
          ))}
        </S.TabsHeader>
        {isLoading && data ? (
          <S.LoadingWrapper>
            <Loading />
          </S.LoadingWrapper>
        ) : (
          <>
            <S.TabContent
              role="tabpanel"
              id="tabpanel-summary"
              aria-labelledby="tab-summary"
              hidden={activeTab !== 'summary'}
            >
              {activeTab === 'summary' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <SummaryKpis summary={data?.summary || null} />
                  <OrdersReport
                    data={data?.orders || null}
                    chartType={getChartType('orders', 'line')}
                    onChartTypeChange={(type) => setChartType('orders', type)}
                  />
                </div>
              )}
            </S.TabContent>
            <S.TabContent
              role="tabpanel"
              id="tabpanel-orders"
              aria-labelledby="tab-orders"
              hidden={activeTab !== 'orders'}
            >
              {activeTab === 'orders' && (
                <OrdersReport
                  data={data?.orders || null}
                  chartType={getChartType('orders', 'line')}
                  onChartTypeChange={(type) => setChartType('orders', type)}
                />
              )}
            </S.TabContent>
            <S.TabContent
              role="tabpanel"
              id="tabpanel-items"
              aria-labelledby="tab-items"
              hidden={activeTab !== 'items'}
            >
              {activeTab === 'items' && <ItemsReport data={data?.items || null} />}
            </S.TabContent>
            <S.TabContent
              role="tabpanel"
              id="tabpanel-categories"
              aria-labelledby="tab-categories"
              hidden={activeTab !== 'categories'}
            >
              {activeTab === 'categories' && (
                <CategoriesReport
                  data={data?.categories || null}
                  chartType={getChartType('categories', 'pie')}
                  onChartTypeChange={(type) => setChartType('categories', type)}
                />
              )}
            </S.TabContent>
            <S.TabContent
              role="tabpanel"
              id="tabpanel-customers"
              aria-labelledby="tab-customers"
              hidden={activeTab !== 'customers'}
            >
              {activeTab === 'customers' && <CustomersReport data={data?.customers || null} />}
            </S.TabContent>
            <S.TabContent
              role="tabpanel"
              id="tabpanel-operations"
              aria-labelledby="tab-operations"
              hidden={activeTab !== 'operations'}
            >
              {activeTab === 'operations' && <OperationsReport data={data?.operations || null} />}
            </S.TabContent>
            <S.TabContent
              role="tabpanel"
              id="tabpanel-coupons"
              aria-labelledby="tab-coupons"
              hidden={activeTab !== 'coupons'}
            >
              {activeTab === 'coupons' && <CouponsReport data={data?.coupons || null} />}
            </S.TabContent>
          </>
        )}
      </S.TabsContainer>
    </S.Container>
  )
}
