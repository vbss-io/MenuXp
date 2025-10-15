import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const ClearCartSchema = z
  .object({
    clientId: ObjectIdSchema.optional(),
    sessionId: z.string().optional(),
    restaurantId: ObjectIdSchema
  })
  .refine((data) => data.clientId || data.sessionId, {
    message: 'Either clientId or sessionId must be provided',
    path: ['clientId']
  })

export type ClearCartType = z.infer<typeof ClearCartSchema>
