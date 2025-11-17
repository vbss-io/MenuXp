import { inject } from '@api/infra/dependency-injection/registry'
import type { VerificationCodeService } from '@customers/application/whatsapp-verification/verification-code.service'
import type { VerifyCodeType } from '@customers/application/whatsapp-verification/verify-code/verify-code.schema'

export class VerifyCodeUsecase {
  @inject('VerificationCodeService')
  private readonly VerificationCodeService!: VerificationCodeService

  async execute({
    verificationId,
    code,
    customerId
  }: VerifyCodeType): Promise<{ verificationToken: string; expiresInSeconds: number }> {
    return await this.VerificationCodeService.verifyCode({
      verificationId,
      code,
      customerId
    })
  }
}
