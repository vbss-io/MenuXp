import type { Restaurant } from '@/domain/models/restaurant.model'
import { createContext } from 'react'

export const RestaurantContext = createContext(
  {} as {
    restaurant: Restaurant | null
    setRestaurant: (restaurant: Restaurant | null) => void
  }
)
