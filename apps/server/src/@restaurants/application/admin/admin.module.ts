import { ZodAdapter } from '@api/infra/adapters/validate/validate.adapter'
import { inject, Registry } from '@api/infra/dependency-injection/registry'
import { DomainEvent } from '@api/infra/events/domain-event'
import { Mediator } from '@api/infra/events/mediator'

import { DeleteUserController } from '@restaurants/application/admin/delete-user/delete-user.controller'
import { DeleteUserSchema } from '@restaurants/application/admin/delete-user/delete-user.schema'
import { DeleteUserUsecase } from '@restaurants/application/admin/delete-user/delete-user.usecase'
import { ListSectionsController } from '@restaurants/application/admin/list-sections/list-sections.controller'
import { ListSectionsUsecase } from '@restaurants/application/admin/list-sections/list-sections.usecase'
import { RevokeSectionController } from '@restaurants/application/admin/revoke-section/revoke-section.controller'
import { RevokeSectionSchema } from '@restaurants/application/admin/revoke-section/revoke-section.schema'
import { RevokeSectionUsecase } from '@restaurants/application/admin/revoke-section/revoke-section.usecase'
import { UpdateUserStatusUsecase } from '@restaurants/application/admin/update-user-status/update-user-status.usecase'
import { USER_STATUS_NON_ACTIVE_UPDATED } from '@restaurants/domain/auth/consts/auth-events.const'
import { UserStatusNonActiveUpdatedData } from '@restaurants/domain/auth/events/user-status-non-active-updated.event'

import { UpdateUserStatusController } from './update-user-status/update-user-status.controller'
import { UpdateUserStatusSchema } from './update-user-status/update-user-status.schema'

export class AdminModule {
  @inject('Mediator')
  private readonly Mediator!: Mediator

  constructor() {
    const registry = Registry.getInstance()

    registry.provide('DeleteUserValidate', new ZodAdapter(DeleteUserSchema))
    registry.provide('DeleteUserUsecase', new DeleteUserUsecase())
    new DeleteUserController()

    registry.provide('ListSectionsUsecase', new ListSectionsUsecase())
    new ListSectionsController()

    const revokeSectionUsecase = new RevokeSectionUsecase()
    registry.provide('RevokeSectionValidate', new ZodAdapter(RevokeSectionSchema))
    registry.provide('RevokeSectionUsecase', revokeSectionUsecase)
    new RevokeSectionController()

    registry.provide('UpdateUserStatusValidate', new ZodAdapter(UpdateUserStatusSchema))
    registry.provide('UpdateUserStatusUsecase', new UpdateUserStatusUsecase())
    new UpdateUserStatusController()

    this.Mediator.register(
      USER_STATUS_NON_ACTIVE_UPDATED.eventName,
      async (event: DomainEvent<UserStatusNonActiveUpdatedData>) => {
        await revokeSectionUsecase.execute(event.data)
      }
    )
  }
}
