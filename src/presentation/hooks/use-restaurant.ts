import { useContext } from 'react'

import { RestaurantContext } from '@/presentation/contexts/restaurant-context'

export const useRestaurant = () => {
  return useContext(RestaurantContext)
}
