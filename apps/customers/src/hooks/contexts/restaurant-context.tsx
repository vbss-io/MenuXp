import { createContext } from 'react'

import type { Restaurant, RestaurantConfigValidation, RestaurantTheme } from '@/types/restaurant'

export interface RestaurantContextData {
  restaurant: Restaurant | null
  configValidation: RestaurantConfigValidation | null
  operationId: string | null
  isLoading: boolean
  error: string | null
  theme: RestaurantTheme
  hasTheme: boolean
  setClientRestaurant: (restaurant: Restaurant) => void
  setOperationId: (operationId: string) => void
  updateTheme: (theme: RestaurantTheme) => void
  resetTheme: () => void
  clearTheme: () => void
  logo: string
  name: string
  primaryColor: string
  secondaryColor: string
  layout: string
}

export const RestaurantContext = createContext<RestaurantContextData>({} as RestaurantContextData)
