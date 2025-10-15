import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const FinishOperationSchema = z.object({
  operationId: ObjectIdSchema
})

export type FinishOperationType = z.infer<typeof FinishOperationSchema>
