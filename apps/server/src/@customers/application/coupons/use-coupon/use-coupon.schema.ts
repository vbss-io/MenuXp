import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const UseCouponSchema = z.object({
  couponId: ObjectIdSchema
})

export type UseCouponType = z.infer<typeof UseCouponSchema>
