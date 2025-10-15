import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const DeleteUserSchema = z.object({
  userId: ObjectIdSchema
})

export type DeleteUserType = z.infer<typeof DeleteUserSchema>
