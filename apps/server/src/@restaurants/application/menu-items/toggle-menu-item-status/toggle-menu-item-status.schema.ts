import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const ToggleMenuItemStatusSchema = z.object({
  menuItemId: ObjectIdSchema
})

export type ToggleMenuItemStatusType = z.infer<typeof ToggleMenuItemStatusSchema>
