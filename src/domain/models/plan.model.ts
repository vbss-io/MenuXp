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

export interface Plan {
  id: string
  name: string
  code: string
  price: number
  yearlyDiscount: number
  currency: string
  features: PlanFeatures
  description?: string
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}
