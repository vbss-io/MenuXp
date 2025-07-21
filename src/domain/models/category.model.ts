export interface Category {
  id: string
  name: string
  description?: string
  restaurantId?: string
  mainCategoryId?: string
  isActive: boolean
  subCategories?: Category[]
  createdAt: string
  updatedAt: string
}
