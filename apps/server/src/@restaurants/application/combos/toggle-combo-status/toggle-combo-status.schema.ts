import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const ToggleComboStatusSchema = z.object({
  comboId: ObjectIdSchema
})

export type ToggleComboStatusType = z.infer<typeof ToggleComboStatusSchema>
