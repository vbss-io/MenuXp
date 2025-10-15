import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const GetRestaurantCombosByCategorySchema = z.object({
  restaurantId: ObjectIdSchema,
  categoryId: ObjectIdSchema
})

export type GetRestaurantCombosByCategoryType = z.infer<typeof GetRestaurantCombosByCategorySchema>
