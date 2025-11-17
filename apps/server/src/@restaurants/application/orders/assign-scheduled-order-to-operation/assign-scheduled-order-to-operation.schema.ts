import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const AssignScheduledOrderToOperationSchema = z.object({
  orderId: ObjectIdSchema,
  operationId: ObjectIdSchema
})

export type AssignScheduledOrderToOperationType = z.infer<typeof AssignScheduledOrderToOperationSchema>
