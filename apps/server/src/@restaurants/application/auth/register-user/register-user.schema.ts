import { z } from 'zod'

export const RegisterUserSchema = z
  .object({
    name: z.string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string'
    }),
    email: z
      .string({
        required_error: 'email is required'
      })
      .email({
        message: 'email must be a valid email'
      }),
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

export type RegisterUserType = z.infer<typeof RegisterUserSchema>
