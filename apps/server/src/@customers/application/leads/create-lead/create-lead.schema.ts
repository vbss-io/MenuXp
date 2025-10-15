import { z } from 'zod'

export const CreateLeadSchema = z.object({
  name: z
    .string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string'
    })
    .min(2, 'name must be at least 2 characters')
    .max(100, 'name must be at most 100 characters')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'name must contain only letters and spaces'),
  email: z
    .string({
      required_error: 'email is required',
      invalid_type_error: 'email must be a string'
    })
    .email('email must be a valid email address')
    .max(255, 'email must be at most 255 characters'),
  whatsapp: z
    .string({
      required_error: 'whatsapp is required',
      invalid_type_error: 'whatsapp must be a string'
    })
    .optional()
    .refine((value) => !value || /^\d{10,11}$/.test(value.replace(/\D/g, '')), 'whatsapp must have 10 or 11 digits'),
  scenario: z
    .string({
      required_error: 'scenario is required',
      invalid_type_error: 'scenario must be a string'
    })
    .max(1000, 'scenario must be at most 1000 characters')
    .optional()
})

export type CreateLeadType = z.infer<typeof CreateLeadSchema>
