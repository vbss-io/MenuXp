import { NotFoundError } from "@api/domain/errors";
import { inject } from "@api/infra/dependency-injection/registry";
import type { VerificationCodeService } from "@customers/application/whatsapp-verification/verification-code.service";
import { CustomerUserRepository } from "@customers/infra/repositories/customer-user.repository";
import type { WhatsAppVerificationRepository } from "@customers/infra/repositories/whatsapp-verification.repository";

import type { ResendCodeType } from "./resend-code.schema";

export class ResendCodeUsecase {
  @inject('CustomerUserRepository')
  private readonly CustomerUserRepository!: CustomerUserRepository;

  @inject('WhatsAppVerificationRepository')
  private readonly WhatsAppVerificationRepository!: WhatsAppVerificationRepository;

  constructor(
    private readonly verificationCodeService: VerificationCodeService,
  ) {}

  async execute(
    { customerId, verificationId }: ResendCodeType
  ): Promise<{ verificationId: string; expiresInSeconds: number }> {
    const customer = await this.CustomerUserRepository.findById(customerId);
    if (!customer) {
      throw new NotFoundError("Customer not found");
    }
    const customerPhone = customer.phone;
    const restaurantId = customer.restaurantId;
    return await this.verificationCodeService.resendCode(
      {
        phone: customerPhone,
        restaurantId,
        customerId,
      },
      verificationId
    );
  }
}
