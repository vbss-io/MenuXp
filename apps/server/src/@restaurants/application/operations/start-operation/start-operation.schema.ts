import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const StartOperationSchema = z.object({
  restaurantId: ObjectIdSchema
})

export type StartOperationType = z.infer<typeof StartOperationSchema>
