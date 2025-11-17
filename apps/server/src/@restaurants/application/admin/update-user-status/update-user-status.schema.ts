import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

import { UserStatus } from '@restaurants/domain/users/enums/user-status.enum'

export const UpdateUserStatusSchema = z.object({
  userId: ObjectIdSchema,
  status: z.nativeEnum(UserStatus, {
    invalid_type_error: 'status must be one of the following: pending, active, blocked, deleted',
    required_error: 'status is required'
  })
})

export type UpdateUserStatusType = z.infer<typeof UpdateUserStatusSchema>
