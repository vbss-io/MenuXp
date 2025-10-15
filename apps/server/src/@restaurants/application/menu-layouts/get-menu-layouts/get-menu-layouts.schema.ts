import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const GetMenuLayoutsSchema = z.object({
  restaurantId: ObjectIdSchema
})

export type GetMenuLayoutsType = z.infer<typeof GetMenuLayoutsSchema>
