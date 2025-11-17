import { NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'

import type { RequestCodeType } from '@customers/application/whatsapp-verification/request-code/request-code.schema'
import type { VerificationCodeService } from '@customers/application/whatsapp-verification/verification-code.service'
import { VerificationStatus } from '@customers/domain/whatsapp-verifications/whatsapp-verification.schema'
import { CustomerUserRepository } from '@customers/infra/repositories/customer-user.repository'
import type { WhatsAppVerificationRepository } from '@customers/infra/repositories/whatsapp-verification.repository'

export class RequestCodeUsecase {
  @inject('CustomerUserRepository')
  private readonly CustomerUserRepository!: CustomerUserRepository

  @inject('WhatsAppVerificationRepository')
  private readonly WhatsAppVerificationRepository!: WhatsAppVerificationRepository

  @inject('VerificationCodeService')
  private readonly VerificationCodeService!: VerificationCodeService

  async execute({
    customerId,
    language
  }: RequestCodeType): Promise<{ verificationId: string; expiresInSeconds: number }> {
    const customer = await this.CustomerUserRepository.findById(customerId)
    if (!customer) {
      throw new NotFoundError('Customer not found')
    }
    const [verification] = await this.WhatsAppVerificationRepository.find({
      customerId,
      status: VerificationStatus.PENDING
    })
    if (verification) {
      const expiresInSeconds = Math.max(0, Math.floor((verification.expiresAt.getTime() - Date.now()) / 1000))
      return {
        verificationId: verification.id as string,
        expiresInSeconds
      }
    }
    const customerPhone = customer.phone
    const restaurantId = customer.restaurantId
    const customerLanguage = language ?? customer.preferredLanguage ?? 'pt_BR'
    return await this.VerificationCodeService.requestCode({
      phone: customerPhone,
      customerId,
      restaurantId,
      language: customerLanguage
    })
  }
}
