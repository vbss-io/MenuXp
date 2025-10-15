import { z } from 'zod'

export const LoginUserSchema = z.object({
  email: z
    .string({
      required_error: 'email is required',
      invalid_type_error: 'email must be a string'
    })
    .email(),
  password: z.string({
    required_error: 'password is required',
    invalid_type_error: 'password must be a string'
  })
})

export type LoginUserType = z.infer<typeof LoginUserSchema>
