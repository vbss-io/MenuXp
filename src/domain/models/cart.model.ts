export interface CartItemOptional {
  name: string
  price: number
  quantity: number
}

export interface CartItem {
  menuItemId: string
  name: string
  price: number
  quantity: number
  type: 'menu-item' | 'combo'
  optionals?: CartItemOptional[]
}

export interface Cart {
  id: string
  clientId: string
  restaurantId: string
  items: CartItem[]
  total: number
  itemCount: number
  createdAt: Date
  updatedAt: Date
}

export interface AbandonedCart extends Cart {
  lastActivity: Date
  hoursSinceLastActivity: number
}
