export interface MenuItemData {
  id: string
  name: string
  description?: string
  categoryId: string
  price: number
  stock: number
  discount: number
  medias: string[]
  optionals: Array<{
    name: string
    maxQuantity?: number
    price: number
  }>
}
