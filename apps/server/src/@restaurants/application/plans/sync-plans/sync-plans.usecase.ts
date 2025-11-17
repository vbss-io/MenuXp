import { Logger } from '@api/infra/adapters/logger/logger.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { SubscriptionPaymentGateway } from '@api/infra/gateways/subscription-payment.gateway'
import { PlanCatalogMapper, PlanUpsertInput } from '@restaurants/application/plans/mappers/plan-catalog.mapper'
import { AVAILABLE_PLANS } from '@restaurants/domain/plans/consts/plans.const'
import { Plan } from '@restaurants/domain/plans/plan.entity'
import { PlanRepository } from '@restaurants/infra/repositories/plan.repository'

export interface SyncPlansResult {
  success: boolean
  synced: number
  failed: number
  errors: string[]
}

export class SyncPlansUsecase {
  @inject('PlanRepository')
  private readonly planRepository!: PlanRepository

  @inject('SubscriptionPaymentGateway')
  private readonly stripeGateway!: SubscriptionPaymentGateway

  @inject('Logger')
  private readonly logger!: Logger

  async execute(): Promise<SyncPlansResult> {
    this.logger.info('Starting plan catalog sync from Stripe')
    const result: SyncPlansResult = {
      success: true,
      synced: 0,
      failed: 0,
      errors: []
    }
    try {
      const stripeProducts = await this.stripeGateway.listActiveProducts()
      this.logger.info(`Fetched ${stripeProducts.length} active products from Stripe`)
      for (const productWithPrices of stripeProducts) {
        try {
          const planUpsertData = PlanCatalogMapper.toDomain(productWithPrices)
          if (!planUpsertData) {
            const errorMsg = `Missing or invalid planCode metadata for Stripe product ${productWithPrices.product.id}`
            this.logger.warn(errorMsg, { productId: productWithPrices.product.id })
            result.errors.push(errorMsg)
            result.failed++
            continue
          }
          await this.syncPlan(planUpsertData)
          result.synced++
        } catch (error) {
          const errorMsg = `Failed to sync plan for product ${productWithPrices.product.id}: ${error instanceof Error ? error.message : String(error)}`
          this.logger.error(errorMsg, { productId: productWithPrices.product.id, error })
          result.errors.push(errorMsg)
          result.failed++
        }
      }
      this.logger.info(`Plan sync completed: ${result.synced} synced, ${result.failed} failed`)
      if (result.failed > 0) {
        result.success = false
      }
      return result
    } catch (error) {
      const errorMsg = `Plan catalog sync failed: ${error instanceof Error ? error.message : String(error)}`
      this.logger.error(errorMsg, { error })
      result.success = false
      result.errors.push(errorMsg)
      return result
    }
  }

  private async syncPlan(planData: PlanUpsertInput): Promise<void> {
    const existingPlan = await this.planRepository.findOne({ code: planData.code })
    const localFeatures = AVAILABLE_PLANS.find((p) => p.code === planData.code)?.features
    if (!localFeatures) {
      throw new Error(`No local feature definition found for plan code ${planData.code}`)
    }
    if (existingPlan) {
      existingPlan.update({
        name: planData.name,
        price: planData.price,
        currency: planData.currency,
        description: planData.description,
        monthlyPriceId: planData.monthlyPriceId,
        yearlyPriceId: planData.yearlyPriceId,
        externalProductId: planData.externalProductId,
        intervals: planData.intervals,
        taxBehavior: planData.taxBehavior,
        trialDays: planData.trialDays,
        features: localFeatures
      })
      if (planData.isActive) {
        existingPlan.activate()
      } else {
        existingPlan.deactivate()
      }
      await this.planRepository.update({ id: existingPlan.id }, existingPlan)
      this.logger.info(`Updated plan ${planData.code}`, { planId: existingPlan.id })
    } else {
      const newPlan = Plan.create({
        name: planData.name,
        code: planData.code,
        price: planData.price,
        yearlyDiscount: AVAILABLE_PLANS.find((p) => p.code === planData.code)?.yearlyDiscount ?? 0,
        currency: planData.currency,
        features: localFeatures,
        description: planData.description
      })
      newPlan.update({
        monthlyPriceId: planData.monthlyPriceId,
        yearlyPriceId: planData.yearlyPriceId,
        externalProductId: planData.externalProductId,
        intervals: planData.intervals,
        taxBehavior: planData.taxBehavior,
        trialDays: planData.trialDays
      })
      if (planData.isActive) {
        newPlan.activate()
      } else {
        newPlan.deactivate()
      }
      await this.planRepository.create(newPlan)
      this.logger.info(`Created plan ${planData.code}`)
    }
  }
}
