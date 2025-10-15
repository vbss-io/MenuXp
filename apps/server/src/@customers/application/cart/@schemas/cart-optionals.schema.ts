import { z } from 'zod'

export const CartItemOptionalSchema = z.object({
  name: z.string().min(1, 'Optional name is required'),
  price: z.number().min(0, 'Optional price must be greater than or equal to 0'),
  quantity: z.number().min(1, 'Optional quantity must be greater than 0')
})
