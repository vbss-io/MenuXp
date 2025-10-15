import { z } from 'zod'

export const UpdateUserProfileSchema = z.object({
  name: z.string().optional(),
  files: z
    .array(z.any())
    .max(1, {
      message: 'the files limit is 1'
    })
    .optional()
    .default([])
})

export type UpdateUserProfileInputType = z.input<typeof UpdateUserProfileSchema>
export type UpdateUserProfileType = z.output<typeof UpdateUserProfileSchema>
