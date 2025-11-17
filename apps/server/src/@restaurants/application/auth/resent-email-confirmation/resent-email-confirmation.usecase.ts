import { NotFoundError } from '@api/domain/errors'
import { Queue } from '@api/infra/adapters/queue/queue.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { DomainEvent } from '@api/infra/events/domain-event'

import { ForgotPasswordType } from '@restaurants/application/auth/forgot-password/forgot-password.schema'
import { USER_REGISTERED } from '@restaurants/domain/auth/consts/auth-events.const'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type ResentConfirmationUsecaseInput = ForgotPasswordType

export class ResentConfirmationUsecase {
  @inject('Queue')
  private readonly Queue!: Queue

  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  async execute({ email }: ResentConfirmationUsecaseInput): Promise<void> {
    const existingUser = await this.UserRepository.findOne({ email })
    if (!existingUser) throw new NotFoundError('User', email)
    existingUser.register(
      USER_REGISTERED.eventName,
      async <UserRegistered>(domainEvent: DomainEvent<UserRegistered>) => {
        await this.Queue.publish(domainEvent.eventName, domainEvent.data)
      }
    )
    await existingUser.finalizeRegistration()
  }
}
