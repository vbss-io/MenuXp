import { ConflictError, ForbiddenError } from '@api/domain/errors'
import { PasswordAuthentication } from '@api/infra/adapters/auth/password-auth.adapter'
import { Queue } from '@api/infra/adapters/queue/queue.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { DomainEvent } from '@api/infra/events/domain-event'

import { RegisterUserType } from '@restaurants/application/auth/register-user/register-user.schema'
import { USER_REGISTERED } from '@restaurants/domain/auth/consts/auth-events.const'
import { PlanCode } from '@restaurants/domain/plans/enums/plan-code.enum'
import { Plan } from '@restaurants/domain/plans/plan.entity'
import { BillingCycle } from '@restaurants/domain/subscriptions/enums/billing-cycle.enum'
import { SubscriptionStatus } from '@restaurants/domain/subscriptions/enums/subscription-status.enum'
import { Subscription } from '@restaurants/domain/subscriptions/subscription.entity'
import { UserRole } from '@restaurants/domain/users/enums/user-role.enum'
import { UserType } from '@restaurants/domain/users/enums/user-type.enum'
import { User } from '@restaurants/domain/users/user.entity'
import { PlanRepository } from '@restaurants/infra/repositories/plan.repository'
import { SubscriptionRepository } from '@restaurants/infra/repositories/subscription.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

export class RegisterUserUsecase {
  @inject('Queue')
  private readonly Queue!: Queue

  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('PlanRepository')
  private readonly PlanRepository!: PlanRepository

  @inject('SubscriptionRepository')
  private readonly SubscriptionRepository!: SubscriptionRepository

  @inject('PasswordAuthentication')
  private readonly PasswordAuthentication!: PasswordAuthentication

  async execute({ name, email, password }: RegisterUserType): Promise<void> {
    const existingUser = await this.UserRepository.findOne({ email })
    // To-Do: Remove this after testing
    if (password !== 'P@ssword123') {
      throw new ForbiddenError('Password is not valid')
    }
    const passwordHash = await this.PasswordAuthentication.hash(password)
    if (existingUser) throw new ConflictError('Email or Username Already Exists')
    const user = User.create({
      name,
      email,
      passwordHash,
      role: UserRole.RESTAURANT_OWNER,
      userType: UserType.OWNER
    })
    const createdUser = await this.UserRepository.create(user)
    const createdUserId = createdUser.id as string
    const { subscriptionId } = await this.createUserSubscription(createdUserId)
    createdUser.setCurrentSubscription(subscriptionId)
    await this.UserRepository.update({ id: createdUserId }, createdUser)
    user.register(USER_REGISTERED.eventName, async <UserRegistered>(domainEvent: DomainEvent<UserRegistered>) => {
      await this.Queue.publish(domainEvent.eventName, domainEvent.data)
    })
    await user.finalizeRegistration()
  }

  private async createUserSubscription(userId: string): Promise<{ subscriptionId: string }> {
    const freePlan = (await this.PlanRepository.findOne({ code: PlanCode.FREE })) as Plan
    const subscription = Subscription.create({
      userId,
      planId: freePlan.id as string,
      startDate: new Date(),
      status: SubscriptionStatus.ACTIVE,
      billingCycle: BillingCycle.MONTHLY,
      planMetadata: {
        name: freePlan.name,
        code: freePlan.code,
        price: freePlan.price,
        currency: freePlan.currency,
        features: freePlan.features
      }
    })
    const createdSubscription = await this.SubscriptionRepository.create(subscription)
    return { subscriptionId: createdSubscription.id as string }
  }
}
