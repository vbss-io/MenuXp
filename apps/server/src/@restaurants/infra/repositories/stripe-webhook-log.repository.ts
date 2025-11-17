import { type BaseRepository, BaseRepositoryMongoose } from '@api/infra/repository/@base.repository'

import { StripeWebhookLog } from '@restaurants/domain/webhooks/stripe-webhook-log.entity'
import {
  type StripeWebhookLogDocument,
  StripeWebhookLogModel
} from '@restaurants/domain/webhooks/stripe-webhook-log.schema'

export interface StripeWebhookLogRepository<T = unknown> extends BaseRepository<T, StripeWebhookLog> {
  toDomain(webhookLog: T): StripeWebhookLog
  findByEventId(eventId: string): Promise<StripeWebhookLog | null>
  isDuplicate(eventId: string): Promise<boolean>
}

export class StripeWebhookLogRepositoryMongoose
  extends BaseRepositoryMongoose<StripeWebhookLogDocument, StripeWebhookLog>
  implements StripeWebhookLogRepository<StripeWebhookLogDocument>
{
  constructor(model = StripeWebhookLogModel) {
    super(model)
  }

  toDomain(entity: StripeWebhookLogDocument): StripeWebhookLog {
    return StripeWebhookLog.restore({
      id: entity._id.toString(),
      eventId: entity.eventId,
      eventType: entity.eventType,
      payloadHash: entity.payloadHash,
      processedAt: entity.processedAt,
      status: entity.status,
      errorMessage: entity.errorMessage,
      retryCount: entity.retryCount,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    })
  }

  async findByEventId(eventId: string): Promise<StripeWebhookLog | null> {
    return this.findOne({ eventId } as Partial<StripeWebhookLog>)
  }

  async isDuplicate(eventId: string): Promise<boolean> {
    return this.exists({ eventId } as Partial<StripeWebhookLog>)
  }
}
