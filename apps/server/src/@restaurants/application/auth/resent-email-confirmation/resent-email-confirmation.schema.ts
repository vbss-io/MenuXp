import { z } from 'zod'

export const ResentEmailConfirmationSchema = z.object({
  email: z
    .string()
    .email({
      message: 'email must be a valid email'
    })
    .optional()
})

export type ResentEmailConfirmationType = z.infer<typeof ResentEmailConfirmationSchema>
