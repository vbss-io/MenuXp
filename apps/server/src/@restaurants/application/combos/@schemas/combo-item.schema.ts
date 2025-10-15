import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const ComboItemSchema = z.object({
  menuItemId: ObjectIdSchema,
  quantity: z
    .number({
      required_error: 'quantity is required',
      invalid_type_error: 'quantity must be a number'
    })
    .min(1, 'quantity must be at least 1'),
  name: z
    .string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string'
    })
    .min(1, 'name cannot be empty'),
  price: z
    .number({
      required_error: 'price is required',
      invalid_type_error: 'price must be a number'
    })
    .min(0, 'price must be greater than or equal to 0')
})
