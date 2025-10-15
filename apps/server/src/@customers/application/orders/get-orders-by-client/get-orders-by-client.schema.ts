import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const GetOrdersByClientSchema = z.object({
  clientId: ObjectIdSchema,
  restaurantId: ObjectIdSchema
})

export type GetOrdersByClientType = z.infer<typeof GetOrdersByClientSchema>
