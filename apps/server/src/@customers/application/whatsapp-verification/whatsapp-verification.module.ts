import { ZodAdapter } from '@api/infra/adapters/validate/validate.adapter'
import { Registry } from '@api/infra/dependency-injection/registry'
import { RequestCodeController } from '@customers/application/whatsapp-verification/request-code/request-code.controller'
import { RequestCodeSchema } from '@customers/application/whatsapp-verification/request-code/request-code.schema'
import { RequestCodeUsecase } from '@customers/application/whatsapp-verification/request-code/request-code.usecase'
import { ResendCodeController } from '@customers/application/whatsapp-verification/resend-code/resend-code.controller'
import { ResendCodeSchema } from '@customers/application/whatsapp-verification/resend-code/resend-code.schema'
import { ResendCodeUsecase } from '@customers/application/whatsapp-verification/resend-code/resend-code.usecase'
import { VerificationCodeServiceImpl } from '@customers/application/whatsapp-verification/verification-code.service'
import { VerifyCodeController } from '@customers/application/whatsapp-verification/verify-code/verify-code.controller'
import { VerifyCodeSchema } from '@customers/application/whatsapp-verification/verify-code/verify-code.schema'
import { VerifyCodeUsecase } from '@customers/application/whatsapp-verification/verify-code/verify-code.usecase'

export class WhatsAppVerificationModule {
  constructor() {
    const registry = Registry.getInstance()
    registry.provide('VerificationCodeService', new VerificationCodeServiceImpl())

    registry.provide('RequestCodeValidate', new ZodAdapter(RequestCodeSchema))
    registry.provide('RequestCodeUsecase', new RequestCodeUsecase())
    new RequestCodeController()

    registry.provide('ResendCodeValidate', new ZodAdapter(ResendCodeSchema))
    registry.provide('ResendCodeUsecase', new ResendCodeUsecase())
    new ResendCodeController()

    registry.provide('VerifyCodeValidate', new ZodAdapter(VerifyCodeSchema))
    registry.provide('VerifyCodeUsecase', new VerifyCodeUsecase())
    new VerifyCodeController()
  }
}
