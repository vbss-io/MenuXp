import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

import { MenuSectionType } from '@restaurants/domain/menu-layouts/enums/menu-layout-section-type.enum'

const AddBannerSectionSchema = z.object({
  imagePath: z.string().optional(),
  tag: z.string().max(50, 'tag cannot exceed 50 characters').optional(),
  title: z.string().max(100, 'title cannot exceed 100 characters').optional(),
  subtitle: z.string().max(200, 'subtitle cannot exceed 200 characters').optional()
})

const AddCarouselSectionSchema = z.object({}).passthrough()

const AddCategoriesSectionSchema = z.object({
  categoryIds: z.array(ObjectIdSchema).nullable().optional().default(null)
})

const AddMenuItemsSectionSchema = z.object({
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

const AddCombosSectionSchema = z.object({
  type: z
    .enum(['best_sellers', 'discounts', 'custom'], {
      required_error: 'combos type is required',
      invalid_type_error: 'combos type must be one of: best_sellers, discounts, custom'
    })
    .optional()
    .default('custom'),
  title: z.string().max(100, 'title cannot exceed 100 characters').optional(),
  comboIds: z.array(ObjectIdSchema).nullable().optional().default(null)
})

const addMenuSectionSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal(MenuSectionType.BANNER),
    config: AddBannerSectionSchema
  }),
  z.object({
    type: z.literal(MenuSectionType.CAROUSEL),
    config: AddCarouselSectionSchema
  }),
  z.object({
    type: z.literal(MenuSectionType.CATEGORIES),
    config: AddCategoriesSectionSchema
  }),
  z.object({
    type: z.literal(MenuSectionType.MENU_ITEMS),
    config: AddMenuItemsSectionSchema
  }),
  z.object({
    type: z.literal(MenuSectionType.COMBOS),
    config: AddCombosSectionSchema
  })
])

export const AddSectionSchema = z.object({
  layoutId: ObjectIdSchema,
  section: z
    .string({
      invalid_type_error: 'section must be a JSON string'
    })
    .transform((val) => {
      try {
        return JSON.parse(val) as unknown
      } catch {
        throw new Error('Invalid section JSON')
      }
    })
    .pipe(addMenuSectionSchema),
  position: z
    .string({
      invalid_type_error: 'position must be a string'
    })
    .optional()
    .transform((val) => {
      if (!val) return undefined
      const num = parseInt(val, 10)
      return isNaN(num) ? undefined : num
    })
    .refine((val) => val === undefined || (Number.isInteger(val) && val >= 0), {
      message: 'position must be a valid integer >= 0'
    }),
  files: z.array(z.any()).optional().default([])
})

export type AddSectionInputType = z.input<typeof AddSectionSchema>
export type AddSectionType = z.output<typeof AddSectionSchema>
