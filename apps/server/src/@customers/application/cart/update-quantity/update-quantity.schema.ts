import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

import { CartItemOptionalSchema } from '@customers/application/cart/@schemas/cart-optionals.schema'

export const UpdateCartItemQuantitySchema = z
  .object({
    clientId: ObjectIdSchema.optional(),
    sessionId: z.string().optional(),
    restaurantId: ObjectIdSchema,
    itemId: ObjectIdSchema,
    quantity: z
      .number({
        required_error: 'quantity is required',
        invalid_type_error: 'quantity must be a number'
      })
      .min(0, 'quantity must be greater than or equal to 0'),
    optionals: z.array(CartItemOptionalSchema).optional(),
    note: z.string().max(500, 'Note must be at most 500 characters').optional()
  })
  .refine((data) => data.clientId || data.sessionId, {
    message: 'Either clientId or sessionId must be provided',
    path: ['clientId']
  })

export type UpdateCartItemQuantityType = z.infer<typeof UpdateCartItemQuantitySchema>
