export enum UserStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  BLOCKED = 'blocked',
  DELETED = 'deleted'
}

export const UserStatusValues = Object.values(UserStatus)
