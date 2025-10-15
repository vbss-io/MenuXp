import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const GetOrderSchema = z.object({
  orderId: ObjectIdSchema
})

export type GetOrderType = z.infer<typeof GetOrderSchema>
