import { BadRequestError, NotFoundError } from '@api/domain/errors'
import { Logger } from '@api/infra/adapters/logger/logger.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { SubscriptionPaymentGateway } from '@api/infra/gateways/subscription-payment.gateway'

import { PlanCode } from '@restaurants/domain/plans/enums/plan-code.enum'
import { BillingCycle } from '@restaurants/domain/subscriptions/enums/billing-cycle.enum'
import { PlanRepository } from '@restaurants/infra/repositories/plan.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

interface CreateCheckoutSessionUsecaseInput {
  userId: string
  planCode: PlanCode
  billingCycle: BillingCycle
}

interface CreateCheckoutSessionUsecaseOutput {
  sessionId: string
  url: string
}

export class CreateCheckoutSessionUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('PlanRepository')
  private readonly PlanRepository!: PlanRepository

  @inject('SubscriptionPaymentGateway')
  private readonly paymentGateway!: SubscriptionPaymentGateway

  @inject('Logger')
  private readonly logger!: Logger

  async execute({
    userId,
    planCode,
    billingCycle
  }: CreateCheckoutSessionUsecaseInput): Promise<CreateCheckoutSessionUsecaseOutput> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const plan = await this.PlanRepository.findOne({ code: planCode })
    if (!plan) throw new NotFoundError('Plan', planCode)
    if (!plan.isActive) {
      throw new BadRequestError('Selected plan is not currently available')
    }
    const priceId = billingCycle === BillingCycle.MONTHLY ? plan.monthlyPriceId : plan.yearlyPriceId
    if (!priceId) {
      throw new BadRequestError(`Price not available for ${billingCycle} billing cycle`)
    }
    let customerId = user.externalCustomerId
    if (!customerId) {
      const customer = await this.paymentGateway.createCustomer({
        email: user.email,
        name: user.name,
        metadata: {
          userId: user.id as string
        }
      })
      customerId = customer.id
      user.setExternalCustomerId(customerId)
      await this.UserRepository.update({ id: user.id }, user)
      this.logger.info('Stripe customer created', {
        userId: user.id,
        customerId
      })
    }
    const successUrl = `${process.env.ADM_URL}/dashboard/subscription?success=true`
    const cancelUrl = `${process.env.ADM_URL}/dashboard/subscription?canceled=true`
    const checkoutSession = await this.paymentGateway.createCheckoutSession({
      customerId,
      priceId,
      successUrl,
      cancelUrl,
      locale: 'pt-BR',
      taxIdCollection: false,
      automaticTax: false,
      metadata: {
        userId: user.id as string,
        planId: plan.id as string,
        planCode,
        billingCycle
      }
    })
    this.logger.info('Checkout session created', {
      userId: user.id,
      planCode,
      billingCycle,
      sessionId: checkoutSession.sessionId
    })
    return {
      sessionId: checkoutSession.sessionId,
      url: checkoutSession.url
    }
  }
}
