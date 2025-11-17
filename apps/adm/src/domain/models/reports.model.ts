export type ReportsSection = 'summary' | 'orders' | 'items' | 'categories' | 'customers' | 'operations' | 'coupons'

export type CustomerSegment = 'new' | 'returning'

export type ChartGranularity = 'daily' | 'weekly' | 'monthly'

export type LifetimeValueBand = 'low' | 'medium' | 'high'

export type ItemType = 'menu-item' | 'combo'

export interface ReportsFilters {
  restaurantId: string
  dateRange: { start: string; end: string }
  categoryIds?: string[]
  menuItemIds?: string[]
  comboIds?: string[]
  customerSegments?: CustomerSegment[]
  operationTypes?: string[]
  couponCodes?: string[]
  chartGranularity?: ChartGranularity
}

export interface GetReportsDataInput {
  filters: ReportsFilters
  sections?: ReportsSection[]
}

export interface SummaryData {
  totalRevenue: number
  totalOrders: number
  averageTicket: number
  exportGeneratedAt: string
  activeCoupons: number
}

export interface OrderStatusItem {
  status: string
  count: number
  color: string
}

export interface TimeSeriesDataPoint {
  period: string
  revenue: number
  orders: number
}

export interface OrdersData {
  kpis: Record<string, number>
  statusDistribution: OrderStatusItem[]
  timeSeries: TimeSeriesDataPoint[]
}

export interface ItemPerformance {
  id: string
  name: string
  type: ItemType
  revenue: number
  quantity: number
}

export interface ItemsData {
  topByRevenue: ItemPerformance[]
  bottomByRevenue: ItemPerformance[]
}

export interface CategoryContribution {
  categoryId: string
  name: string
  revenue: number
  percentage: number
}

export interface CategoryMonthOverMonth {
  categoryId: string
  name: string
  deltaPercentage: number
}

export interface CategoriesData {
  contribution: CategoryContribution[]
  monthOverMonth: CategoryMonthOverMonth[]
}

export interface CustomerSegmentData {
  segment: CustomerSegment
  customers: number
  revenue: number
}

export interface LifetimeValueBandData {
  band: LifetimeValueBand
  customers: number
  averageLifetimeValue: number
}

export interface TopCustomer {
  clientId: string
  name: string
  phone: string
  revenue: number
  orders: number
}

export interface CustomersData {
  segments: CustomerSegmentData[]
  lifetimeValueBands: LifetimeValueBandData[]
  topCustomers: TopCustomer[]
}

export interface StatusTimeline {
  status: string
  averageMinutes: number
}

export interface OperationsData {
  preparationTimeAvg: number
  fulfillmentTimeAvg: number
  cancellationCount: number
  timeline: StatusTimeline[]
}

export interface CouponUsage {
  code: string
  name: string
  redemptions: number
  redemptionRate: number
  revenueImpact: number
  outstandingLiability: number
}

export interface CouponsData {
  usage: CouponUsage[]
}

export interface ReportsDataset {
  summary: SummaryData
  orders?: OrdersData
  items?: ItemsData
  categories?: CategoriesData
  customers?: CustomersData
  operations?: OperationsData
  coupons?: CouponsData
}

export interface CategoryOption {
  id: string
  name: string
}

export interface MenuItemOption {
  id: string
  name: string
  categoryId?: string
}

export interface ComboOption {
  id: string
  name: string
}

export interface CouponOption {
  code: string
  name: string
}

export interface SegmentOption {
  value: CustomerSegment
  label: string
}

export interface OperationTypeOption {
  value: string
  label: string
}

export interface ReportsFilterOptions {
  categories: CategoryOption[]
  menuItems: MenuItemOption[]
  combos: ComboOption[]
  coupons: CouponOption[]
  operationTypes: OperationTypeOption[]
  segments: SegmentOption[]
}

export interface GetReportsDataResponse {
  data: ReportsDataset
}

export interface GetReportsOptionsResponse {
  categories: CategoryOption[]
  menuItems: MenuItemOption[]
  combos: ComboOption[]
  coupons: CouponOption[]
  operationTypes: OperationTypeOption[]
  segments: SegmentOption[]
}
