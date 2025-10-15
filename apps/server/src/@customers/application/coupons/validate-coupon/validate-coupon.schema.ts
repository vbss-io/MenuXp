import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const ValidateCouponSchema = z.object({
  code: z
    .string({
      required_error: 'code is required',
      invalid_type_error: 'code must be a string'
    })
    .min(1, 'code is required'),
  restaurantId: ObjectIdSchema,
  orderValue: z
    .number({
      required_error: 'orderValue is required',
      invalid_type_error: 'orderValue must be a number'
    })
    .min(0, 'orderValue must be greater than or equal to 0')
})

export type ValidateCouponType = z.infer<typeof ValidateCouponSchema>
