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
  icon?: string
  optionals: CategoryOptional[]
  createdAt: Date
  updatedAt: Date
}
