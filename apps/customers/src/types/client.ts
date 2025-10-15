import type { Address } from './address'

export interface Client {
  id: string
  phone: string
  restaurantId: string
  name?: string
  address?: Address
  createdAt: Date
  updatedAt: Date
}
