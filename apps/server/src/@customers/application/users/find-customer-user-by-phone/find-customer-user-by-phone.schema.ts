import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const FindCustomerUserByPhoneSchema = z.object({
  restaurantId: ObjectIdSchema,
  phone: z
    .string({
      required_error: 'Phone is required',
      invalid_type_error: 'Phone must be a string'
    })
    .min(1, 'Phone is required')
})

export type FindCustomerUserByPhoneType = z.infer<typeof FindCustomerUserByPhoneSchema>
