import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

const OrderItemOptionalSchema = z.object({
  name: z.string(),
  price: z.number().min(0),
  quantity: z.number().min(1)
})

export const OrderItemSchema = z.object({
  itemId: ObjectIdSchema,
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
    .min(0, 'price must be greater than or equal to 0'),
  quantity: z
    .number({
      required_error: 'quantity is required',
      invalid_type_error: 'quantity must be a number'
    })
    .min(1, 'quantity must be greater than 0'),
  itemType: z.enum(['menu-item', 'combo'], {
    required_error: 'itemType is required',
    invalid_type_error: 'itemType must be either menu-item or combo'
  }),
  optionals: z.array(OrderItemOptionalSchema).optional(),
  note: z.string().optional()
})
