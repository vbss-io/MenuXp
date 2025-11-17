import { ONE_DAY } from '@api/domain/consts/timeouts.const'
import { ForbiddenError, NotFoundError, UnauthorizedError } from '@api/domain/errors'
import { PasswordAuthentication } from '@api/infra/adapters/auth/password-auth.adapter'
import { TokenAuthentication } from '@api/infra/adapters/auth/token-auth.adapter'
import { Cache } from '@api/infra/adapters/cache/cache.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { UserAuth } from '@api/infra/facades/user-auth.dto'

import { LoginUserType } from '@restaurants/application/auth/login-user/login-user.schema'
import { PlanFeatures } from '@restaurants/domain/plans/plan.entity'
import { UserStatus } from '@restaurants/domain/users/enums/user-status.enum'
import { SubscriptionRepository } from '@restaurants/infra/repositories/subscription.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

interface LoginUserUsecaseOutput {
  token: string
  user: UserAuth & {
    subscription: {
      planId: string
      features: PlanFeatures
    }
  }
  restaurantId?: string
}

export class LoginUserUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('SubscriptionRepository')
  private readonly SubscriptionRepository!: SubscriptionRepository

  @inject('PasswordAuthentication')
  private readonly PasswordAuthentication!: PasswordAuthentication

  @inject('TokenAuthentication')
  private readonly TokenAuthentication!: TokenAuthentication

  @inject('Cache')
  private readonly Cache!: Cache

  async execute({ email, password }: LoginUserType): Promise<LoginUserUsecaseOutput> {
    const user = await this.UserRepository.findOne({ email })
    if (!user) throw new UnauthorizedError('Invalid email or password')
    if (!user.confirmedEmail) throw new ForbiddenError('Email not confirmed')
    if (user.status !== UserStatus.ACTIVE) throw new ForbiddenError('User not active')
    const correctPassword = await this.PasswordAuthentication.compare(password, user.passwordHash)
    if (!correctPassword) throw new UnauthorizedError('Invalid email or password')
    const userAuth = user.getAuth()
    const token = this.TokenAuthentication.encode(userAuth)
    this.Cache.set(`auth:${user.id}`, { token }, ONE_DAY)
    const subscription = await this.SubscriptionRepository.findById(user.currentSubscriptionId as string)
    if (!subscription) throw new NotFoundError('Subscription', user.currentSubscriptionId)
    return {
      token,
      user: { ...userAuth, subscription: { planId: subscription.planId, features: subscription.getCurrentFeatures() } },
      restaurantId: user.restaurantId
    }
  }
}
