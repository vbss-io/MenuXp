import { NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'
import { Subscription } from '@restaurants/domain/subscriptions/subscription.entity'
import { SubscriptionRepository } from '@restaurants/infra/repositories/subscription.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

interface GetUserSubscriptionUsecaseInput {
  userId: string
}

export class GetUserSubscriptionUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('SubscriptionRepository')
  private readonly SubscriptionRepository!: SubscriptionRepository

  async execute({ userId }: GetUserSubscriptionUsecaseInput): Promise<Subscription> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const subscription = await this.SubscriptionRepository.findById(user.currentSubscriptionId as string)
    if (!subscription) throw new NotFoundError('Subscription', user.currentSubscriptionId as string)
    return subscription
  }
}
