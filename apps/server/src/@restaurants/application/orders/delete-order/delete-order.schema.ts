import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const DeleteOrderSchema = z.object({
  orderId: ObjectIdSchema
})

export type DeleteOrderType = z.infer<typeof DeleteOrderSchema>
