import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'
import { CartItemTypeSchema } from '@customers/application/cart/@schemas/cart-item-type.schema'
import { CartItemOptionalSchema } from '@customers/application/cart/@schemas/cart-optionals.schema'

export const AddItemToCartSchema = z
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
      .min(1, 'quantity must be greater than 0'),
    itemType: CartItemTypeSchema,
    optionals: z.array(CartItemOptionalSchema).optional(),
    note: z.string().max(500, 'Note must be at most 500 characters').optional()
  })
  .refine((data) => data.clientId || data.sessionId, {
    message: 'Either clientId or sessionId must be provided',
    path: ['clientId']
  })

export type AddItemToCartType = z.infer<typeof AddItemToCartSchema>
