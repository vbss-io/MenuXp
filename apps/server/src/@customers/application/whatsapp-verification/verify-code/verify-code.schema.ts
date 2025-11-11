import { z } from 'zod'

export const VerifyCodeSchema = z.object({
  verificationId: z.string().min(1, 'Verification ID is required'),
  customerId: z.string().min(1, 'Customer ID is required'),
  code: z
    .string()
    .length(6, 'Code must be exactly 6 digits')
    .regex(/^\d+$/, 'Code must contain only digits')
})

export type VerifyCodeType = z.infer<typeof VerifyCodeSchema>
