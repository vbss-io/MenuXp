import { BaseController } from '@api/application/@base.controller'
import { inject } from '@api/infra/dependency-injection/registry'
import { ResetPasswordRequestedListener } from '@restaurants/application/auth/@listeners/reset-password-requested.listener'
import { UserRegisteredListener } from '@restaurants/application/auth/@listeners/user-registered.listener'
import { RESET_PASSWORD_REQUESTED, USER_REGISTERED } from '@restaurants/domain/auth/consts/auth-events.const'
import { ResetPasswordRequestedData } from '@restaurants/domain/auth/events/reset-password-requested.event'
import { UserRegisteredData } from '@restaurants/domain/auth/events/user-registered.event'

export class AuthListenersController extends BaseController {
  @inject('UserRegisteredListener')
  private readonly UserRegisteredListener!: UserRegisteredListener

  @inject('ResetPasswordRequestedListener')
  private readonly ResetPasswordRequestedListener!: ResetPasswordRequestedListener

  constructor() {
    super()

    void this.Queue.consume(USER_REGISTERED.consume, async (input: UserRegisteredData) => {
      await this.UserRegisteredListener.execute(input)
    })

    void this.Queue.consume(RESET_PASSWORD_REQUESTED.consume, async (input: ResetPasswordRequestedData) => {
      await this.ResetPasswordRequestedListener.execute(input)
    })
  }
}
