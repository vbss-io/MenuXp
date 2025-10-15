import { z } from 'zod'

export const BannerSectionSchema = z.object({
  imagePath: z.string().optional(),
  tag: z.string().max(50, 'tag cannot exceed 50 characters').optional(),
  title: z.string().max(100, 'title cannot exceed 100 characters').optional(),
  subtitle: z.string().max(200, 'subtitle cannot exceed 200 characters').optional()
})

export type BannerSectionType = z.infer<typeof BannerSectionSchema>
