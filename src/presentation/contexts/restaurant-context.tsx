import { createContext } from 'react'

import type { Restaurant } from '@/domain/models/restaurant.model'
import type { RestaurantConfigValidation } from '@/application/restaurants/get-restaurant-by-id.usecase'

export interface RestaurantContextData {
  restaurant: Restaurant | null
  configValidation: RestaurantConfigValidation | null
  isLoading: boolean
  error: string | null
  setRestaurant: (restaurant: Restaurant) => void
  updateRestaurant: (updates: Partial<Restaurant>) => void
  clearRestaurant: () => void
  refreshRestaurant: () => Promise<void>
}

export const RestaurantContext = createContext<RestaurantContextData>({} as RestaurantContextData)
