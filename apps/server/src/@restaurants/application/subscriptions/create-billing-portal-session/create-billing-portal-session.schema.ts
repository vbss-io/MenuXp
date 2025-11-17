import { z } from 'zod'

export const createBillingPortalSessionSchema = z.object({
  returnUrl: z.string().url().optional()
})

export type CreateBillingPortalSessionInput = z.infer<typeof createBillingPortalSessionSchema>
