import { type BaseRepository, BaseRepositoryMongoose } from '@api/infra/repository/@base.repository'
import { WhatsAppVerification } from '@customers/domain/whatsapp-verifications/whatsapp-verification.entity'
import {
  type WhatsAppVerificationDocument,
  WhatsAppVerificationModel
} from '@customers/domain/whatsapp-verifications/whatsapp-verification.schema'

export interface WhatsAppVerificationRepository<T = unknown> extends BaseRepository<T, WhatsAppVerification> {
  toDomain(entity: T): WhatsAppVerification
}

export class WhatsAppVerificationRepositoryMongoose
  extends BaseRepositoryMongoose<WhatsAppVerificationDocument, WhatsAppVerification>
  implements WhatsAppVerificationRepository<WhatsAppVerificationDocument>
{
  constructor(model = WhatsAppVerificationModel) {
    super(model)
  }

  toDomain(entity: WhatsAppVerificationDocument): WhatsAppVerification {
    return WhatsAppVerification.restore({
      id: entity._id.toString(),
      phone: entity.phone,
      restaurantId: entity.restaurantId,
      customerId: entity.customerId,
      codeHash: entity.codeHash,
      status: entity.status,
      attempts: entity.attempts,
      maxAttempts: entity.maxAttempts,
      expiresAt: entity.expiresAt,
      language: entity.language,
      lastSentAt: entity.lastSentAt,
      metadata: entity.metadata,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    })
  }
}
