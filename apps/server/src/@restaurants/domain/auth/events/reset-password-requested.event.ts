import type { DomainEvent } from '@api/infra/events/domain-event'

import { RESET_PASSWORD_REQUESTED } from '@restaurants/domain/auth/consts/auth-events.const'

export interface ResetPasswordRequestedData {
  email: string
}

export class ResetPasswordRequested implements DomainEvent<ResetPasswordRequestedData> {
  eventName = RESET_PASSWORD_REQUESTED.eventName

  constructor(readonly data: ResetPasswordRequestedData) {}
}
