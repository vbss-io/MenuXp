import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const MigrateCartSchema = z.object({
  sessionId: z.string({
    required_error: 'sessionId is required',
    invalid_type_error: 'sessionId must be a string'
  }),
  clientId: ObjectIdSchema,
  restaurantId: ObjectIdSchema
})

export type MigrateCartType = z.infer<typeof MigrateCartSchema>
