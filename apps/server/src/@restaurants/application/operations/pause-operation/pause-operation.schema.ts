import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const PauseOperationSchema = z.object({
  operationId: ObjectIdSchema
})

export type PauseOperationType = z.infer<typeof PauseOperationSchema>
