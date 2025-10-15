export interface CategoryOptional {
  name: string
  maxQuantity?: number
  price: number
}

export interface Category {
  id: string
  name: string
  description?: string
  restaurantId?: string
  mainCategoryId?: string
  isActive: boolean
  subCategories?: Category[]
  icon?: string
  optionals?: CategoryOptional[]
  createdAt: string
  updatedAt: string
}
