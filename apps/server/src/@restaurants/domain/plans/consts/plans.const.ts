import { PlanCode } from '@restaurants/domain/plans/enums/plan-code.enum'
import type { PlanFeatures } from '@restaurants/domain/plans/plan.entity'

export interface AvailablePlan {
  name: string
  code: PlanCode
  price: number
  yearlyDiscount: number
  currency: 'BRL' | 'USD'
  isActive: boolean
  features: PlanFeatures
  description: string
}

export const AVAILABLE_PLANS: AvailablePlan[] = [
  {
    name: 'Free',
    code: PlanCode.FREE,
    price: 0,
    yearlyDiscount: 0,
    currency: 'BRL',
    isActive: true,
    features: {
      menuItems: 120,
      monthlyOrders: 400,
      staffMembers: 2,
      customDomain: false,
      removePoweredBy: false,
      onlinePayment: false,
      hasCoupons: false,
      activeCoupons: 0,
      hasCampaigns: false,
      hasAdvancedAnalytics: false,
      menuLayouts: 1,
      maxStorage: 500
    },
    description: 'MenuXP Free'
  },
  {
    name: 'Basic',
    code: PlanCode.BASIC,
    price: 49.9,
    yearlyDiscount: 0.15,
    currency: 'BRL',
    isActive: true,
    features: {
      menuItems: null,
      monthlyOrders: null,
      staffMembers: 5,
      customDomain: false,
      removePoweredBy: false,
      onlinePayment: false,
      hasCoupons: true,
      activeCoupons: 5,
      hasCampaigns: true,
      hasAdvancedAnalytics: true,
      menuLayouts: 3,
      maxStorage: 1000
    },
    description: 'MenuXP Basic'
  },
  {
    name: 'Premium',
    code: PlanCode.PREMIUM,
    price: 99.9,
    yearlyDiscount: 0.15,
    currency: 'BRL',
    isActive: true,
    features: {
      menuItems: null,
      monthlyOrders: null,
      staffMembers: 10,
      customDomain: true,
      removePoweredBy: true,
      onlinePayment: true,
      hasCoupons: true,
      activeCoupons: 15,
      hasCampaigns: true,
      hasAdvancedAnalytics: true,
      menuLayouts: 5,
      maxStorage: 5000
    },
    description: 'MenuXP Premium'
  },
  {
    name: 'Enterprise',
    code: PlanCode.ENTERPRISE,
    price: 199.9,
    yearlyDiscount: 0.15,
    currency: 'BRL',
    isActive: true,
    features: {
      menuItems: null,
      monthlyOrders: null,
      staffMembers: 10,
      customDomain: true,
      removePoweredBy: true,
      onlinePayment: true,
      hasCoupons: true,
      activeCoupons: null,
      hasCampaigns: true,
      hasAdvancedAnalytics: true,
      menuLayouts: 10,
      maxStorage: null
    },
    description: 'MenuXP Enterprise'
  }
]
