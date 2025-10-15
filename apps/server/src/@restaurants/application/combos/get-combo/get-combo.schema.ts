import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const GetComboSchema = z.object({
  comboId: ObjectIdSchema
})

export type GetComboType = z.infer<typeof GetComboSchema>
