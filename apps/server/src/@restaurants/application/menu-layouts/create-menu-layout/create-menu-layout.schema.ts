import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const CreateMenuLayoutSchema = z.object({
  restaurantId: ObjectIdSchema
})

export type CreateMenuLayoutType = z.infer<typeof CreateMenuLayoutSchema>
