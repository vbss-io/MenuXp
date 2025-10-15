import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'
import { z } from 'zod'

export const AssignScheduledOrderToOperationSchema = z.object({
  orderId: ObjectIdSchema,
  operationId: ObjectIdSchema
})

export type AssignScheduledOrderToOperationType = z.infer<typeof AssignScheduledOrderToOperationSchema>
