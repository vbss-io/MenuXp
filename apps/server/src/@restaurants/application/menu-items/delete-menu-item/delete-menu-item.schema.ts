import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const DeleteMenuItemSchema = z.object({
  menuItemId: ObjectIdSchema
})

export type DeleteMenuItemType = z.infer<typeof DeleteMenuItemSchema>
