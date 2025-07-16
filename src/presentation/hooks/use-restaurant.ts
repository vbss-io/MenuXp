import { RestaurantContext } from '@/presentation/contexts/restaurant-context'
import { useContext } from 'react'

export const useRestaurant = () => {
  return useContext(RestaurantContext)
}
