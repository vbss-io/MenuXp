import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const DeleteCouponSchema = z.object({
  couponId: ObjectIdSchema
})

export type DeleteCouponType = z.infer<typeof DeleteCouponSchema>
