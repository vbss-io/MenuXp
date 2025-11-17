import { type BaseRepository, BaseRepositoryMongoose } from '@api/infra/repository/@base.repository'

import { WhatsAppNotificationLog } from '@restaurants/domain/whatsapp-notifications/whatsapp-notification-log.entity'
import {
  type WhatsAppNotificationLogDocument,
  WhatsAppNotificationLogModel
} from '@restaurants/domain/whatsapp-notifications/whatsapp-notification-log.schema'

export interface WhatsAppNotificationLogRepository<T = unknown> extends BaseRepository<T, WhatsAppNotificationLog> {
  toDomain(entity: T): WhatsAppNotificationLog
}

export class WhatsAppNotificationLogRepositoryMongoose
  extends BaseRepositoryMongoose<WhatsAppNotificationLogDocument, WhatsAppNotificationLog>
  implements WhatsAppNotificationLogRepository<WhatsAppNotificationLogDocument>
{
  constructor(model = WhatsAppNotificationLogModel) {
    super(model)
  }

  toDomain(entity: WhatsAppNotificationLogDocument): WhatsAppNotificationLog {
    return WhatsAppNotificationLog.restore({
      id: entity._id.toString(),
      orderId: entity.orderId,
      event: entity.event,
      recipientPhone: entity.recipientPhone,
      languageRequested: entity.languageRequested,
      languageUsed: entity.languageUsed,
      templateName: entity.templateName,
      status: entity.status,
      attemptNumber: entity.attemptNumber,
      correlationId: entity.correlationId,
      timestamp: entity.timestamp,
      errorCode: entity.errorCode,
      errorMessage: entity.errorMessage,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    })
  }
}
