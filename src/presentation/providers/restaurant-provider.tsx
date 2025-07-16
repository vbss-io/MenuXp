import type { Restaurant } from '@/domain/models/restaurant.model'
import { RestaurantContext } from '@/presentation/contexts/restaurant-context'
import { useState } from 'react'

interface RestaurantProviderProps {
  children: React.ReactNode
}

export const RestaurantProvider = ({ children }: RestaurantProviderProps) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  return <RestaurantContext.Provider value={{ restaurant, setRestaurant }}>{children}</RestaurantContext.Provider>
}
