export interface ComboItem {
  menuItemId: string
  quantity: number
  name: string
  price: number
}

export interface ComboOptional {
  name: string
  maxQuantity?: number
  price: number
}

export interface Combo {
  id: string
  restaurantId: string
  categoryId: string
  name: string
  description?: string
  price: number
  stock?: number
  discount?: number
  medias: string[]
  items: ComboItem[]
  optionals: ComboOptional[]
  useCategoryOptionals: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
