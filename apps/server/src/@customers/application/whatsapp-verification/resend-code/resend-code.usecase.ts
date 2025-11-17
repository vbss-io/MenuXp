import { NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'
import type { ResendCodeType } from '@customers/application/whatsapp-verification/resend-code/resend-code.schema'
import type { VerificationCodeService } from '@customers/application/whatsapp-verification/verification-code.service'
import { CustomerUserRepository } from '@customers/infra/repositories/customer-user.repository'

export class ResendCodeUsecase {
  @inject('CustomerUserRepository')
  private readonly CustomerUserRepository!: CustomerUserRepository

  @inject('VerificationCodeService')
  private readonly VerificationCodeService!: VerificationCodeService

  async execute({
    customerId,
    verificationId
  }: ResendCodeType): Promise<{ verificationId: string; expiresInSeconds: number }> {
    const customer = await this.CustomerUserRepository.findById(customerId)
    if (!customer) {
      throw new NotFoundError('Customer not found')
    }
    const customerPhone = customer.phone
    const restaurantId = customer.restaurantId
    return await this.VerificationCodeService.resendCode(
      {
        phone: customerPhone,
        restaurantId,
        customerId
      },
      verificationId
    )
  }
}
