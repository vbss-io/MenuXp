import { z } from 'zod'

export const cancelSubscriptionSchema = z.object({
  atPeriodEnd: z.boolean().optional().default(true),
  reason: z.string().max(500).optional()
})

export type CancelSubscriptionInput = z.infer<typeof cancelSubscriptionSchema>
