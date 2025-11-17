import { NotFoundError } from '@api/domain/errors'
import { Logger } from '@api/infra/adapters/logger/logger.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { SubscriptionPaymentGateway } from '@api/infra/gateways/subscription-payment.gateway'

import { UserRepository } from '@restaurants/infra/repositories/user.repository'

interface CreateBillingPortalSessionUsecaseInput {
  userId: string
  returnUrl?: string
}

interface CreateBillingPortalSessionUsecaseOutput {
  url: string
}

export class CreateBillingPortalSessionUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('SubscriptionPaymentGateway')
  private readonly paymentGateway!: SubscriptionPaymentGateway

  @inject('Logger')
  private readonly logger!: Logger

  async execute({
    userId,
    returnUrl
  }: CreateBillingPortalSessionUsecaseInput): Promise<CreateBillingPortalSessionUsecaseOutput> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
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
      this.logger.info('Stripe customer created for billing portal', {
        userId: user.id,
        customerId
      })
    }
    const defaultReturnUrl = returnUrl || `${process.env.ADM_URL}/dashboard/subscription`
    const portalUrl = await this.paymentGateway.createBillingPortalSession(customerId, defaultReturnUrl)
    this.logger.info('Billing portal session created', {
      userId: user.id,
      customerId
    })
    return {
      url: portalUrl
    }
  }
}
