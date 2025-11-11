import type { VerificationCodeService } from '@customers/application/whatsapp-verification/verification-code.service';

import type { VerifyCodeType } from './verify-code.schema';

export class VerifyCodeUsecase {
  constructor(private readonly verificationCodeService: VerificationCodeService) {}

  async execute({ verificationId, code, customerId }: VerifyCodeType): Promise<{ verificationToken: string; expiresInSeconds: number }> {
    return await this.verificationCodeService.verifyCode({
      verificationId,
      code,
      customerId
    })
  }
}
