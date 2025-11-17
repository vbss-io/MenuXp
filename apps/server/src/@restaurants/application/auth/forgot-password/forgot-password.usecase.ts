import { ForbiddenError, NotFoundError } from '@api/domain/errors'
import { Queue } from '@api/infra/adapters/queue/queue.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { DomainEvent } from '@api/infra/events/domain-event'

import { ForgotPasswordType } from '@restaurants/application/auth/forgot-password/forgot-password.schema'
import { RESET_PASSWORD_REQUESTED } from '@restaurants/domain/auth/consts/auth-events.const'
import { UserStatus } from '@restaurants/domain/users/enums/user-status.enum'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

export class ForgotPasswordUsecase {
  @inject('Queue')
  private readonly Queue!: Queue

  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  async execute({ email }: ForgotPasswordType): Promise<void> {
    const user = await this.UserRepository.findOne({ email })
    if (!user) throw new NotFoundError('User', email)
    if (!user.confirmedEmail) throw new ForbiddenError('Email not confirmed')
    if (user.status !== UserStatus.ACTIVE) throw new ForbiddenError('User not active')
    user.register(
      RESET_PASSWORD_REQUESTED.eventName,
      async <ResetPasswordRequested>(domainEvent: DomainEvent<ResetPasswordRequested>) => {
        await this.Queue.publish(domainEvent.eventName, domainEvent.data)
      }
    )
    await user.resetPassword()
  }
}
