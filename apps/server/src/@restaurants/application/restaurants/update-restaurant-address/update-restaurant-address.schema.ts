import { z } from 'zod'

import { AddressSchema } from '@api/application/@schemas/address.schema'
import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const UpdateRestaurantAddressSchema = z.object({
  restaurantId: ObjectIdSchema,
  ...AddressSchema.shape
})

export type UpdateRestaurantAddressType = z.infer<typeof UpdateRestaurantAddressSchema>
