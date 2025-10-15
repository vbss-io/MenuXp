import { z } from 'zod'

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .email({
      message: 'email must be a valid email'
    })
    .optional()
})

export type ForgotPasswordType = z.infer<typeof ForgotPasswordSchema>
