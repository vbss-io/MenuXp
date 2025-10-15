export interface ComboData {
  id: string
  name: string
  description?: string
  categoryId: string
  price: number
  stock: number
  discount: number
  medias: string[]
  items: Array<{
    menuItemId: string
    quantity: number
    name: string
    price: number
  }>
  optionals: Array<{
    name: string
    maxQuantity?: number
    price: number
  }>
}
