import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const GetMenuItemOptionalsSchema = z.object({
  menuItemId: ObjectIdSchema
})

export type GetMenuItemOptionalsType = z.infer<typeof GetMenuItemOptionalsSchema>
