import { z } from 'zod'

export const UpdatePasswordSchema = z
  .object({
    password: z.string({
      required_error: 'password is required',
      invalid_type_error: 'password must be a string'
    }),
    passwordConfirm: z.string({
      required_error: 'passwordConfirm is required',
      invalid_type_error: 'passwordConfirm must be a string'
    })
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm']
  })

export type UpdatePasswordType = z.infer<typeof UpdatePasswordSchema>
