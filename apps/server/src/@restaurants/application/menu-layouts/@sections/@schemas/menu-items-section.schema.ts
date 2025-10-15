import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const MenuItemsSectionSchema = z.object({
  type: z
    .enum(['best_sellers', 'discounts', 'custom'], {
      required_error: 'menuItems type is required',
      invalid_type_error: 'menuItems type must be one of: best_sellers, discounts, custom'
    })
    .optional()
    .default('custom'),
  title: z.string().max(100, 'title cannot exceed 100 characters').optional(),
  menuItemIds: z.array(ObjectIdSchema).nullable().optional().default(null)
})

export type MenuItemsSectionType = z.infer<typeof MenuItemsSectionSchema>
