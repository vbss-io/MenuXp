import type { DomainEvent } from '@api/infra/events/domain-event'
import { USER_REGISTERED } from '@restaurants/domain/auth/consts/auth-events.const'

export interface UserRegisteredData {
  name: string
  email: string
}

export class UserRegistered implements DomainEvent<UserRegisteredData> {
  eventName = USER_REGISTERED.eventName

  constructor(readonly data: UserRegisteredData) {}
}
