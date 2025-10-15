import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const GetOrdersByClientPhoneSchema = z.object({
  phone: z
    .string({
      required_error: 'phone is required',
      invalid_type_error: 'phone must be a string'
    })
    .min(1, 'phone cannot be empty'),
  restaurantId: ObjectIdSchema
})

export type GetOrdersByClientPhoneType = z.infer<typeof GetOrdersByClientPhoneSchema>
