import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const ResumeOperationSchema = z.object({
  operationId: ObjectIdSchema
})

export type ResumeOperationType = z.infer<typeof ResumeOperationSchema>
