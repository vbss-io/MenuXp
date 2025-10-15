import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const DeleteComboSchema = z.object({
  comboId: ObjectIdSchema
})

export type DeleteComboType = z.infer<typeof DeleteComboSchema>
