export interface MenuItemOptional {
  name: string
  maxQuantity?: number
  price: number
}

export interface MenuItem {
  id: string
  name: string
  description?: string
  categoryId: string
  restaurantId: string
  price: number
  stock: number
  discount: number
  medias: string[]
  optionals: MenuItemOptional[]
  useCategoryOptionals: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface MenuItemWithCategoryName extends MenuItem {
  categoryName: string
}
