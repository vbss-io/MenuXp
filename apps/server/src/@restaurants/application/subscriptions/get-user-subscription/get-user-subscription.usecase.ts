import { NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'
import { Plan } from '@restaurants/domain/plans/plan.entity'
import { Subscription } from '@restaurants/domain/subscriptions/subscription.entity'
import { PlanRepository } from '@restaurants/infra/repositories/plan.repository'
import { SubscriptionRepository } from '@restaurants/infra/repositories/subscription.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

interface GetUserSubscriptionUsecaseInput {
  userId: string
}

interface GetUserSubscriptionUsecaseOutput {
  subscription: Subscription
  plan: Plan
  paymentMethodSummary?: {
    hasPaymentMethod: boolean
    canManagePayment: boolean
  }
  invoices?: Array<{
    id?: string
    hostedUrl?: string
    pdfUrl?: string
    status?: string
  }>
}

export class GetUserSubscriptionUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('SubscriptionRepository')
  private readonly SubscriptionRepository!: SubscriptionRepository

  @inject('PlanRepository')
  private readonly PlanRepository!: PlanRepository

  async execute({ userId }: GetUserSubscriptionUsecaseInput): Promise<GetUserSubscriptionUsecaseOutput> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const subscription = await this.SubscriptionRepository.findById(user.currentSubscriptionId as string)
    if (!subscription) throw new NotFoundError('Subscription', user.currentSubscriptionId as string)
    const plan = await this.PlanRepository.findById(subscription.planId)
    if (!plan) throw new NotFoundError('Plan', subscription.planId)
    const paymentMethodSummary = {
      hasPaymentMethod: !!user.externalCustomerId && !!subscription.externalSubscriptionId,
      canManagePayment: !!user.externalCustomerId
    }
    const invoices =
      subscription.invoicePdf || subscription.invoicePdfHosted
        ? [
            {
              id: subscription.latestInvoiceId,
              hostedUrl: subscription.invoicePdfHosted,
              pdfUrl: subscription.invoicePdf,
              status: subscription.lastPaymentStatus
            }
          ]
        : []
    return {
      subscription,
      plan,
      paymentMethodSummary,
      invoices
    }
  }
}
