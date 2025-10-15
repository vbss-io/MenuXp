import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const GetMenuLayoutSchema = z.object({
  layoutId: ObjectIdSchema
})

export type GetMenuLayoutType = z.infer<typeof GetMenuLayoutSchema>
