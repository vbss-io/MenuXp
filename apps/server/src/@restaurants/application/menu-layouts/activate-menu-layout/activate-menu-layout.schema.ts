import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const ActivateMenuLayoutSchema = z.object({
  layoutId: ObjectIdSchema
})

export type ActivateMenuLayoutType = z.infer<typeof ActivateMenuLayoutSchema>
