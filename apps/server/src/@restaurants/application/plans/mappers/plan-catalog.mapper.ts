import type { StripeProductWithPrices } from '@api/infra/gateways/subscription-payment-gateway.types'
import { AVAILABLE_PLANS } from '@restaurants/domain/plans/consts/plans.const'
import { PlanCode } from '@restaurants/domain/plans/enums/plan-code.enum'
import type { Plan, PlanIntervals } from '@restaurants/domain/plans/plan.entity'

export interface PlanUpsertInput {
  code: PlanCode
  name: string
  price: number
  currency: string
  isActive: boolean
  description?: string
  externalProductId: string
  monthlyPriceId?: string
  yearlyPriceId?: string
  intervals?: PlanIntervals
  taxBehavior?: string
  trialDays?: number
}

export interface StripeProductMetadata {
  planCode: string
  description?: string
}

export class PlanCatalogMapper {
  static toDomain(productWithPrices: StripeProductWithPrices): PlanUpsertInput | null {
    const { product, prices } = productWithPrices
    const planCode = product.metadata.planCode as PlanCode
    if (!planCode || !Object.values(PlanCode).includes(planCode)) {
      return null
    }
    const localPlan = AVAILABLE_PLANS.find((p) => p.code === planCode)
    if (!localPlan) {
      return null
    }
    const monthlyPrice = prices.find((p) => p.interval === 'month' && p.active)
    const yearlyPrice = prices.find((p) => p.interval === 'year' && p.active)
    const price = monthlyPrice ? monthlyPrice.unitAmount / 100 : 0
    const yearlyAmount = yearlyPrice ? yearlyPrice.unitAmount / 100 : 0
    const intervals: PlanIntervals | undefined =
      monthlyPrice && yearlyPrice
        ? {
            month: monthlyPrice.unitAmount / 100,
            year: yearlyAmount
          }
        : undefined
    return {
      code: planCode,
      name: product.name || localPlan.name,
      price,
      currency: monthlyPrice?.currency.toUpperCase() ?? 'BRL',
      isActive: product.active,
      description: product.description || localPlan.description,
      externalProductId: product.id,
      monthlyPriceId: monthlyPrice?.id,
      yearlyPriceId: yearlyPrice?.id,
      intervals,
      taxBehavior: product.metadata.taxBehavior,
      trialDays: product.metadata.trialDays ? parseInt(product.metadata.trialDays, 10) : undefined
    }
  }

  static toStripeMetadata(plan: Plan): StripeProductMetadata {
    return {
      planCode: plan.code,
      description: plan.description
    }
  }
}
