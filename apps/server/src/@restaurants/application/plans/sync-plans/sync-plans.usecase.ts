import { AVAILABLE_PLANS, AvailablePlan } from '@restaurants/domain/plans/consts/plans.const'
import { Plan } from '@restaurants/domain/plans/plan.entity'
// import { SubscriptionPaymentGateway } from '@/domain/gateways/subscription-payment.gateway'
import { inject } from '@api/infra/dependency-injection/registry'
import { PlanRepository } from '@restaurants/infra/repositories/plan.repository'

export class SyncPlansUsecase {
  @inject('PlanRepository')
  private readonly PlanRepository!: PlanRepository

  // @inject('stripeGateway')
  // private readonly stripeGateway!: SubscriptionPaymentGateway

  async execute(): Promise<void> {
    for (const planData of AVAILABLE_PLANS) {
      const existingPlan = await this.PlanRepository.findOne({ code: planData.code })
      if (existingPlan) {
        await this.updatePlan(existingPlan, planData)
      } else {
        await this.createPlan(planData)
      }
    }
  }

  private async updatePlan(existingPlan: Plan, planData: AvailablePlan): Promise<void> {
    existingPlan.update(planData)
    if (planData.isActive) {
      existingPlan.activate()
    } else {
      existingPlan.deactivate()
    }
    await this.PlanRepository.update({ id: existingPlan.id }, existingPlan)
    // const updatedPlan = await this.PlanRepository.update({ id: existingPlan.id }, existingPlan)
    // const response = await this.stripeGateway.updateProduct(updatedPlan)
    // if (response && response.pricesIds?.month?.length && response.pricesIds?.year?.length) {
    //   updatedPlan.update({
    //     monthlyPriceId: response.pricesIds.month,
    //     yearlyPriceId: response.pricesIds.year
    //   })
    //   await this.PlanRepository.update({ id: updatedPlan.id }, updatedPlan)
    // }
  }

  private async createPlan(planData: AvailablePlan): Promise<void> {
    const plan = Plan.create({
      name: planData.name,
      code: planData.code,
      price: planData.price,
      yearlyDiscount: planData.yearlyDiscount,
      currency: planData.currency,
      features: planData.features,
      description: planData.description
    })
    await this.PlanRepository.create(plan)
    // const createdPlan = await this.PlanRepository.create(plan)
    // const response = await this.stripeGateway.createProduct(createdPlan)
    // if (response) {
    //   createdPlan.update({
    //     monthlyPriceId: response.pricesIds.month,
    //     yearlyPriceId: response.pricesIds.year
    //   })
    //   await this.PlanRepository.update({ id: createdPlan.id }, createdPlan)
    // }
  }
}
