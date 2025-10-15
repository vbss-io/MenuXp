import type { UserAuth } from '@api/infra/facades/user-auth.dto'

export class UserAuthFacade {
  private user: UserAuth | undefined

  constructor() {
    this.user = undefined
  }

  setUser(userAuth: UserAuth): void {
    this.user = userAuth
  }

  getUser(): UserAuth | undefined {
    return this.user
  }
}
