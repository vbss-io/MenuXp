import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const GetCurrentOperationSchema = z.object({
  restaurantId: ObjectIdSchema
})

export type GetCurrentOperationType = z.infer<typeof GetCurrentOperationSchema>
