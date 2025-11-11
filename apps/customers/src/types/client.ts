import type { Address } from './address'

export interface Client {
  id: string
  phone: string
  restaurantId: string
  name?: string
  address?: Address
  preferredLanguage?: string
  createdAt: Date
  updatedAt: Date
}
