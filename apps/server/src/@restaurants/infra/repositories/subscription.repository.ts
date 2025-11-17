import { type BaseRepository, BaseRepositoryMongoose } from '@api/infra/repository/@base.repository'
import { Subscription } from '@restaurants/domain/subscriptions/subscription.entity'
import { type SubscriptionDocument, SubscriptionModel } from '@restaurants/domain/subscriptions/subscription.schema'

export interface SubscriptionRepository<T = unknown> extends BaseRepository<T, Subscription> {
  toDomain(subscription: T): Subscription
}

export class SubscriptionRepositoryMongoose
  extends BaseRepositoryMongoose<SubscriptionDocument, Subscription>
  implements SubscriptionRepository<SubscriptionDocument>
{
  constructor(model = SubscriptionModel) {
    super(model)
  }

  toDomain(entity: SubscriptionDocument): Subscription {
    return Subscription.restore({
      id: entity._id.toString(),
      userId: entity.userId,
      planId: entity.planId,
      status: entity.status,
      startDate: entity.startDate,
      endDate: entity.endDate,
      nextBillingDate: entity.nextBillingDate,
      billingCycle: entity.billingCycle,
      planMetadata: entity.planMetadata,
      externalSubscriptionId: entity.externalSubscriptionId,
      latestInvoiceId: entity.latestInvoiceId,
      lastPaymentStatus: entity.lastPaymentStatus,
      invoicePdf: entity.invoicePdf,
      invoicePdfHosted: entity.invoicePdfHosted,
      cancelledAt: entity.cancelledAt,
      cancelledReason: entity.cancelledReason,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    })
  }
}
