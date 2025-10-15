import type { UserStatus } from '@restaurants/domain/users/enums/user-status.enum'
import type { UserType } from '@restaurants/domain/users/enums/user-type.enum'

export interface UserAuth {
  id: string
  name: string
  email: string
  userType: UserType
  role: string
  status: UserStatus
  avatar?: string
}
