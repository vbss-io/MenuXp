import { NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'
import { Mediator } from '@api/infra/events/mediator'
import { UpdateUserStatusType } from '@restaurants/application/admin/update-user-status/update-user-status.schema'
import { USER_STATUS_NON_ACTIVE_UPDATED } from '@restaurants/domain/auth/consts/auth-events.const'
import { UserStatusNonActiveUpdated } from '@restaurants/domain/auth/events/user-status-non-active-updated.event'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

export class UpdateUserStatusUsecase {
  @inject('Mediator')
  private readonly Mediator!: Mediator

  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  async execute({ userId, status }: UpdateUserStatusType): Promise<void> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    user.updateStatus(status)
    await this.UserRepository.update({ id: user.id }, user)
    if (status !== 'active') {
      const event = new UserStatusNonActiveUpdated({ userId })
      await this.Mediator.publish(USER_STATUS_NON_ACTIVE_UPDATED.eventName, event)
    }
  }
}
