import type { DomainEvent } from '@api/infra/events/domain-event'

import { USER_STATUS_NON_ACTIVE_UPDATED } from '@restaurants/domain/auth/consts/auth-events.const'

export interface UserStatusNonActiveUpdatedData {
  userId: string
}

export class UserStatusNonActiveUpdated implements DomainEvent<UserStatusNonActiveUpdatedData> {
  eventName = USER_STATUS_NON_ACTIVE_UPDATED.eventName

  constructor(readonly data: UserStatusNonActiveUpdatedData) {}
}
