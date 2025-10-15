export interface CartItemOptional {
  name: string
  price: number
  quantity: number
}

export interface CartItem {
  itemId: string
  name: string
  price: number
  quantity: number
  itemType: 'menu-item' | 'combo'
  optionals?: CartItemOptional[]
  note?: string
}

export interface Cart {
  id: string
  clientId?: string
  restaurantId: string
  items: CartItem[]
  total: number
  itemCount: number
  createdAt: Date
  updatedAt: Date
}
