export interface Category {
  id: string
  name: string
  description?: string
  restaurantId?: string
  mainCategoryId?: string
  isActive: boolean
  subCategories?: Category[]
  icon?: string
  createdAt: string
  updatedAt: string
}
