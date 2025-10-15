import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const ToggleCouponStatusSchema = z.object({
  couponId: ObjectIdSchema
})

export type ToggleCouponStatusType = z.infer<typeof ToggleCouponStatusSchema>
