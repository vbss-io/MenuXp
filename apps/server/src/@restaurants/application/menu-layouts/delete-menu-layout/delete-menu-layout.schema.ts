import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const DeleteMenuLayoutSchema = z.object({
  layoutId: ObjectIdSchema
})

export type DeleteMenuLayoutType = z.infer<typeof DeleteMenuLayoutSchema>
