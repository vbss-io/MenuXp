export interface ComboItem {
  menuItemId: string
  name: string
  quantity: number
  price: number
}

export interface Combo {
  id: string
  name: string
  description?: string
  categoryId: string
  restaurantId: string
  price: number
  discount: number
  medias: string[]
  items: ComboItem[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ComboWithCategoryName extends Combo {
  categoryName: string
}
