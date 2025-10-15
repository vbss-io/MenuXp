import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const GetMenuItemSchema = z.object({
  menuItemId: ObjectIdSchema
})

export type GetMenuItemType = z.infer<typeof GetMenuItemSchema>
