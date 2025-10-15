import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const GetRestaurantMenuItemsByCategorySchema = z.object({
  restaurantId: ObjectIdSchema,
  categoryId: ObjectIdSchema
})

export type GetRestaurantMenuItemsByCategoryType = z.infer<typeof GetRestaurantMenuItemsByCategorySchema>
