import { z } from 'zod'

export const CartItemTypeSchema = z.enum(['menu-item', 'combo'], {
  required_error: 'itemType is required',
  invalid_type_error: 'itemType must be either menu-item or combo'
})
