export interface PlanFeatures {
  menuItems: number | null
  monthlyOrders: number | null
  staffMembers: number
  customDomain: boolean
  removePoweredBy: boolean
  onlinePayment: boolean
  hasCoupons: boolean
  activeCoupons: number | null
  hasCampaigns: boolean
  hasAdvancedAnalytics: boolean
  menuLayouts: number
  maxStorage: number | null
}

export interface PlanViewModel {
  code: string
  name: string
  monthlyPrice: number
  yearlyPrice: number
  currency: string
  features: PlanFeatures
  isActive: boolean
  description?: string
  isFree?: boolean
  isPopular?: boolean
}

export type PlanContext = 'public' | 'admin'

export type PlanCTAType = 'signup' | 'select' | 'current' | 'upgrade' | 'downgrade'

export interface PlanCardProps {
  plan: PlanViewModel
  context?: PlanContext
  onCTAClick?: (planCode: string, ctaType: PlanCTAType) => void
  ctaType?: PlanCTAType
  ctaLabel?: string
  showYearlyPrice?: boolean
  highlighted?: boolean
}
