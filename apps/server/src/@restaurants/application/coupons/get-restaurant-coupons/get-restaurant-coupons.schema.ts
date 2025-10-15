import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const GetRestaurantCouponsSchema = z.object({
  restaurantId: ObjectIdSchema,
  includeInactive: z.coerce.boolean().optional().default(false)
})

export type GetRestaurantCouponsType = z.infer<typeof GetRestaurantCouponsSchema>
