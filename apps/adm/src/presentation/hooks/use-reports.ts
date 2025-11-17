import { GetReportsOptionsUsecase } from '@/application/reports/get-reports-options.usecase'
import { GetReportsUsecase } from '@/application/reports/get-reports.usecase'
import type {
  ChartGranularity,
  ReportsDataset,
  ReportsFilterOptions,
  ReportsFilters,
  ReportsSection
} from '@/domain/models/reports.model'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from './use-auth'
import { useDebounce } from './use-debounce'

const getReportsUsecase = new GetReportsUsecase()
const getReportsOptionsUsecase = new GetReportsOptionsUsecase()

const SESSION_STORAGE_CHART_TYPES_KEY = 'reports_chart_types'

interface ChartTypeSelection {
  orders?: string
  items?: string
  categories?: string
  customers?: string
  operations?: string
  coupons?: string
}

const getDefaultDateRange = () => {
  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - 30)
  return {
    start: start.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0]
  }
}

const getDefaultFilters = (restaurantId: string): ReportsFilters => ({
  restaurantId,
  dateRange: getDefaultDateRange(),
  chartGranularity: 'daily'
})

export const useReports = () => {
  const { restaurantId } = useAuth()
  const [filters, setFilters] = useState<ReportsFilters>(
    restaurantId ? getDefaultFilters(restaurantId) : ({} as ReportsFilters)
  )
  const [data, setData] = useState<ReportsDataset | null>(null)
  const [filterOptions, setFilterOptions] = useState<ReportsFilterOptions | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingOptions, setIsLoadingOptions] = useState(false)
  const [chartTypes, setChartTypes] = useState<ChartTypeSelection>(() => {
    const stored = sessionStorage.getItem(SESSION_STORAGE_CHART_TYPES_KEY)
    return stored ? JSON.parse(stored) : {}
  })
  const debouncedFilters = useDebounce(filters, 500)

  const fetchFilterOptions = useCallback(async () => {
    if (!restaurantId) return
    try {
      setIsLoadingOptions(true)
      const options = await getReportsOptionsUsecase.execute({ restaurantId })
      setFilterOptions(options)
    } catch (error) {
      console.error('Error fetching filter options:', error)
      toast.error('Erro ao carregar opções de filtro')
    } finally {
      setIsLoadingOptions(false)
    }
  }, [restaurantId])

  const fetchReportsData = useCallback(
    async (sections?: ReportsSection[]) => {
      if (!restaurantId) return
      try {
        setIsLoading(true)
        const response = await getReportsUsecase.execute({
          filters: debouncedFilters,
          sections
        })
        setData(response.data)
      } catch (error) {
        console.error('Error fetching reports data:', error)
        toast.error('Erro ao carregar dados do relatório')
      } finally {
        setIsLoading(false)
      }
    },
    [restaurantId, debouncedFilters]
  )

  const updateFilters = useCallback((updates: Partial<ReportsFilters>) => {
    setFilters((current) => ({
      ...current,
      ...updates
    }))
  }, [])

  const updateDateRange = useCallback((start: string, end: string) => {
    setFilters((current) => ({
      ...current,
      dateRange: { start, end }
    }))
  }, [])

  const updateCategoryIds = useCallback((categoryIds: string[]) => {
    setFilters((current) => ({
      ...current,
      categoryIds
    }))
  }, [])

  const updateMenuItemIds = useCallback((menuItemIds: string[]) => {
    setFilters((current) => ({
      ...current,
      menuItemIds
    }))
  }, [])

  const updateComboIds = useCallback((comboIds: string[]) => {
    setFilters((current) => ({
      ...current,
      comboIds
    }))
  }, [])

  const updateOperationTypes = useCallback((operationTypes: string[]) => {
    setFilters((current) => ({
      ...current,
      operationTypes
    }))
  }, [])

  const updateCouponCodes = useCallback((couponCodes: string[]) => {
    setFilters((current) => ({
      ...current,
      couponCodes
    }))
  }, [])

  const updateChartGranularity = useCallback((chartGranularity: ChartGranularity) => {
    setFilters((current) => ({
      ...current,
      chartGranularity
    }))
  }, [])

  const resetFilters = useCallback(() => {
    if (restaurantId) {
      setFilters(getDefaultFilters(restaurantId))
    }
  }, [restaurantId])

  const setChartType = useCallback((section: string, chartType: string) => {
    setChartTypes((current) => {
      const updated = {
        ...current,
        [section]: chartType
      }
      sessionStorage.setItem(SESSION_STORAGE_CHART_TYPES_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const getChartType = useCallback(
    (section: string, defaultType: string): string => {
      return chartTypes[section as keyof ChartTypeSelection] || defaultType
    },
    [chartTypes]
  )

  useEffect(() => {
    if (restaurantId) {
      fetchFilterOptions()
    }
  }, [restaurantId, fetchFilterOptions])

  useEffect(() => {
    if (restaurantId && debouncedFilters.restaurantId) {
      fetchReportsData()
    }
  }, [restaurantId, debouncedFilters, fetchReportsData])

  return {
    filters,
    data,
    filterOptions,
    isLoading,
    isLoadingOptions,
    updateFilters,
    updateDateRange,
    updateCategoryIds,
    updateMenuItemIds,
    updateComboIds,
    updateOperationTypes,
    updateCouponCodes,
    updateChartGranularity,
    resetFilters,
    refreshData: fetchReportsData,
    refreshOptions: fetchFilterOptions,
    setChartType,
    getChartType
  }
}
