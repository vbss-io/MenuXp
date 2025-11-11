import { z } from 'zod'

export const ResendCodeSchema = z.object({
  customerId: z.string().min(1, 'Customer ID is required'),
  verificationId: z.string().min(1, 'Verification ID is required')
})

export type ResendCodeType = z.infer<typeof ResendCodeSchema>
