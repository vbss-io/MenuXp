import { z } from 'zod'

import { AddressSchema } from '@api/application/@schemas/address.schema'
import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const CreateCustomerUserSchema = z.object({
  phone: z
    .string({
      required_error: 'Phone is required',
      invalid_type_error: 'Phone must be a string'
    })
    .min(1, 'Phone is required'),
  restaurantId: ObjectIdSchema,
  name: z.string().optional(),
  address: AddressSchema.optional()
})

export type CreateCustomerUserType = z.infer<typeof CreateCustomerUserSchema>
