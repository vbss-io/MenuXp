import { z } from 'zod'

import { api } from '@/lib/api'

export const planFeaturesSchema = z.object({
  menuItems: z.number().nullable(),
  monthlyOrders: z.number().nullable(),
  staffMembers: z.number(),
  customDomain: z.boolean(),
  removePoweredBy: z.boolean(),
  onlinePayment: z.boolean(),
  hasCoupons: z.boolean(),
  activeCoupons: z.number().nullable(),
  hasCampaigns: z.boolean(),
  hasAdvancedAnalytics: z.boolean(),
  menuLayouts: z.number(),
  maxStorage: z.number().nullable()
})

const apiPlanResponseSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  price: z.number(),
  yearlyDiscount: z.number(),
  currency: z.string(),
  features: planFeaturesSchema,
  isActive: z.boolean(),
  description: z.string().optional(),
  intervals: z.object({
    month: z.number(),
    year: z.number()
  })
})

export const planSchema = z.object({
  code: z.string(),
  name: z.string(),
  monthlyPrice: z.number(),
  yearlyPrice: z.number(),
  currency: z.string(),
  features: planFeaturesSchema,
  isActive: z.boolean(),
  description: z.string().optional(),
  isFree: z.boolean().optional(),
  isPopular: z.boolean().optional()
})

const apiPlansResponseSchema = z.array(apiPlanResponseSchema)

export const getPlansResponseSchema = z.array(planSchema)

export type PlanFeatures = z.infer<typeof planFeaturesSchema>
export type Plan = z.infer<typeof planSchema>
export type GetPlansResponse = z.infer<typeof getPlansResponseSchema>

export const getPlans = async (): Promise<GetPlansResponse> => {
  const response = await api.get<z.infer<typeof apiPlansResponseSchema>>('/plans')
  const apiPlans = apiPlansResponseSchema.parse(response.data)
  const plans = apiPlans.map((apiPlan) => ({
    code: apiPlan.code,
    name: apiPlan.name,
    monthlyPrice: apiPlan.intervals.month,
    yearlyPrice: apiPlan.intervals.year,
    currency: apiPlan.currency,
    features: apiPlan.features,
    isActive: apiPlan.isActive,
    description: apiPlan.description,
    isFree: apiPlan.intervals.month === 0 && apiPlan.intervals.year === 0,
    isPopular: false
  }))
  return getPlansResponseSchema.parse(plans)
}
