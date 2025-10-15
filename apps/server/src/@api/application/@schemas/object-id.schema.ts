import { z } from 'zod'

export const ObjectIdSchema = z.string().refine((data) => !data || /^[0-9a-fA-F]{24}$/.test(data), {
  message: 'must be a valid ObjectId'
})
