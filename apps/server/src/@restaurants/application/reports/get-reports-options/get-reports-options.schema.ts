import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const GetReportsOptionsSchema = z.object({
  restaurantId: ObjectIdSchema
})

export type GetReportsOptionsType = z.infer<typeof GetReportsOptionsSchema>
