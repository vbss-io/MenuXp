import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const GetRestaurantComboSchema = z.object({
  restaurantId: ObjectIdSchema,
  comboId: ObjectIdSchema
})

export type GetRestaurantComboType = z.infer<typeof GetRestaurantComboSchema>
