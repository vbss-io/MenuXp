import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const GetCustomerNotificationsSchema = z.object({
  customerId: ObjectIdSchema,
  limit: z.coerce.number().min(1).max(100).optional().default(20),
  offset: z.coerce.number().min(0).optional().default(0),
  unreadOnly: z.coerce.boolean().optional().default(false)
})

export type GetCustomerNotificationsType = z.infer<typeof GetCustomerNotificationsSchema>
