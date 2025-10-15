import { z } from 'zod'

import { AddressSchema } from '@api/application/@schemas/address.schema'

export const OrderCustomerSchema = z.object({
  name: z
    .string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string'
    })
    .min(1, 'name cannot be empty'),
  phone: z
    .string({
      required_error: 'phone is required',
      invalid_type_error: 'phone must be a string'
    })
    .min(1, 'phone cannot be empty'),
  address: AddressSchema
})
