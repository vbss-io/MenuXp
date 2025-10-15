import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const MarkCustomerNotificationAsReadSchema = z.object({
  customerId: ObjectIdSchema,
  notificationId: ObjectIdSchema
})

export type MarkCustomerNotificationAsReadType = z.infer<typeof MarkCustomerNotificationAsReadSchema>
