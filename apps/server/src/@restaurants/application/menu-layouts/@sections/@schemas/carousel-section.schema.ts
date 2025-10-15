import { z } from 'zod'

export const CarouselSectionSchema = z.object({
  imagePaths: z
    .array(z.string())
    .min(2, 'Carousel must have at least 2 images')
    .max(5, 'Carousel can have at most 5 images')
    .optional()
    .default([])
})

export type CarouselSectionType = z.infer<typeof CarouselSectionSchema>
