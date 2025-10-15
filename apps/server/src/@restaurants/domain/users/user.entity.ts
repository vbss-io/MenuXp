import { FileUrl } from '@api/domain/vos/file-url.vo'
import { Observable } from '@api/infra/events/observer'
import type { UserAuth } from '@api/infra/facades/user-auth.dto'
import { ResetPasswordRequested } from '@restaurants/domain/auth/events/reset-password-requested.event'
import { UserRegistered } from '@restaurants/domain/auth/events/user-registered.event'
import { type UserRole } from '@restaurants/domain/users/enums/user-role.enum'
import { UserStatus } from '@restaurants/domain/users/enums/user-status.enum'
import { UserType } from '@restaurants/domain/users/enums/user-type.enum'

export class User extends Observable {
  id: string | number | undefined
  passwordHash: string
  confirmedEmail: boolean
  status: UserStatus
  name: string
  restaurantId?: string
  avatarPath?: string
  currentSubscriptionId?: string
  externalCustomerId?: string

  private constructor(
    id: string | number | undefined,
    name: string,
    readonly email: string,
    passwordHash: string,
    confirmedEmail: boolean,
    readonly userType: UserType,
    readonly role: UserRole,
    status: UserStatus,
    restaurantId?: string,
    avatarPath?: string,
    currentSubscriptionId?: string,
    externalCustomerId?: string,
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) {
    super()
    this.id = id
    this.passwordHash = passwordHash
    this.confirmedEmail = confirmedEmail
    this.status = status
    this.name = name
    this.restaurantId = restaurantId
    this.avatarPath = avatarPath
    this.currentSubscriptionId = currentSubscriptionId
    this.externalCustomerId = externalCustomerId
  }

  static create(input: UserCreate): User {
    return new User(
      undefined,
      input.name,
      input.email,
      input.passwordHash,
      false,
      input.userType,
      input.role,
      UserStatus.PENDING,
      input.restaurantId
    )
  }

  static restore(input: UserRestore): User {
    return new User(
      input.id,
      input.name,
      input.email,
      input.passwordHash,
      input.confirmedEmail,
      input.userType,
      input.role,
      input.status,
      input.restaurantId,
      input.avatarPath,
      input.currentSubscriptionId,
      input.externalCustomerId,
      input.createdAt,
      input.updatedAt
    )
  }

  getAuth(): UserAuth {
    return {
      id: this.id as string,
      name: this.name,
      email: this.email,
      userType: this.userType,
      role: this.role,
      status: this.status,
      avatar: FileUrl.create(this.avatarPath).getValue()
    }
  }

  isInternal(): boolean {
    return this.userType === UserType.INTERNAL
  }

  hasPermission(): boolean {
    return this.userType === UserType.OWNER
  }

  isStaff(): boolean {
    return this.userType === UserType.STAFF
  }

  updatePasswordHash(passwordHash: string): void {
    this.passwordHash = passwordHash
  }

  confirmEmail(): void {
    this.confirmedEmail = true
    this.status = UserStatus.ACTIVE
  }

  updateStatus(status: UserStatus): void {
    this.status = status
  }

  updateProfile(userProfile: UpdateProfile): void {
    this.name = userProfile.name ?? this.name
    this.avatarPath = userProfile.avatarPath ?? this.avatarPath
  }

  updateRestaurantId(restaurantId: string): void {
    this.restaurantId = restaurantId
  }

  setCurrentSubscription(subscriptionId: string): void {
    this.currentSubscriptionId = subscriptionId
  }

  setExternalCustomerId(customerId: string): void {
    this.externalCustomerId = customerId
  }

  async finalizeRegistration(): Promise<void> {
    await this.notify(new UserRegistered({ name: this.name, email: this.email }))
  }

  async resetPassword(): Promise<void> {
    await this.notify(new ResetPasswordRequested({ email: this.email }))
  }
}

export interface UserCreate {
  name: string
  email: string
  passwordHash: string
  userType: UserType
  role: UserRole
  restaurantId?: string
}

export type UserRestore = UserCreate & {
  id: string | number
  confirmedEmail: boolean
  status: UserStatus
  avatarPath?: string
  currentSubscriptionId?: string
  externalCustomerId?: string
  createdAt: Date
  updatedAt: Date
}

export interface UpdateProfile {
  name?: string
  avatarPath?: string
}
