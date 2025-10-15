import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const MarkNotificationAsReadSchema = z.object({
  notificationId: ObjectIdSchema
})

export type MarkNotificationAsReadType = z.infer<typeof MarkNotificationAsReadSchema>
