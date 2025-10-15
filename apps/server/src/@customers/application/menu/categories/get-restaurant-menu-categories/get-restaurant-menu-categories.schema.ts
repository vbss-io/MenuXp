import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const GetRestaurantMenuCategoriesSchema = z.object({
  restaurantId: ObjectIdSchema,
  categoryIds: z.array(ObjectIdSchema).optional()
})

export type GetRestaurantMenuCategoriesType = z.infer<typeof GetRestaurantMenuCategoriesSchema>
