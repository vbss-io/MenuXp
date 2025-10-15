import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'
import { CartItemOptionalSchema } from '@customers/application/cart/@schemas/cart-optionals.schema'

export const RemoveItemFromCartSchema = z
  .object({
    clientId: ObjectIdSchema.optional(),
    sessionId: z.string().optional(),
    restaurantId: ObjectIdSchema,
    itemId: ObjectIdSchema,
    optionals: z.array(CartItemOptionalSchema).optional(),
    note: z.string().max(500, 'Note must be at most 500 characters').optional()
  })
  .refine((data) => data.clientId || data.sessionId, {
    message: 'Either clientId or sessionId must be provided',
    path: ['clientId']
  })

export type RemoveItemFromCartType = z.infer<typeof RemoveItemFromCartSchema>
